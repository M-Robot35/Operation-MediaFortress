const { Router } = require("express");
const controller = require("../constrollers/controller-index");
const down2 = require("../constrollers/down2");

const routers = Router();

routers.get("/download", controller.downloads);

routers.get("/info", controller.infoVideo);

module.exports = routers;
