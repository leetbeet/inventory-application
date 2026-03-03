const express = require("express");
const router = express.Router();
const controller = require("../controllers/itemController");
const { validateItem } = require("../middleware/validateItem");
const { validatePassword } = require("../middleware/validatePassword");

router.get("/", controller.list);

router.get("/create", controller.showCreate);
router.post("/create", validateItem, controller.create);

router.get("/:id/delete", controller.showRemove);
router.post("/:id/delete", validateItem, validatePassword, controller.remove);

router.get("/:id/update", controller.showUpdate);
router.post("/:id/update", validateItem, validatePassword, controller.update);

module.exports = router;
