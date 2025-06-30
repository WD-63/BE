const validateBody = (schema) => (req, res, next) => {
  const error = true;
  //   Validation logic ...
  if (error) {
    next(new Error("Validation failed", { cause: 400 }));
  } else {
    console.log("Validation passed");
    req.validatedBody = req.body;
    next();
  }
};

export default validateBody;
