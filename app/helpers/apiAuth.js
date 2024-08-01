const { Client, Environment, ApiError } = require('square');

const client = new Client({
    bearerAuthCredentials: {
      accessToken: process.env.ACCESS_TOKEN
    },
    environment: Environment.Sandbox
});

export default client;