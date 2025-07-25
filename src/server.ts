/* eslint-disable no-console */
import { log } from "console";
import { Server } from "http";
import mongoose from "mongoose";

import app from "./app";
import seedSuperAdmin from "./app/utils/seedSuperAdmin";
import environmentVariables from "./app/config/env.config";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(environmentVariables.MONGO_URI as string);
    log("MongoDB is conncted successfully!!");

    server = app.listen(environmentVariables.PORT, () => {
      console.log(
        `Server is running at http://localhost:${environmentVariables.PORT}`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  await startServer();
  await seedSuperAdmin();
})()

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection detected", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception detected", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("SIGTERM", () => {
    console.log("SIGTERM signal recieved.");
    
    if(server) {
        server.close(() => {
            process.exit(1)
        })
    }

    process.exit(1)
});
process.on("SIGINT", () => {
    console.log("SIGTERM signal recieved.");
    
    if(server) {
        server.close(() => {
            process.exit(1)
        })
    }

    process.exit(1)
});
