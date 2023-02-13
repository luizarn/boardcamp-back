import { db } from "../database/database.js"
import dayjs from "dayjs";

export async function findRentals(req, res) {

    try {

        const result = await db.query(`
                SELECT
                    rentals.*,
                    customers.id AS customer_id,
                    customers.name AS customer_name,
                    games.id AS game_id,
                    games.name AS game_name
                FROM rentals
                JOIN customers ON rentals."customerId" = customers.id
                JOIN games ON rentals."gameId" = games.id
                `);

        const rentals = result.rows.map((r) => {
            return {
                id: r.id,
                customerId: r.customerId,
                gameId: r.gameId,
                rentDate: r.rentDate,
                daysRented: r.daysRented,
                returnDate: r.returnDate,
                originalPrice: r.originalPrice,
                delayFee: r.delayFee,
                customer: {
                    id: r.customer_id,
                    name: r.customer_name,
                },
                game: {
                    id: r.game_id,
                    name: r.game_name,
                },
            };
        });
       
        console.log(rentals)

        res.send(rentals)

    } catch (error) {
        res.status(500).send(error.message)
    }
}


export async function createRental(req, res) {
    const { customerId, gameId, daysRented } = req.body
    let rentDate = dayjs().format()

    try {

        const customerIdExist = await db.query(`SELECT * FROM customers WHERE id=${customerId}`)

        if (customerIdExist.rows.length === 0) return res.status(400).send("não existe nenhum cliente com esse ID")

        const gameIdExist = await db.query(`SELECT * FROM games WHERE id=${gameId}`)

        if (gameIdExist.rows.length === 0) return res.status(400).send("não existe nenhum cliente com esse ID")

        const gameAvailable = await db.query(`SELECT * FROM rentals WHERE "gameId"=${gameId}`)

        if (gameIdExist.rows[0].stockTotal <= gameAvailable.rows.length) res.status(400).send("não há quantidade disponível para aluguél")

        let originalPrice = daysRented * gameIdExist.rows[0].pricePerDay

        await db.query(`INSERT INTO rentals (
            "customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
            values ($1, $2, $3, $4, $5, $6, $7);`, [customerId, gameId, rentDate, daysRented, null, originalPrice, null])

        res.sendStatus(201)
    } catch (error) {

        res.status(500).send(error.message)

    }
}

export async function finalizeRental(req, res) {

    let returnDate = dayjs().format("YYYY-MM-DD")
    const returnDateObj = new Date();

    const { id } = req.params

    try {

        const rentalId = await db.query(`SELECT * FROM rentals WHERE id = ${id} `)

        if (rentalId.rows.length === 0) return res.sendStatus(404)

        if (rentalId.rows[0].returnDate !== null) res.status(400).send("aluguel já foi finalizado anteriormente")

        await db.query(`UPDATE rentals set "returnDate"=$1 WHERE id= $2`, [returnDate, id])

        let newRentDate = new Date(rentalId.rows[0].rentDate)

        let difference = returnDateObj.getTime() - newRentDate.getTime()
   
        const price = await db.query(`SELECT * FROM games WHERE id=${rentalId.rows[0].gameId}`)
  
        const realPrice = (price.rows[0].pricePerDay)/100

        const delayDays = Math.ceil(difference / (1000 * 3600 * 24))

        let delayFee = (delayDays - rentalId.rows[0].daysRented) * realPrice

        await db.query(`UPDATE rentals set "returnDate"=$1, delayFee"=$2 WHERE id= $3`, [ returnDate, delayFee, id])

        res.status(200).send("Aluguél finalizado")
    } catch (error) {
        res.status(500).send(error.message)
    }
}


export async function deleteRental(req, res) {

    const { id } = req.params

    try {
        const rentalId = await db.query(`SELECT * FROM rentals WHERE id = ${id} `)

        if (rentalId.rows.length === 0) return res.sendStatus(404)

        if (rentalId.rows.returnDate !== null) res.status(400).send("aluguel já foi finalizado anteriormente")

        await db.query(`DELETE from rentals WHERE id=${id}`)

        res.status(200).send("Aluguel deletado com sucesso")
    } catch (error) {
        res.status(500).send(error.message)
    }
}