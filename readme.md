# Red Badger Website

## Getting Started

We have a `.nvmrc` file so you can get a compatible version of Node using NVM:

```shell
nvm install
nvm use
```

Install your dependencies with `npm install`.

## Running

To build the project run `npm run build`. This will build both the client (`npm run build:client`) and
server (`npm run build:server`) code to be run.

Run the server with `npm start` and navigate to `http://localhost:8000/about-us/join-us`.

## Developing

Run the following in separate terminals:

* `npm run watch:server` - Sets up a Webpack watch along with [nodemon](https://github.com/remy/nodemon) to restart on changes
* `npm run watch:client` - Sets up a Webpack Dev Server with Hot Module Reloading for React components

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

First you will need to build the server tests

`npm run build:server-tests`

Or continuously build them with

`npm run watch:server-tests`

Then you can run them with

`npm run test:server`.

### Client

`npm run test:client`.

### End to end

We also have end to end tests that only test the 'Golden Paths' for the
website. These can be run with `npm run test:e2e`
