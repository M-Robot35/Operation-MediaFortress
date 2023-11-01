const { Router } = require("express");
const controller = require('../constrollers/controller-index')
const downMidleware = require('../midlewares/downloadMidlewere')
const { join } = require('path')

const veriicacoesDownload = [
    downMidleware.camposObrigatorios,
    downMidleware.linkYoutubeVerify,
    downMidleware.itagVerify
]

// #
//const local_html = join(__dirname, '../','../','public','index.html')

const routers = Router();

routers.get("/", (req, res)=>{
    //res.send('<h1>Hello world Server Wins</h1>');
    res.render('index.html');
});

routers.get("/download", veriicacoesDownload, controller.downloads );
 
routers.get('/info', controller.infoVideo )

module.exports = routers 