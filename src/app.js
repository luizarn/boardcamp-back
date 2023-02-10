import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from './routes/auth.routes.js'
import transactionRoutes from './routes/transaction.routes.js'

const app = express();

app.use(express.json());
app.use(cors());

app.use([authRoutes, transactionRoutes])

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running in port ${port}`));