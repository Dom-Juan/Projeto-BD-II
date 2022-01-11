// Controllador do storage.
const util = require("util");
const multer = require("multer");

// Geração de ids de atividade.
const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('abc1234567890ebc', 7);

const DIR = './public/uploads/';

// pegando a data atual.
let data = new Date();

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR)
  },
  filename: function (req, file, cb) {
    cb(null,  nanoid(7)+"_"+data.getFullYear()+"_"+(data.getMonth()+1)+"_"+data.getDate()+file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 * 5
  },
}).single("comprovante");


let fileUploadMiddleware = util.promisify(upload);

module.exports = fileUploadMiddleware;