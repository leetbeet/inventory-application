const { body } = require("express-validator");
require("dotenv").config();

exports.validatePassword = [
  body("pass")
    .trim()
    .custom((value) => {
      if (value !== process.env.PASSWORD) {
        throw new Error("Incorrect password");
      }
      return true;
    }),
];
