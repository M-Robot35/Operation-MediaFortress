const { Router } = require("express");
const controller = require('../constrollers/controller-index')

const routers = Router();

routers.post("/download", controller.downloads);

routers.get('/info', controller.infoVideo)


module.exports = routers