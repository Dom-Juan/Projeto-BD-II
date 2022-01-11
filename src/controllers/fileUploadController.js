const upload = require("../middleware/fileUpload");

const URL = "http://localhost:3333/atividade/download";
const fs = require("fs");


const uploadFile = async (req, res) => {
  try {
    await upload(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Choose a file to upload" });
    }

  } catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size should be less than 5MB",
      });
    }

    res.status(500).send({
      message: `Error occured: ${err}`,
    });
  }
};

const getFilesList = (req, res) => {
  const path = __basedir + "/public/uploads/";

  fs.readdir(path, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Files not found.",
      });
    }

    let filesList = [];

    files.forEach((file) => {
      filesList.push({
        name: file,
        url: URL + file,
      });
    });

    res.status(200).send(filesList);
  });
};

const downloadFiles = (req, res) => {
  const fileName = req.body.name;
  const path = __basedir + "/public/uploads/";

  res.download(path + fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "File can not be downloaded: " + err,
      });
    }
  });
  res.end();
};

const downloadFileFront = (req, res) => {
  const fileName = req.body.name;
  //const path = __basedir + "/public/uploads/";

  res.download(fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "File can not be downloaded: " + err,
      });
    }
  });
  res.end();
};

const getFile = (req, res) => {
  console.log(req.params.name);
  let fileLocation = "public/uploads/"+req.params.name;
  let file = "file";
  res.download(fileLocation, file, (err) => {
    if(err)
      console.log(err);
  });
}

module.exports = { uploadFile, downloadFiles, downloadFileFront, getFilesList, getFile };