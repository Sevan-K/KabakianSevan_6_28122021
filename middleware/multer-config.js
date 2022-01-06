// multer module import
const multer = require("multer");

// MIME_TYPES library creation
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// creation multer'config object to save on disk
const storage = multer.diskStorage({
  // setting destination
  destination: (request, file, callback) => {
    // destination file is the images one
    callback(null, "images");
  },
  // setting filename
  filename: (request, file, callback) => {
    // get original filename and replace " " by "_"
    // console.log("nom original du fichier", file.originalname);
    const name = file.originalname.split(" ").join("_").split(".")[0];
    // const name = file.originalname.split(" ").join("_");
    // console.log("nom du fichier", name);
    // get extention using MIME_TYPES library
    const extension = MIME_TYPES[file.mimetype];
    // building a unique name
    callback(null, name + Date.now() + "." + extension);
  },
});

// multer middleware is exported using multer method (with storage object as argument)
module.exports = multer({ storage })
  // it is a unique file, only images are concerned
  .single("image");
