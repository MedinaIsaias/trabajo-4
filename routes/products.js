const express = require("express");
const ClassContainer = require("../container");

const { Router } = express;
const router = new Router();
const Container = new ClassContainer("./products.txt");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get("/", async (req, res) => {
  let dataFIle = await Container.getAll();
  if (Object.keys(dataFIle).length === 0) {
    return res.send({ MSG: "El archivo se encuentra vacio.." });
  }
  res.json(dataFIle);
});

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  let dataFIle = await Container.getById(id);
  if (dataFIle == "NULL") {
    return res.send({ MSG: "No se encuentra el id.." });
  }
  res.json(dataFIle);
});

router.post("/", async (req, res) => {
  let newProduct = req.body;
  if (newProduct.name == "" || newProduct.price == "") {
    return res.send({ Error: "No se cargo ningun producto.." });
  }
  await Container.save(newProduct);
  res.send("Producto agredado de forma exitosa!..");
});

router.put("/:id", async (req, res) => {
  let { id } = req.params;

  let dataFIle = await Container.getById(id);

  if (dataFIle == "NULL") {
    return res.send({ MSG: "No se encuentra el id.." });
  }
  let newData = req.body;
  let upDateItem = await Container.updateById(id, newData);
  res.send(upDateItem);
});

router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  let dataFIle = await Container.getById(id);

  if (dataFIle == "NULL") {
    return res.send({ MSG: "No se encuentra el id.." });
  }
  let returnData = await Container.deleteById(id);
  res.send(returnData);
});

module.exports = router;