const cors = require('cors');
const express = require('express');
const { ObterTodosOsClientes, SalvarCliente, AtualizarCliente,  RemoverCliente} = require('./Repository/clienteRepository');
const {ObterTodasAirTags, SalvarAirTag, AtualizarAirTag, RemoverAirTag, ObterAirTagsDisponiveis} = require('./Repository/airTagRepository')
const { ObterAirTagsPorCliente, DevolverAirTag, InserirLocacaoAirTag} = require('./Repository/clienteAirTagRepository');

const app = express()
app.use(express.json())
app.use(cors({
    origin: true, 
    credentials: true,
    methods: 'POST,GET,PUT,OPTIONS,DELETE' 
}));

// CLIENTES
app.get('/Clientes', async (_, res) => {
    var result = await ObterTodosOsClientes()
    res.status(200).send(result)
})

app.post('/Clientes', async (req, res) => {
    var {Nome, Email } = req.body
    res.status(200).send(await SalvarCliente(Nome, Email))
})

app.put('/Clientes', async (req, res) => {
    var { Codigo, Nome, Email } = req.body
    res.status(200).send(await AtualizarCliente(Codigo, Nome, Email))
})

app.delete('/Clientes/:id', async (req, res) => {
    var codigoCliente = req.params.id
    res.status(200).send(await RemoverCliente(codigoCliente))
})

// TAGS
app.get('/AirTags', async (_, res) => {
    var result = await ObterTodasAirTags()
    res.status(200).send(result)
})

app.post('/AirTags', async (req, res) => {
    var {MAC } = req.body
    res.status(200).send(await SalvarAirTag(MAC))
})

app.put('/AirTags', async (req, res) => {
    var { Codigo, MAC } = req.body
    res.status(200).send(await AtualizarAirTag(Codigo, MAC))
})

app.delete('/AirTags/:id', async (req, res) => {
    var codigoAirTag = req.params.id
    res.status(200).send(await RemoverAirTag(codigoAirTag))
})

app.get('/AirTags/ObterAirTagsDisponiveis', async (_, res) => {
    var result = await ObterAirTagsDisponiveis()
    res.status(200).send(result)
})

// CLIENTE AIRTAGS
app.get('/ClienteAirTag/ObterAirTagsPorCliente/:codigoCliente', async (req, res) => {
        res.status(200).send(await ObterAirTagsPorCliente(req.params.codigoCliente))
})

app.get('/ClienteAirTag/DevolverAirTag/:codigoLocacao', async (req, res) => {
    res.status(200).send(await DevolverAirTag(req.params.codigoLocacao))
})

app.post('/ClienteAirTag/InserirLocacaoAirTag', async (req, res) => {
    var {codigoCliente, codigoAirTag, alias} = req.body
    res.status(200).send(await InserirLocacaoAirTag(codigoCliente, codigoAirTag, alias))
} )

app.listen(3000, () => {
    console.log('Server Inicializado');
});