const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Cliente = require('./models/Cliente');

const app = express();
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());


mongoose.connect('mongodb+srv://crudimpacta:crudimpacta123@crudimpacta.br3ohln.mongodb.net/?retryWrites=true&w=majority&appName=crudimpacta', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB conectado...'))
    .catch(err => console.log(err));

// Listar todos os clientes
app.get('/clientes', async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch (err) {
        res.status(500).send('Erro ao buscar clientes.');
    }
});

// Obter um cliente por ID
app.get('/clientes/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);
        if (!cliente) return res.status(404).send('Cliente não encontrado.');
        res.json(cliente);
    } catch (err) {
        res.status(500).send('Erro ao buscar cliente.');
    }
});

// Adicionar um novo cliente
app.post('/clientes', async (req, res) => {
    const { nome, email } = req.body;
    const cliente = new Cliente({ nome, email });
    try {
        await cliente.save();
        res.status(201).json(cliente);
    } catch (err) {
        res.status(500).send('Erro ao adicionar cliente.');
    }
});

// Atualizar um cliente existente
app.put('/clientes/:id', async (req, res) => {
    const { nome, email } = req.body;
    try {
        const cliente = await Cliente.findByIdAndUpdate(req.params.id, { nome, email }, { new: true });
        if (!cliente) return res.status(404).send('Cliente não encontrado.');
        res.json(cliente);
    } catch (err) {
        res.status(500).send('Erro ao atualizar cliente.');
    }
});

// Excluir um cliente
app.delete('/clientes/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findByIdAndDelete(req.params.id);
        if (!cliente) return res.status(404).send('Cliente não encontrado.');
        res.json(cliente);
    } catch (err) {
        res.status(500).send('Erro ao excluir cliente.');
    }
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor está ouvindo na porta ${PORT}`);
});
