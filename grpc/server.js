const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = "./product.proto";

productsData = require("./products.json");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const productProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService(productProto.ProductService.service, {
  getAllProducts: (_, cb) => {
    cb(null, { products: [...productsData] });
  },

  getProduct: (_, cb) => {
    const productId = _.request.id;
    const product = productsData.find(({ id }) => id == productId);
    cb(null, product);
  },

  addProduct: (call, cb) => {
    const _product = { id: Date.now(), ...call.request };
    productsData.push(_product);
    cb(null, _product.id);
  },

  deleteProduct: (_, cb) => {
    const productId = _.request.id;
    productsData = productsData.filter(({ id }) => id !== productId);
    cb(null, {});
  },

  editProduct: (_, cb) => {
    const productId = _.request.id;
    const product = productsData.find(({ id }) => id == productId);
    if (product) {
      product.name = _.request.name;
      product.price = _.request.price;
    }
    cb(null, product);
  },
});

server.bindAsync("localhost:5000", grpc.ServerCredentials.createInsecure(), (error, port) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server running at localhost:${port}`);
    server.start();
  }
});