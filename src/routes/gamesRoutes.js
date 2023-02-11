import { Router } from "express";
import { createGames, findGames } from "../controllers/Games.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { gameSchema } from "../schema/gameSchema.js";

const gamesRoutes = Router()

gamesRoutes.get("/games", findGames)
gamesRoutes.post("/games", validateSchema(gameSchema),createGames)

export default gamesRoutes