const express = require("express"); //importa a lib express
const app = express(); // inicia a lib
const { Client } = require('pg'); // criando uma comunicação com o postgres
const dotenv = require('dotenv'); // habilitando a utilização do dotenv
require('dotenv').config();


const client = new Client({
    host: process.env.HOST,
    user:process.env.DB_USER,
    password:process.env.PASSWORD,
    port:process.env.PORT,
    database:process.env.DATABASE,
})
client.connect();


app.use(express.json());

app.get('/', async (req, res) => {
    const result = await client.query('SELECT id,nome,marca,cor,fabricacao FROM carro;');
    res.send(result);
});

 app.get('/:id', async (req, res) => {
     const idCar = req.params.id;
     console.log(idCar);
     const result = await client.query(`SELECT id,nome,marca,cor,fabricacao FROM carro WHERE id = ${idCar};`);
     res.send(result);
 });

 app.post ('/', (req,res) => {
    const { nome, marca, cor,fabricacao} = req.body;
    client.query(`INSERT INTO carro VALUES(NULL,${nome},${marca},${cor},${fabricacao})`);
    res.send({ nome, marca, cor,fabricacao});
 });


const port = 3002;

app.listen(port, () => { // indicar a porta que será usada do pc
    console.log('server running');
});
