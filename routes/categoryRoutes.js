const express = require("express");
const router = express.Router();
const controller = require("../controllers/categoryController");
const { validateCategory } = require("../middleware/validateCategory");
const { validatePassword } = require("../middleware/validatePassword");
const handleValidation = require("../middleware/handleValidation");
const categoryModel = require("../models/categoryModel");

router.get("/", controller.list);

router.get("/create", controller.showCreate);
router.post(
  "/create",
  validateCategory,
  validatePassword,
  handleValidation("category/form", async () => ({ category: null })),
  controller.create,
);

router.get("/:id/update", controller.showUpdate);
router.post(
  "/:id/update",
  validateCategory,
  validatePassword,
  handleValidation("category/form", async (req) => {
    const category = await categoryModel.getById(req.params.id);
    return { category };
  }),
  controller.update,
);

router.get("/:id/delete", controller.showRemove);
router.post(
  "/:id/delete",
  validatePassword,
  handleValidation("category/delete", async (req) => {
    const category = await categoryModel.getById(req.params.id);
    return { category };
  }),
  controller.remove,
);

router.get("/:id", controller.listItems);

module.exports = router;
