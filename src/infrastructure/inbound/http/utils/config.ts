import "dotenv/config";

const validateEnvVariables = () => {
  if (!process.env.PORT) {
    throw new Error("PORT is required in the environment variables.");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is required in the environment variables.");
  }

  if (!process.env.NODE_ENV) {
    throw new Error("NODE_ENV is required in the environment variables.");
  }
};

const config = {
  serverPort: parseInt(process.env.PORT!, 10) || 3001,
  mongodbUri: process.env.MONGO_URI!,
  nodeEnv: process.env.NODE_ENV!,
} as const;

validateEnvVariables();

export default config;
