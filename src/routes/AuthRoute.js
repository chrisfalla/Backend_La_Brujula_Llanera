import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../models/index.js'; // ✅ Cambiado de '../database/models/index.js' a '../models/index.js'
import process from 'node:process';

const router = express.Router();
const { User } = db;

// Middleware para autenticar JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) return res.status(401).json({ error: 'Token requerido' });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.user = user;
    next();
  });
}

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Endpoints relacionados con login, registro y perfil
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesión y genera un token JWT
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - correo
 *               - contrasena
 *             properties:
 *               correo:
 *                 type: string
 *                 format: email
 *                 example: juan@correo.com
 *               contrasena:
 *                 type: string
 *                 example: 1234
 *     responses:
 *       200:
 *         description: Token JWT generado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       400:
 *         description: El campo correo o contraseña es requerido
 *       401:
 *         description: Usuario o contraseña inválido
 */
router.post('/login', async (req, res) => {
  const { correo, contrasena } = req.body;

  if (!correo || !contrasena) {
    return res.status(400).json({ error: 'Correo y contraseña son requeridos' });
  }

  const user = await User.findOne({ where: { correo } });
  if (!user) {
    return res.status(401).json({ error: 'Usuario o contraseña inválido' });
  }

  const validPassword = await bcrypt.compare(contrasena, user.contrasena);
  if (!validPassword) {
    return res.status(401).json({ error: 'Usuario o contraseña inválido' });
  }

  const accessToken = jwt.sign(
    { id: user.id_Usuario, correo: user.correo, nombre: user.nombre },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ accessToken });
});

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - correo
 *               - contrasena
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Maria
 *               correo:
 *                 type: string
 *                 format: email
 *                 example: maria@correo.com
 *               contrasena:
 *                 type: string
 *                 example: pass123
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Datos incompletos o usuario ya existe
 */
router.post('/register', async (req, res) => {
  const { nombre, correo, contrasena } = req.body;

  if (!nombre || !correo || !contrasena) {
    return res.status(400).json({ error: 'Nombre, correo y contraseña son requeridos' });
  }

  const existingUser = await User.findOne({ where: { correo } });
  if (existingUser) {
    return res.status(400).json({ error: 'El usuario ya existe' });
  }

  const hashedPassword = await bcrypt.hash(contrasena, 10);

  await User.create({
    nombre,
    correo,
    contrasena: hashedPassword
  });

  res.status(201).json({ message: 'Usuario registrado exitosamente' });
});

/**
 * @swagger
 * /auth/users:
 *   get:
 *     summary: Obtener la lista de todos los usuarios registrados
 *     tags: [Autenticación]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_Usuario:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   correo:
 *                     type: string
 *       401:
 *         description: Token no proporcionado
 *       403:
 *         description: Token inválido
 */
router.get('/users', authenticateToken, async (req, res) => {
  const users = await User.findAll({
    attributes: ['id_Usuario', 'nombre', 'correo']
  });
  res.json(users);
});

export default router;
