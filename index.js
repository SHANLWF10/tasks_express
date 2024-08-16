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

app.get("/files/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, data) => {
    res.render("show", {
      filename: req.params.filename,
      filedata: data,
    });
  });
});

app.post("/create", (req, res) => {
  fs.writeFile(
    `./files/${
      req.body.title !== "" ? req.body.title.split(" ").join("") : "no Name"
    }.txt`,
    req.body.details,
    (err) => {
      res.redirect("/");
      if (err) console.log(err);
    }
  );
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
