const express = require("express");
const router = express.Router();
const controller = require("../controllers/itemController");
const { validateItem } = require("../middleware/validateItem");
const { validatePassword } = require("../middleware/validatePassword");
const handleValidation = require("../middleware/handleValidation");
const itemModel = require("../models/itemModel");

router.get("/", controller.list);

router.get("/create", controller.showCreate);
router.post(
  "/create",
  validateItem,
  validatePassword,
  handleValidation("item/form", async () => ({ item: null })),
  controller.create,
);

router.get("/:id/update", controller.showUpdate);
router.post(
  "/:id/update",
  validateItem,
  validatePassword,
  handleValidation("item/form", async (req) => {
    const item = await itemModel.getById(req.params.id);
    return { item };
  }),
  controller.update,
);

router.get("/:id/delete", controller.showRemove);
router.post(
  "/:id/delete",
  validatePassword,
  handleValidation("item/delete", async (req) => {
    const item = await itemModel.getById(req.params.id);
    return { item };
  }),
  controller.remove,
);

module.exports = router;
