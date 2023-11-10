import connection from "../db.js";

export async function postGame(req, res) {
  const game = req.body;
  console.log("category: ", game);
  try {
    const checkId = await connection.query(
      `
          SELECT * FROM categories WHERE id=$1
        `,
      [game.categoryId]
    );

    if (checkId.rows.length === 0) {
      res.res.status(400).send({
        message: "Esse Id de categoria não existe.",
      });
      return;
    }
    const queryGames = await connection.query(
      `
        INSERT INTO games (name,image,"stockTotal","categoryId","pricePerDay") 
        SELECT $1,$2,$3,$4,$5
        WHERE  NOT EXISTS (SELECT name FROM games WHERE name=$1)
      `,
      [
        game.name.toLowerCase(),
        game.image,
        game.stockTotal,
        game.categoryId,
        game.pricePerDay,
      ]
    );
    if (queryGames.rowCount === 1) {
      res.sendStatus(201);
    } else {
      res.status(409).send({
        message: "Esse jogo já existe.",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Algo deu errado, tente novamente",
      err: err.response,
    });
  }
}

export async function getGames(req, res) {
  const gameName = req.query.name;
  try {
    if (gameName) {
      const games = await connection.query(
        `
            SELECT games.*,categories.name as "categoryName" FROM games
            JOIN categories ON games."categoryId"=categories.id
            WHERE games.name ILIKE $1
          `,
        [gameName + "%"]
      );
      res.send(games.rows).status(200);
      return;
    }
    const games = await connection.query(
      `
          SELECT games.*,categories.name as "categoryName" FROM games
          JOIN categories ON games."categoryId"=categories.id
        `
    );
    res.send(games.rows).status(200);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Algo deu errado, tente novamente",
      err: err.response,
    });
  }
}
