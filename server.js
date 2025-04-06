import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();

const posts = [
  {
    username: 'Juan',
    title: 'Post 1',
  },
  {
    username: 'Pedro',
    title: 'Post 2',
  }
];

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡API funcionando!');
});

app.get('/posts', authenticateToken, (req, res) => {
  const userPosts = posts.filter(post => post.username === req.user.username);
  res.json(userPosts);
});

// Login - genera token JWT
app.post('/login', (req, res) => {
  const username = req.body.username;
  const user = { username }; // 👈 Ahora usamos "username", no "name"
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken });
});

// Middleware para autenticar JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // No token

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Token inválido
    req.user = user;
    next();
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
