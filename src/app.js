const express = require("express");
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.engine("ejs", require("ejs").__express);

app.get("/", function(req, res) {
  res.render("landing.ejs");
});

app.listen(port, function() {
  console.log("server is on");
});
