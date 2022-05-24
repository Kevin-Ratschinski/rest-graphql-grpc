# rest-graphql-grpc

## Load dependencies

```bash
npm install
```

## Environment variables

Create .env in root directory and set environment variables.

```env

GRPC_SERVER_ADDRESS -> default localhost
GRPC_SERVER_PORT -> default 5000

REST_SERVER_ADDRESS -> default localhost
REST_SERVER_PORT -> default 5001

GRAPHQL_SERVER_ADDRESS -> default localhost
GRAPHQL_SERVER_PORT -> default 5002

REQUEST_COUNT -> default 1000

```

## Server scripts

Start gRPC Server

```bash
npm run grpc-server
```

Start REST Server

```bash
npm run rest-server
```

Start GraphQL Server

```bash
npm run graphql-server
```

## Performance scripts

Start gRPC Performance-Test

```bash
npm run grpc-performance
```

Start REST Performance-Test

```bash
npm run rest-performance
```

Start GraphQL Performance-Test

```bash
npm run graphql-performance
```
