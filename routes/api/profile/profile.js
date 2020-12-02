const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");
const fileName = path.basename(__filename);

fs.readdir(__dirname, (err, files) => {
  if (err) console.error(err);
  let subRoutes = [];
  files.forEach((file) => {
    if (file != fileName) {
      subRoutes.push(require(`./${file}`));
    }
  });
  router.use(subRoutes);
});

module.exports = router;
