# REST / GraphQL / gRPC Performance testing

## Set Environment variables

Create .env file in your root directory and set the environment variables.  
If no .env file is created the default values are used.

```

GRPC_SERVER_ADDRESS -> default localhost
GRPC_SERVER_PORT -> default 5000

REST_SERVER_ADDRESS -> default localhost
REST_SERVER_PORT -> default 5001

GRAPHQL_SERVER_ADDRESS -> default localhost
GRAPHQL_SERVER_PORT -> default 5002

REQUEST_COUNT -> default 100

```

## How to run

### Load dependencies

```bash
npm install
```

### Run Server of your choice

```bash
npm run grpc-server

npm run rest-server

npm run graphql-server
```

### Run Performance script (works only when the server is running)

```bash
npm run grpc-performance

npm run rest-performance

npm run graphql-performance
```

## Result

After the performance script has run, the results of the various measurements are displayed in the console.

```js
Performance Test
{
  Measure: "What has been measured",
  Requests: "Number of requests",
  DurationMs: "Duration in milliseconds",
  DurationSec: "Duration in seconds"
}
```
