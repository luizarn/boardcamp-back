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
        const customerId = await db.query(`SELECT * FROM customers WHERE id = ${id} `)

        res.send(customerId.rows[0])
    } catch (error) {
        res.status(500).send(error.message)
    }
}


//POST /customers Inserir um cliente
export async function createCustomers(req, res) {
    const { name, phone, cpf, birthday } = req.body

    try {

        // if (name === "" || cpf.length !== 11 || birthday <= 0) return res.sendStatus(400)

        const cpfExist = await db.query(`SELECT * FROM customers WHERE cpf= $1 ; `, [cpf])

        if (cpfExist.rows.length > 0) return res.status(409).send("já tem esse cpf")

        await db.query(`INSERT INTO customers (name, phone, cpf, birthday) values ($1, $2, $3, $4);`, [name, phone, cpf, birthday])

        res.status(201).send("Cliente adicionado com sucesso")
    } catch (error) {

        res.status(500).send(error.message)

    }
}


// PUT /customers/:id Atualizar um cliente
export async function updateCustomer(req, res) {

    const { name, phone, cpf, birthday } = req.body

    const { id } = req.params

    try {
        const cpfExist =  await db.query(`SELECT * FROM customers WHERE cpf= $1 AND id<> $2 ; `, [cpf, id])

        if (cpfExist.rows.length > 0) return res.status(409).send("já tem esse cpf")

        await db.query(`UPDATE customers set name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id= $5`, [name, phone, cpf, birthday, id])

        res.status(204).send("Cliente atualizado com sucesso")
    } catch (error) {
        res.status(500).send(error.message)
    }
}