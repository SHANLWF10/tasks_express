const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 4000;

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  fs.readdir(`./files`, (err, files) => {
    res.render("index", { files: files });
  });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
