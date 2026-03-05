const { body } = require("express-validator");

exports.validateCategory = [
  body("name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Name required")
    .isLength({ max: 15 })
    .withMessage("Name must be at most 15 characters long"),
];
