const { body } = require("express-validator");

exports.validateItem = [
  body("name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Name required")
    .isLength({ max: 15 })
    .withMessage("Name must be at most 15 characters long"),
  body("categoryId")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Category ID required")
    .isInt({ min: 1, max: 10000 })
    .withMessage(
      "Category ID must be an integer greater than or equal to 1 and less than or equal to 100000",
    )
    .toInt(),
  body("brand")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Brand required")
    .isLength({ min: 1, max: 15 })
    .withMessage("Brand must be between 1 and 15 characters"),
  body("quantity")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Quantity required")
    .isInt({ min: 1, max: 10000 })
    .withMessage(
      "Quantity must be an integer greater than or equal to 1 and less than or equal to 10000",
    )
    .toInt(),
];
