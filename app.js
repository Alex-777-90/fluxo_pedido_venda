// app.js
const express = require('express');
const path = require('path');
const viewsRouter = require('./router/viewsRouter');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;


// Configurar o tamanho máximo do corpo da requisição
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Middleware para parsing de JSON
app.use(express.json());

// Configurar a pasta 'public' para arquivos estáticos (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Usar o router para as views
app.use('/', viewsRouter);

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
