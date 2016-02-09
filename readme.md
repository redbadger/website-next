# Red Badger Website

## Getting Started

We have a `.nvmrc` file so you can get a compatible version of Node using NVM:

```shell
nvm install
nvm use
```

Install your dependencies with `npm install`.

## Running

To build the project run `npm run build`.

Run the server with `npm start` and navigate to `http://localhost:8000/about-us/join-us`.

## Developing

Run the following:

* `npm run local`

The site can then be accessed at http://localhost:8000.

Any changes you make will be linted and tested on a `git push`. To run linting yourself you can do `npm run lint`.

### .env

We use `dotenv` to configure our environment variables in development. Create a `.env` file in the root folder of the project to make use of this feature. Required keys are outlined below:

```
WORKABLE_KEY=your_key_here
```

## Testing

The project has code that is run on a server, a client and both. We can test
for each intended environment with the following commands:

### Server

You can run the server tests with:

`npm run test:server`

### Client

`npm run test:client`.

### End to end

We also have end to end tests that only test the 'Golden Paths' for the
website. These can be run with `npm run test:e2e`. Note that they require a running server.
