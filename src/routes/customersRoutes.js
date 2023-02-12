import { Router } from "express";
import { createCustomers, findCustomers, getCustomerbyId, updateCustomer } from "../controllers/Customer.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { customerSchema } from "../schema/customerSchema.js";


const customersRoutes = Router()

customersRoutes.get("/customers", findCustomers)
customersRoutes.get("/customers/:id", getCustomerbyId)
customersRoutes.post("/customers", validateSchema(customerSchema),createCustomers)
customersRoutes.put("/customers/:id", validateSchema(customerSchema),updateCustomer)

export default customersRoutes