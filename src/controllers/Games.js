import { db } from "../database/database.js"

export async function createGames(req, res) {
  const { name, image, stockTotal, pricePerDay } = req.body

  try {

    if(!name || name === "" || stockTotal <= 0 || pricePerDay <= 0) return res.sendStatus(400)

    const nameExist = await db.query(`SELECT * FROM games WHERE name= $1; `, [name])

    if (nameExist.rows.length > 0) return res.status(409).send("já tem esse nome")

    await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") values ($1, $2, $3, $4);`, [name, image, stockTotal, pricePerDay])

    res.status(201).send("Jogo criado com sucesso")
  } catch (error) {

    res.status(500).send(error.message)

  }
}

export async function findGames(req, res) {

  try {
    const games = await db.query("SELECT * FROM games")

    res.send(games.rows)

  } catch (error) {
    res.status(500).send(error.message)
  }
}