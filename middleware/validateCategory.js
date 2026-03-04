const { body } = require("express-validator");

exports.validateCategory = [
  body("name").trim().escape().notEmpty().withMessage("Name required"),
];
