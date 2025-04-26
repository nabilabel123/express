const express = require('express');
const router = express.Router();

// Import des routeurs modulaires
const usersRouter = require('./modules/users');
const productsRouter = require('./modules/products');
const ordersRouter = require('./modules/orders');

// Route principale du dashboard
router.get('/', (req, res) => {
    res.render('dashboard');
});

// Routes pour le contenu dynamique
router.get('/users', (req, res) => {
    res.render('partials/users-content');
});

router.get('/products', (req, res) => {
    res.render('partials/products-content');
});

router.get('/orders', (req, res) => {
    res.render('partials/orders-content');
});

// Montez les routeurs modulaires
router.use('/users', usersRouter);
router.use('/products', productsRouter);
router.use('/orders', ordersRouter);

module.exports = router;