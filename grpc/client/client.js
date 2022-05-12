require('dotenv').config();
const grpc = require("@grpc/grpc-js");
const path = require('path');
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = path.join(__dirname, "../product.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const ProductService = grpc.loadPackageDefinition(packageDefinition).ProductService;

const client = new ProductService(
  `localhost:${process.env.GRPC_SERVER_PORT}`,
  grpc.credentials.createInsecure()
);

module.exports = client;