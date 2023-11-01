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

const routers = Router();

routers.get("/", (req, res)=>{
    res.render('index.html');
});

routers.get("/download", veriicacoesDownload, controller.downloads );
 
routers.get('/info', controller.infoVideo )

module.exports = routers 