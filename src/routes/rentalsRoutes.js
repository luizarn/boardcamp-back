import { Router } from "express";
import { createRental, deleteRental, finalizeRental, findRentals } from "../controllers/Rentals.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { rentalSchema } from "../schema/rentalSchema.js";


const rentalsRoutes = Router()

rentalsRoutes.get("/rentals", findRentals)
rentalsRoutes.post("/rentals", validateSchema(rentalSchema),createRental)
rentalsRoutes.post("/rentals/:id/return", finalizeRental)
rentalsRoutes.delete("/rentals/:id", deleteRental)

export default rentalsRoutes