import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Lista simulada de usuarios (en memoria)
const users = [
  { username: 'Juan', password: '1234' },
  { username: 'Pedro', password: 'abcd' },
];

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
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: Juan
 *               password:
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
 *         description: El campo username o password es requerido
 *       401:
 *         description: Usuario o contraseña inválido
 */
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username y password requeridos' });
  }

  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Usuario o contraseña inválido' });
  }

  const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET);
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
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: Maria
 *               password:
 *                 type: string
 *                 example: pass123
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Datos incompletos o usuario ya existe
 */
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username y password requeridos' });
  }

  const userExists = users.find(u => u.username === username);
  if (userExists) {
    return res.status(400).json({ error: 'El usuario ya existe' });
  }

  users.push({ username, password });
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
 *                   username:
 *                     type: string
 *                   password:
 *                     type: string
 *       401:
 *         description: Token no proporcionado
 *       403:
 *         description: Token inválido
 */
router.get('/users', authenticateToken, (req, res) => {
    res.json(users);
  });

export default router;
