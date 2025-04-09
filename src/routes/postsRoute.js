import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

const posts = [
  { username: 'Juan', title: 'Post 1' },
  { username: 'Pedro', title: 'Post 2' },
];

// Middleware para verificar token JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Obtener los posts del usuario autenticado
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de posts del usuario autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                     example: Juan
 *                   title:
 *                     type: string
 *                     example: Post 1
 *       401:
 *         description: No autorizado - JWT no proporcionado
 *       403:
 *         description: Token inválido
 */
router.get('/', authenticateToken, (req, res) => {
  const userPosts = posts.filter(post => post.username === req.user.username);
  res.json(userPosts);
});

export default router;
