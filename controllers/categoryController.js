import connection from "../db.js";

export async function postCategory(req, res) {
  const { categoryName } = req.body;

  try {
    const queryCategory = await connection.query(
      `
      INSERT INTO categories (name) 
      SELECT ($1)
      WHERE  NOT EXISTS (SELECT name FROM categories WHERE name=$1)
    `,
      [categoryName.toLowerCase()]
    );
    if (queryCategory.rowCount === 1) {
      res.sendStatus(201);
    } else {
      res.status(409).send({
        message: "A categoria já existe.",
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

export async function getCategory(req, res) {
  const { offset } = req.query;
  const { limit } = req.query;
  try {
    const queryCategory = await connection.query(
      `
        SELECT * FROM categories LIMIT $1  OFFSET $2 
      `,
      [limit, offset]
    );
    res.send(queryCategory.rows).status(200);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Algo deu errado, tente novamente",
      err: err.response,
    });
  }
}
