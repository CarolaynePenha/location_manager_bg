import connection from "../db.js";

export async function postCategory(req, res) {
  const { categoryName } = req.body;
  console.log("category: ", categoryName);
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
  try {
    const queryCategory = await connection.query(
      `
      SELECT * FROM categories 
    `
    );
    res.send(queryCategory.rows).status(200);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Algo deu errado, tente novamente",
      err: err.response,
    });
  }
}
