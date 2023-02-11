import { Router } from "express";
import { createCostumers, findCustomers, getCustomerbyId } from "../controllers/Costumer.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { costumerSchema } from "../schema/costumerSchema.js";


const customersRoutes = Router()

customersRoutes.get("/customers", findCustomers)
customersRoutes.get("/customers/:id", getCustomerbyId)
customersRoutes.post("/customers", validateSchema(costumerSchema),createCostumers)

export default customersRoutes