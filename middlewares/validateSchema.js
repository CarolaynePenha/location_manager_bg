import joi from "joi";

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
