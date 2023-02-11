import { db } from "../database/database.js"
// GET/customers Listar clientes

export async function findCustomers(req, res) {

    try {
        const customers = await db.query("SELECT * FROM customers")

        res.send(customers.rows)

    } catch (error) {
        res.status(500).send(error.message)
    }
}

//GET/customers/:id Buscar um cliente por id

export async function getCustomerbyId(req, res) {

    const { id } = req.params

    try {
        const customerId = db.query(`SELECT * FROM customers WHERE id= $1;`, [id])

        if(!customerId) return res.sendStatus(404)

        res.send(customerId.rows[0])
    } catch (error) {
        res.status(500).send(error.message)
    }
}
//POST /customers Inserir um cliente
export async function createCostumers(req, res) {
    const { name, phone, cpf, birthday } = req.body

    try {

        // if (name === "" || cpf.length !== 11 || birthday <= 0) return res.sendStatus(400)

        const cpfExist = await db.query(`SELECT * FROM games WHERE cpf= $1 ; `, [cpf])

        if (cpfExist.rows.length > 0) return res.status(409).send("já tem esse cpf")

        await db.query(`INSERT INTO games (name, phone, cpf, birthday) values ($1, $2, $3, $4);`, [name, phone, cpf, birthday])

        res.status(201).send("Cliente adicionado com sucesso")
    } catch (error) {

        res.status(500).send(error.message)

    }
}


//PUT /customers/:id Atualizar um cliente
// export async function getCustomerbyId(req, res) {

//     const { id } = req.params

//     try {
//         const customerId = db.query(`UPDATE customers set WHERE id= $1;`, [id])

//         if(!customerId) return res.sendStatus(404)

//         res.send(customerId.rows[0])
//     } catch (error) {
//         res.status(500).send(error.message)
//     }
// }