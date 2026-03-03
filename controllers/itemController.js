const itemModel = require("../models/itemModel");

async function list(req, res) {
  const items = await itemModel.getAll();
  const category = null;
  res.render("item/list", { category, items });
}

function showCreate(req, res) {
  res.render("item/form");
}

async function create(req, res) {
  const { name, categoryId, brand, quantity } = req.body;
  await itemModel.create(name, categoryId, brand, quantity);
  res.redirect("/item");
}

async function showUpdate(req, res) {
  const item = await itemModel.getById(req.params.id);
  res.render("item/form", { item });
}

async function update(req, res) {
  const { name, categoryId, brand, quantity } = req.body;
  await itemModel.update(name, categoryId, brand, quantity, req.params.id);
  res.redirect("/item");
}

async function showRemove(req, res) {
  const item = await itemModel.getById(req.params.id);
  res.render("item/delete", { item });
}

async function remove(req, res) {
  await itemModel.remove(req.params.id);
  res.redirect("/item");
}

module.exports = {
  list,
  showCreate,
  create,
  showUpdate,
  update,
  showRemove,
  remove,
};
