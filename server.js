const express = require("express");
const hbs = require("hbs"); //handlebars view engine
const fs = require("fs");

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

//middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url} `;
  console.log(log);
  // fs.appendFileSync("server.log", log + "\n");
  fs.appendFile("server.log", log + "\n", err => {
    if (err) {
      console.log("Unable to append to server.log");
    }
  });
  next();
});

//--------- NO next(), MEANING ALL ROUTES BELOW RENDER maintenance.hbs
// app.use((req, res, next) => {
//   res.render("maintenance.hbs");
// });

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", text => {
  return text.toUpperCase();
});

// app.get("/", (req, res) => {
//   res.send({
//     name: "Jason",
//     likes: ["Ass", "Class", "Mass"]
//   });
// });

app.get("/about", (req, res) => {
  // res.send("About page");
  res.render("about.hbs", {
    pageTitle: "About Page"
  });
});
app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "Home Page",
    welcomeContent: "Welcome to my homepage!"
  });
});
app.get("/portfolios", (req, res) => {
  res.render("portfolios.hbs", {
    pageTitle: "Portfolio Page",
    portfolioContent: "This is my portfolio! Please checkout my projects!"
  });
});

app.listen(port, params => {
  console.log(`Server is up on port ${port}`);
});
