import { db } from "../database/database.js"
// GET/customers Listar clientes

export async function findCustomers(req, res) {

 try { 
    const customers = await db.query("SELECT * FROM clientes") 
    
    res.send(customers.rows)

 } catch (error) { 
    res.status(500).send(error.message) 
}
 }

//GET/customers/:id Buscar um cliente por id

export async function getCustomerbyId(req, res){

 const {id} = req.params

try{ 
    const customerId = db.query(`SELECT * FROM clientes WHERE id=${id}`)
     res.send(customerId.rows[0]) 
    } catch(error){ 
        res.status(500).send(error.message)
    }
}
//POST /customers Inserir um cliente

//PUT /customers/:id Atualizar um cliente