const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const logger = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const tasksRouter = require('./routes/task');
const blogRouter = require('./routes/blog');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();

// Middlewares tiers
app.use(cors());
app.use(compression());
app.use(morgan('dev'));

// Middleware perso
app.use(logger);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static('public'));

// View engine
app.set('view engine', 'ejs');

// Routes principales
app.use('/task', tasksRouter);
app.use('/', blogRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

// Formulaire d'inscription
app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.send("Tous les champs sont obligatoires.");
  res.send(`Bienvenue ${name}, votre inscription est confirmée !`);
});

// Upload fichiers
const storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/gif'];
    cb(null, allowed.includes(file.mimetype));
  }
});

app.get('/upload', (req, res) => {
  fs.readdir('public/uploads', (err, files) => {
    const html = `
      <form action="/upload" method="POST" enctype="multipart/form-data">
        <input type="file" name="image" />
        <button type="submit">Uploader</button>
      </form>
      <div>${files.map(f => `<img src="/uploads/${f}" width="100">`).join('')}</div>
    `;
    res.send(html);
  });
});

app.post('/upload', upload.single('image'), (req, res) => {
  res.redirect('/upload');
});

// Route protégée avec auth
app.get('/private', auth, (req, res) => {
  res.send('Contenu sécurisé');
});

// Réponse multi-format
app.get('/api/data', (req, res) => {
  const data = { name: 'ExpressJS', type: 'framework' };

  res.format({
    'application/json': () => res.json(data),
    'application/xml': () => res.send(`<data><name>${data.name}</name><type>${data.type}</type></data>`),
    'text/html': () => res.send(`<h1>${data.name}</h1><p>${data.type}</p>`)
  });
});

// Page d'accueil
app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API Express');
});

// Démarrage serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
});
