import dayjs from "dayjs";
import connection from "../db.js";

export async function postRentals(req, res) {
  const rental = req.body;
  const rentDate = dayjs().format("DD/MM/YYYY");

  try {
    if (rental.daysRented < 1) {
      res.send("Insira um numero de dias de aluguel maior que 0").status(400);
      return;
    }
    const queryPriceStock = await connection.query(
      `
        SELECT games."pricePerDay",games."stockTotal" FROM games
        WHERE id =$1
        AND EXISTS (SELECT id FROM customers WHERE id=$2)
            `,
      [rental.gameId, rental.customerId]
    );
    if (queryPriceStock.rowCount === 1) {
      const pricePerDay = queryPriceStock.rows[0].pricePerDay;
      const stockTotal = queryPriceStock.rows[0].stockTotal;
      const queryOpenLocation = await connection.query(
        `
        SELECT COUNT(*) AS count
        FROM rentals
        WHERE "gameId" = $1 AND "returnDate" IS NULL;
          `,
        [rental.gameId]
      );
      const openLocation = queryOpenLocation.rows[0].count;

      console.log("openLocation: ", openLocation);
      console.log("stockTotal: ", stockTotal);

      if (stockTotal - openLocation >= 0) {
        const originalPrice = pricePerDay * rental.daysRented;
        const queryRental = await connection.query(
          `INSERT INTO rentals ("customerId","gameId","daysRented","rentDate","originalPrice")
              VALUES ($1,$2,$3,$4,$5)
                    `,
          [
            rental.customerId,
            rental.gameId,
            rental.daysRented,
            rentDate,
            originalPrice,
          ]
        );
        res.sendStatus(201);
        return;
      }
    }

    res.sendStatus(400);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Algo deu errado, tente novamente",
      err: err.response,
    });
  }
}
