const { Client, Environment, ApiError } = require('square');

const squareEnv = (process.env.VERCEL_ENV == 'production') ? Environment.Production : Environment.Sandbox
const client = new Client({
    bearerAuthCredentials: {
      accessToken: process.env.ACCESS_TOKEN
    },
    environment: squareEnv
});

export default client;