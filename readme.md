# Red Badger Website

## Getting Started

Install your dependencies with `npm install`.

To build the project run `npm run build`. This will build both the client and
server code to be run. Alternatively if you want to continuously build you can
use `npm run watch` to continuously build the project as you develop.

Run the server with `npm run start` and navigate to `localhost:8080`.

To lint your newly added work run `npm run lint`.

## Testing

The project has code that is run on a server, a client and both. We can test
for each intended environment with the following commands:

### Server

`npm run test:server`.

### Client

`npm run test:client`.

### End to end

We also have end to end tests that only test the 'Golden Paths' for the
website. These can be run with `npm run test:e2e`
