const client = require("./client");

getProducts();

// add a product
client.addProduct(
  {
    name: "New Product",
    price: 10.99,
  },
  (error, product) => {
    if (error) throw error;
    console.log("Successfully added a product.");
  }
);

getProducts();

// edit a news
client.editProduct(
  {
    id: 2,
    name: "Product 2 edited.",
    price: 8.99
  },
  (error, product) => {
    if (error) throw error;
    console.log("Successfully edited a product.");
  }
);

getProducts();

// delete a news
client.deleteProduct(
  {
    id: 2,
  },
  (error, product) => {
    if (error) throw error;
    console.log("Successfully deleted a product.");
  }
);

getProducts();


function getProducts() {
  client.getAllProducts({}, (error, products) => {
    if (error) {
      console.log(error);
    } else {
      console.log(products);
    }
  });
}