// viewsRouter.js
const express = require('express');
const path = require('path');

const router = express.Router();

// Rota para a página inicial
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

// Rota para a página de login
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'login.html'));
});

// Rota para a página de administração
router.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'admin.html'));
});

module.exports = router;
