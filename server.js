const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(express.static("public"));

app.get("/time", (req, res) => {
  fs.readFile("./all.json", async function (err, data) {
    let year = await JSON.parse(data);
    res.send(year);
  });
});
app.post("/time", (req, res) => {
  let year = req.body.year;
  year = JSON.stringify(year);
  fs.writeFile("./all.json", year, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send("updated");
    }
  });
});
const port = process.env.PORT || 80;
app.listen(port, console.log("listening on " + port));
