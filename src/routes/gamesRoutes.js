import { Router } from "express";
import { createGames, findGames } from "../controllers/Games";
import { gameSchema } from "../schema/gameSchema";

const gamesRoutes = Router()

gamesRoutes.get("/games", gameSchema, findGames)
gamesRoutes.post("/games", gameSchema, createGames)