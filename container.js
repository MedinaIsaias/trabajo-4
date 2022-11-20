const fs = require("fs");

const writeFileAsync = async (arr) => {
  try {
    await fs.promises.writeFile(
      "./products.txt",
      JSON.stringify(arr, null, 2),
      "utf-8"
    );
  } catch (err) {
    throw new Error("Error de escritura!");
  }
};

const readFileAsync = async (path) => {
  try {
    let file = await fs.promises.readFile(path, "utf-8");
    return file;
  } catch (err) {
    throw new Error("Error de lectura!");
  }
};


class Contenedor {
  constructor(path) {
    this.nameFile = path;
    this.producto = [];
  }


  async save(product) {
  
    let fileExits = await readFileAsync(this.nameFile);

   if (fileExits && fileExits.length >= 0) {
      let dataFile = JSON.parse(fileExits);
      product.id = dataFile.length + 1;
      dataFile.push(product);
      this.producto = dataFile;
      writeFileAsync(this.producto);
    } else {
      product.id = 1;
      this.producto.push(product);
      writeFileAsync(this.producto);
    }
  }


  async getById(id, position) {
    let fileExits = await readFileAsync(this.nameFile);


    if (fileExits) {
      let dataFile = JSON.parse(fileExits);
      const found = dataFile.find((element) => element.id == id);
    

      if (!found) {
        return "NULL";
      }
      if (position) {
        return dataFile.indexOf(found);
      } else {
        return found;
      }
    }
  }


  async getAll() {
    let fileExits = await readFileAsync(this.nameFile);

    if (fileExits.length != 0) {
      let dataFile = JSON.parse(fileExits);
      return dataFile;
    }
    return "No hay productos cargados actualmente!..";
  }

 
  async deleteById(id) {
    const positionItem = await this.getById(id, true);
    let fileExits = await readFileAsync(this.nameFile);

   
    if (fileExits && positionItem >= 0) {
      let dataFile = JSON.parse(fileExits);
      const deleteItem = dataFile.splice(positionItem, 1);

    
      writeFileAsync(dataFile);
      return "Productos eliminado de forma correcta!..";
    } else {
      return "No se pudo eliminar!";
    }
  }


  async deleteAll() {
    writeFileAsync(this.producto);
  }


  async updateById(id, product) {
   
    const auxPruducts = await this.getAll();


    const itemId = await this.getById(id);

   
    if (itemId != "NULL") {
      const auxUpdateProducts = auxPruducts.map((item) => {
        if (item.id == id) {
          item.name = product.name;
          item.price = product.price;
        }
        return item;
      });
      writeFileAsync(auxUpdateProducts);
      return "Producto actualizado de forma correcta!..";
    } else {
      return "No se pudo actualizar!";
    }
  }
}


module.exports = Contenedor;