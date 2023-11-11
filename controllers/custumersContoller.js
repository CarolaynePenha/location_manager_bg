import connection from "../db.js";

export async function postCustomer(req, res) {
  const customer = req.body;

  try {
    const queryCustomer = await connection.query(
      `
        INSERT INTO customers (name,phone,cpf,birthday) 
        SELECT $1,$2,$3,$4
        WHERE  NOT EXISTS (SELECT cpf FROM customers WHERE cpf=$3)
      `,
      [
        customer.name.toLowerCase(),
        customer.phone,
        customer.cpf,
        customer.birthday,
      ]
    );
    if (queryCustomer.rowCount === 1) {
      res.sendStatus(201);
    } else {
      res.status(409).send({
        message: "Esse cpf já existe.",
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

export async function getCustomers(req, res) {
  const { cpf } = req.query;
  const { offset } = req.query;
  const { limit } = req.query;
  try {
    if (cpf) {
      const customers = await connection.query(
        `
              SELECT * FROM customers
              WHERE customers.cpf LIKE $1
              LIMIT $2 OFFSET $3
            `,
        [cpf + "%", limit, offset]
      );
      res.status(200).send(customers.rows);
      return;
    }
    const customers = await connection.query(
      `
      SELECT * FROM customers
      LIMIT $1 OFFSET $2
          `,
      [limit, offset]
    );
    res.status(200).send(customers.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Algo deu errado, tente novamente",
      err: err.response,
    });
  }
}

export async function getCustomerById(req, res) {
  const { id } = req.params;
  try {
    const customer = await connection.query(
      `
                  SELECT * FROM customers
                  WHERE customers.id=$1
                `,
      [id]
    );
    if (customer.rowCount === 1) {
      res.status(200).send(customer.rows);
    } else {
      res.status(404).send("Esse id de cliente não existe");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Algo deu errado, tente novamente",
      err: err.response,
    });
  }
}

export async function updateCustomer(req, res) {
  const { id } = req.params;
  const customer = req.body;

  try {
    const queryCustomer = await connection.query(
      `
        UPDATE customers 
        SET name = $1,
        phone = $2,
        cpf = $3,
        birthday = $4
        WHERE id = $5
        AND NOT EXISTS (SELECT cpf FROM customers WHERE cpf = $3 AND id <> $5);
         
        `,
      [
        customer.name.toLowerCase(),
        customer.phone,
        customer.cpf,
        customer.birthday,
        id,
      ]
    );
    if (queryCustomer.rowCount === 1) {
      res.sendStatus(201);
    } else {
      res.status(409).send({
        message:
          "Esse cpf já está sendo utilizado por outro cliente, ou o id informado não existe.",
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
