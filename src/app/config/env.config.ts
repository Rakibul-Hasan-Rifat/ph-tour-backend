import { configDotenv } from "dotenv";

configDotenv();

interface IEnvironmentVariables {
  port: string;
  mongo_uri: string;
  node_env: "development" | "production";
}

export const loadEnvironmentVariables = (): IEnvironmentVariables => {
  const requiredEnvVars: string[] = ["PORT", "MONGO_URI", "NODE_ENV"];

  requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing environment variable: ${key}`);
    }
  });

  return {
    port: process.env.PORT as string,
    mongo_uri: process.env.MONGO_URI as string,
    node_env: process.env.NODE_ENV as "development" | "production",
  };
};

const environmentVariables = loadEnvironmentVariables();

export default environmentVariables;
