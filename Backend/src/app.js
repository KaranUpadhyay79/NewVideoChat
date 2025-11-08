// import express from "express";
// import { createServer } from "node:http";

// import { Server } from "socket.io";

// import mongoose from "mongoose";
// import { connectToSocket } from "./controllers/socketManager.js";

// import cors from "cors";
// import userRoutes from "./routes/users.routes.js";

// const app = express();
// const server = createServer(app);
// const io = connectToSocket(server);


// app.set("port", (process.env.PORT || 8000))
// app.use(cors());
// app.use(express.json());

// app.use(express.json({ limit: "40kb" }));
// app.use(express.urlencoded({ limit: "40kb", extended: true }));

// app.use("/api/v1/users", userRoutes);

// app.get("/", (req, res) => {
//   res.send("Welcome to the ZoomClone backend!");
// });

// const start = async () => {
//     app.set("mongo_user")
//     // const connectionDb = await mongoose.connect("mongodb+srv://upadhyaykarankumar332:bqBt0JdqaFSNugmC@cluster0avc.q9w4s8s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0AVC")
//     const connectionDb = await mongoose.connect(process.env.MONGO_URL);
//     console.log(`MONGO Connected DB HOst: ${connectionDb.connection.host}`)
//     server.listen(app.get("port"), () => {
//         console.log("LISTENIN ON PORT 8000")
//     });



// }



// start();

import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";

// --- ES Module __dirname fix ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Load .env ---
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

// Middleware
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

// Routes
app.use("/api/v1/users", userRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Welcome to the ZoomClone backend!");
});

// Port
const PORT = process.env.PORT || 8000;

// Start server and MongoDB connection
const start = async () => {
  try {
    // Connect to MongoDB once
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected ✅");

    // Start server once
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT} ✅`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

start();
