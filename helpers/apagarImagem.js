const fs = require("fs");

module.exports = function apagarImagem(req) {
  if (req.file.path) {
    fs.unlinkSync(req.file.path);
  } else {
    req.files.map((item) => {
      fs.unlinkSync(item.file.path);
    });
  }
};
