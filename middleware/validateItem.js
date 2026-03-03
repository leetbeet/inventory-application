const { body, validationResult } = require("express-validator");

exports.validateItem = [
  body("name").trim().escape().notEmpty().withMessage("Name required"),
  body("categoryId")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Category ID required")
    .isInt({ min: 1 })
    .withMessage("Category ID must be an integer greater than or equal to 1")
    .toInt(),
  body("brand")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Brand required")
    .isLength({ min: 1, max: 200 })
    .withMessage("Brand must be between 1 and 200 characters"),
  body("quantity")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Quantity required")
    .isInt({ min: 1 })
    .withMessage("Quantity must be an integer greater than or equal to 1")
    .toInt(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];
