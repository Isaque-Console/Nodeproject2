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
 });aaa

 app.post ('/', (req,res) => {
    const { nome, marca, cor,fabricacao} = req.body;
    client.query(`INSERT INTO carro VALUES(NULL,${nome},${marca},${cor},${fabricacao})`);
    res.send({ nome, marca, cor,fabricacao});
 });

 app.put('/:id', (req,res) => {
    const putMessage = "Successfully put";
    const id = req.params.id;
    const {nome, marca,cor,fabricacao} = req.body;
    client.query(`UPDATE carro SET nome=${nome},marca=${marca},cor${cor},fabricacao${fabricacao} WHERE id = ${id}`);
    res.send(putMessage);
 })

app.delete('/:id', (req,res) => {
    const deleteMessage = "Successfully delete";
    const id = req.params.id;
    client.query(`DELETE FROM carro WHERE id = ${id}`);
    res.send(deleteMessage);
});

const port = 3002;

app.listen(port, () => { // indicar a porta que será usada do pc
    console.log('server running');
});
