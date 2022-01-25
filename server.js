const express = require("express");
const fs = require("fs");
const fileUpload = require("express-fileupload");
const app = express();
app.use(fileUpload());
app.use(express.json());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(express.static("public"));

app.get("/time", (req, res) => {
  res.download("./all.json");
  //   fs.readFile("./all.json", async function (err, data) {
  //     let year = await JSON.parse(data);
  //     res.send(year);
  //   });
});

app.post("/time", function (req, res) {
  //   console.log(req.body);
  //   console.log(req.files);
  if (req.body.password !== "secretOnicpass") {
    return res.send("wrong password, you will be banned if you keep trying");
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  //   let sampleFile = req.files["uploads[]"];

  // Use the mv() method to place the file somewhere on your server
  req.files.prayer_times.mv("./all.json", function (err) {
    if (err) return res.status(500).send(err);

    res.send("File uploaded!");
    // res.redirect("/");
  });
});

// app.post("/time", (req, res) => {
//   let year = req.body.year;
//   year = JSON.stringify(year);
//   fs.writeFile("./all.json", year, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send("updated");
//     }
//   });
// });
const port = process.env.PORT || 80;
app.listen(port, console.log("listening on " + port));
