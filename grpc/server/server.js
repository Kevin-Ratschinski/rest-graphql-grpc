require('dotenv').config();
const grpc = require("@grpc/grpc-js");
const path = require('path');
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = path.join(__dirname, "../product.proto");

productsData = require("../../data/products.json");

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
    console.log("getAllProducts");
    cb(null, { products: [...productsData] });
  },

  getProduct: (_, cb) => {
    console.log("getProduct");
    const productId = _.request.id;
    const product = productsData.find(({ id }) => id == productId);
    cb(null, product);
  },

  addProduct: (call, cb) => {
    console.log("addProduct");
    const _product = { id: Date.now(), ...call.request };
    productsData.push(_product);
    cb(null, _product.id);
  },

  deleteProduct: (_, cb) => {
    console.log("deleteProduct");
    const productId = _.request.id;
    productsData = productsData.filter(({ id }) => id !== productId);
    cb(null, {});
  },

  editProduct: (_, cb) => {
    console.log("editProduct");
    const productId = _.request.id;
    const product = productsData.find(({ id }) => id == productId);
    if (product) {
      product.name = _.request.name;
      product.price = _.request.price;
    }
    cb(null, product);
  },
});

server.bindAsync(`localhost:${process.env.GRPC_SERVER_PORT}`, grpc.ServerCredentials.createInsecure(), (error, port) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server running at localhost:${port}`);
    server.start();
  }
});