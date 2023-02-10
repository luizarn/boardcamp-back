import { db } from "../database/database.js"

//POST Games
export async function createGames(req, res) {
    const transaction = res.locals.transaction
  
    try {
        //o stocktotal e priceperday devem ser maiores do que 0, se for menor --> status 400
        //não pode criar um nome que já existe, colocar condição, se já tiver ---> status 409 
      await transactionsCollection.insertOne(transaction)
      res.sestatus(201).send("Jogo criado com sucesso")
    } catch (error) {
      console.error(error)
      res.status(500).send("Houve um problema no servidor")
    }
  
  }
  

//GET GAMES
  export async function findGames(req, res) {

  
    try {
      const games = await db.query("SELECT * FROM games")
  
      res.send(games.rows)

    } catch (error) {
      res.status(500).send(error.message)
    }

  }