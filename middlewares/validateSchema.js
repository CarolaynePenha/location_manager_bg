import joi from "joi";
import dayjs from "dayjs";

export async function categorySchema(req, res, next) {
  const categorySchema = joi.object({
    categoryName: joi.string().required().max(50),
  });

  const validation = categorySchema.validate(req.body, {
    abortEarly: false,
  });
  if (validation.error) {
    res.status(422).send(validation.error.details);
    return;
  }
  next();
}

export async function gameSchema(req, res, next) {
  const gameSchema = joi.object({
    name: joi.string().required().max(50),
    image: joi.string().uri().required(),
    stockTotal: joi.number().integer().greater(0).required(),
    categoryId: joi.number().integer().required(),
    pricePerDay: joi.number().integer().greater(0).required(),
  });

  const validation = gameSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    res.status(422).send(validation.error.details);
    return;
  }
  next();
}

export async function customerSchema(req, res, next) {
  const date = dayjs().subtract(18, "year").format("YYYY/MM/DD");

  const gameSchema = joi.object({
    cpf: joi
      .string()
      .pattern(/([0-9]{11})/)
      .required(),
    phone: joi.string().max(11).min(10).required().regex(/^\d+$/),
    name: joi.string().required().max(50),
    birthday: joi.date().iso().less(date),
  });

  const validation = gameSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    res.status(422).send(validation.error.details);
    return;
  }
  next();
}

export async function reantalsSchema(req, res, next) {
  const rentSchema = joi.object({
    customerId: joi.required(),
    gameId: joi.required(),
    daysRented: joi.required(),
  });

  const validation = rentSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    res.status(422).send(validation.error.details);
    return;
  }
  next();
}
