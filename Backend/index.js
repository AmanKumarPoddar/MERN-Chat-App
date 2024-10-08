import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/messageRoute.js";
import { app, server } from "./socket/socket.js";
import cors from "cors";

dotenv.config({});

const PORT = process.env.PORT || 5000;

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// const corsOption = {
//   origin: "http://localhost:3000",
//   credentials: true,
// };
const corsOption =  { origin: 'https://mern-chat-app-drab-one.vercel.app', // Allow requests from your frontend URL
methods: ['GET', 'POST', 'PUT', 'DELETE'],
allowedHeaders: ['Content-Type', 'Authorization'],
credentials:true
}

app.use(cors(corsOption));

//routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

server.listen(PORT, () => {
  connectDb();
  console.log(`Server is listening on port ${PORT}`);
});
