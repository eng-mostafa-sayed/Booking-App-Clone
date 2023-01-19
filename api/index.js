import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.middleware.js";
import usersRoutes from "./routes/users.routes.js";
import hotelsRoutes from "./routes/hotels.routes.js";
import roomsRoutes from "./routes/rooms.routes.js";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_NAME);
  } catch (e) {
    console.error(e.message);
  }
};
///check the connection status
mongoose.connection.on("connected", () => {
  console.log("Connected to database ✔️✔️✔️");
});
mongoose.connection.on("disconnected", () => {
  console.log("not Connected to database ❌❌❌");
});

///middlewares
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoutes);
app.use("/api/hotels", hotelsRoutes);
app.use("/api/rooms", roomsRoutes);

app.use((err, req, res, next) => {
  const errMessage = err.message || "somthing went wrong ";
  const errStatus = err.status || 500;
  return res.status(500).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stackL: err.stack,
  });
});

const port = 3000 || process.env.PORT;
app.listen(port, () => {
  connect();
  console.log(`listening on "localhost://${port}"`);
});
