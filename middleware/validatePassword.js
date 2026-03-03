const { body, validationResult } = require("express-validator");
require("dotenv").config();

exports.validatePassword = [
  body("pass")
    .trim()
    .notEmpty()
    .withMessage("Password required")
    .custom((value) => {
      if (value !== process.env.PASSWORD) {
        throw new Error("Incorrect password");
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];
