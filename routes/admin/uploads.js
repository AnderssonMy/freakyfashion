const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    if(req.baseUrl.includes("products")) {
      cb(null, "public/images/products");
    } else {
    cb(null, "public/images/categories");
    }

  }, 
  
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

module.exports = multer({ storage });