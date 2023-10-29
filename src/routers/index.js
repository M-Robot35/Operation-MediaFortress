const { Router } = require("express");
const controller = require("../constrollers/controller-index");
const fs = require("fs");
const { filterFormats, chooseFormat, getInfo } = require("ytdl-core");
const ytdl = require("ytdl-core");
const express = require("express");
const ffmpeg = require("ffmpeg-static");
const cp = require("child_process");
const path = require("path");
const { finished } = require("stream/promises");

const routers = Router();

routers.get("/download", controller.downloads);

routers.get("/info", controller.infoVideo);

module.exports = routers;
