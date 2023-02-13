import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import gamesRoutes from './routes/gamesRoutes.js'
import customersRoutes from "./routes/customersRoutes.js";
import rentalsRoutes from "./routes/rentalsRoutes.js";
dotenv.config();



const app = express();

app.use(express.json());
app.use(cors());

app.use([gamesRoutes, customersRoutes, rentalsRoutes])

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running in port ${port}`));