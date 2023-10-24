//require('dotenv').config()
const path = require('path')
const express = require('express');
const routers = require('./routers/index');

//const port  = process.env.PORT || process.env.PORT_LOCAL
const port  = 3001

const cors = require('cors')({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    'Access-Control-Allow-Origin': "",
    "Access-Control-Allow-Credentials": true,
    "preflightContinue": false,
    "optionsSuccessStatus": 204
});

const app = express();

app.use(cors)
app.use( express.json() ); 
app.use(express.urlencoded({extended:true}));
app.use( routers );

app.get('*', (req, res) => {
    res.status(404).json({error : true, messagem : "Rota não encontrada"});
});

app.listen( port, ()=> console.log('Online na porta : '+ port) )











