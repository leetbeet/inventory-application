const express = require("express");
const router = express.Router();
const controller = require("../controllers/categoryController");
const { validateCategory } = require("../middleware/validateCategory");
const { validatePassword } = require("../middleware/validatePassword");

router.get("/", controller.list);

router.get("/create", controller.showCreate);
router.post("/create", validateCategory, controller.create);

router.get("/:id", controller.listItems);

router.get("/:id/delete", controller.showRemove);
router.post(
  "/:id/delete",
  validateCategory,
  validatePassword,
  controller.remove,
);

router.get("/:id/update", controller.showUpdate);
router.post(
  "/:id/update",
  validateCategory,
  validatePassword,
  controller.update,
);

module.exports = router;
