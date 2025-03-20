import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";

dotenv.config();
connectDB();

const app = express();

app.use(express.json()); 
app.use(cors()); 


app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
