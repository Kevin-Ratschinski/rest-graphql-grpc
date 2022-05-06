const http = require('http');
const client = require('./grpc/client');

const host = "localhost";
const port = 8000;

const requestListener = function (req, res) {
  const url = req.url.split("/");
  const method = req.method;

  switch (method) {
    case "GET":
      if (url[1] == "product") {
        if (url.length > 1 && url[2]) {
          client.getProduct(
            {
              id: url[2],
            },
            (error, product) => {
              if (!error) throw error;
              res.end(product);
            }
          );
        }
        client.getAllProducts({}, (error, product) => {
          if (error) throw error;
          console.log(product);
          res.end(product);
        });
        res.end();
      }
      break;
    case "PUT":
      client.editProduct(
        {
          id: url[1],
          name: req.body.name,
          price: req.body.price,
        },
        (error, product) => {
          if (error) throw error;
          res.end(product);
        }
      );
      break;
    case "DELETE":
      client.deleteProduct(
        {
          id: url[1],
        },
        (error, product) => {
          if (error) throw error;
          res.end({ msg: "Successfully deleted a product." });
        }
      );
      break;
    case "POST":
      client.addProduct(
        {
          name: req.body.name,
          price: req.body.price,
        },
        (error, product) => {
          if (error) throw error;
          res.end({ data: product, msg: "Successfully created a product." });
        }
      );
      break;
    default:
      res.end("");
      break;
  }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});