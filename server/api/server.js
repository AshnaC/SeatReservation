const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 5000;
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.get("/api/getReservationList", (req, res) => {
  fs.readFile(__dirname + "/" + "data.json", (er, data) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(JSON.parse(data));
  });
});

app.post("/api/addReservation", (req, res) => {
  fs.readFile(__dirname + "/" + "data.json", (er, data) => {
    const userBlock = JSON.parse(data);
    console.log("req", req.body);
    try {
      req.body = JSON.parse(Object.keys(req.body)[0]);
    } catch (err) {
      req.body = req.body;
    }
    const user = req.body;
    userBlock.users.push(user);
    fs.writeFile(
      __dirname + "/" + "data.json",
      JSON.stringify(userBlock, null, 2),
      (err, data) => {
        if (err) return console.log(err);
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.send(user);
      }
    );
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
