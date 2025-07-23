import { configDotenv } from "dotenv";

configDotenv();

interface IEnvironmentVariables {
  port: string;
  mongo_uri: string;
  hash_salt: string;
  secret_key: string;
  super_admin_email: string;
  super_admin_password: string;
  node_env: "development" | "production";
}

export const loadEnvironmentVariables = (): IEnvironmentVariables => {
  const requiredEnvVars: string[] = [
    "PORT",
    "NODE_ENV",
    "MONGO_URI",
    "JWT_SECRET_KEY",
    "BCRYPT_SALT_ROUND",
    "SUPER_ADMIN_EMAIL",
    "SUPER_ADMIN_PASSWORD",
  ];

  requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing environment variable: ${key}`);
    }
  });

  return {
    port: process.env.PORT as string,
    mongo_uri: process.env.MONGO_URI as string,
    secret_key: process.env.JWT_SECRET_KEY as string,
    hash_salt: process.env.BCRYPT_SALT_ROUND as string,
    super_admin_email: process.env.SUPER_ADMIN_EMAIL as string,
    node_env: process.env.NODE_ENV as "development" | "production",
    super_admin_password: process.env.SUPER_ADMIN_PASSWORD as string,
  };
};

const environmentVariables = loadEnvironmentVariables();

export default environmentVariables;
