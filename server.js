const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware para analisar corpos de solicitação
app.use(bodyParser.json());
const cors = require('cors');
// Habilitar CORS
app.use(cors());

// Simulando um banco de dados simples (array)
let clientes = [];

// Rota para listar todos os clientes
app.get('/clientes', (req, res) => {
    res.json(clientes);
});

// Rota para obter um cliente por ID
app.get('/clientes/:id', (req, res) => {
    const cliente = clientes.find(c => c.id === parseInt(req.params.id));
    if (!cliente) return res.status(404).send('Cliente não encontrado.');
    res.json(cliente);
});

// Rota para adicionar um novo cliente
app.post('/clientes', (req, res) => {
    const cliente = {
        id: clientes.length + 1,
        nome: req.body.nome,
        email: req.body.email
    };
    clientes.push(cliente);
    res.status(201).json(cliente);
});

// Rota para atualizar um cliente existente
app.put('/clientes/:id', (req, res) => {
    const cliente = clientes.find(c => c.id === parseInt(req.params.id));
    if (!cliente) return res.status(404).send('Cliente não encontrado.');

    cliente.nome = req.body.nome;
    cliente.email = req.body.email;

    res.json(cliente);
});

// Rota para excluir um cliente
app.delete('/clientes/:id', (req, res) => {
    const cliente = clientes.find(c => c.id === parseInt(req.params.id));
    if (!cliente) return res.status(404).send('Cliente não encontrado.');

    const index = clientes.indexOf(cliente);
    clientes.splice(index, 1);

    res.json(cliente);
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor está ouvindo na porta ${PORT}`);
});
