const express = require("express");

const app = express();
app.use(express.json());

const productsRoutes = require("./routes/products");
const port = 8080;


app.use("/api/products", productsRoutes);



app.listen(port, () => {
  console.log("server run on port " + port);
});