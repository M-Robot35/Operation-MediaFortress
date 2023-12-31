require('dotenv').config()
const path = require('path')
const express = require('express');
const routers = require('./routers/index');
const http = require('http');

const port  = process.env.PORT || process.env.PORT_LOCAL

const cors = require('cors')({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    'Access-Control-Allow-Origin': "",
    "Access-Control-Allow-Credentials": true,
    "preflightContinue": false,
    "optionsSuccessStatus": 204
});

const caminhohtml = path.join(__dirname, '../','public')

const app = express();
app.use(cors)
app.use( express.json() ); 
app.use(express.urlencoded({extended:true}));
app.use(express.static(caminhohtml));

const server = http.createServer(app);//server nativo do node
const io = require('./services/websocketServer')(server)

app.use( routers );

app.get('*', (req, res) => {
  res.status(404).json({error : true, messagem : "Rota não encontrada"});
});
server.listen( port, ()=> console.log('Online na porta : http://localhost:'+ port) )
//server.listen( port)
