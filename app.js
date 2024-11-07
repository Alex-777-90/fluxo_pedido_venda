// app.js
const express = require('express');
const path = require('path');
const viewsRouter = require('./router/viewsRouter');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar a pasta 'public' para arquivos estáticos (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Usar o router para as views
app.use('/', viewsRouter);

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
