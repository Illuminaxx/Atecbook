var compression = require('compression')
const express = require("express");
const connectDB = require("./config/db");
const router = require("./routes/api/router");
const path = require("path");


const app = express();
const PORT = process.env.PORT || 3003;

app.use(compression({
  level: 9
}))

app.use(express.json({ useUrlExtended: false }));
//connect db
connectDB();
app.use("/api", router);

/*app.use(function (req, res, next) {
  res.set('Cache-control', 'public, max-age=300')
})*/

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
