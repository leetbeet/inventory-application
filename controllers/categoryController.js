const categoryModel = require("../models/categoryModel");
const itemModel = require("../models/itemModel");

async function list(req, res) {
  const categories = await categoryModel.getAll();
  res.render("category/list", { categories });
}

async function listItems(req, res) {
  const category = await categoryModel.getById(req.params.id);
  const items = await itemModel.getByCategory(req.params.id);
  res.render("item/list", { category, items });
}

function showCreate(req, res) {
  const category = null;
  res.render("category/form", { category });
}

async function create(req, res) {
  await categoryModel.create(req.body.name);
  res.redirect("/category");
}

async function showUpdate(req, res) {
  const category = await categoryModel.getById(req.params.id);
  res.render("category/form", { category });
}

async function update(req, res) {
  await categoryModel.update(req.body.name, req.params.id);
  res.redirect("/category");
}

async function showRemove(req, res) {
  const category = await categoryModel.getById(req.params.id);
  res.render("category/delete", { category });
}

async function remove(req, res) {
  await categoryModel.remove(req.params.id);
  res.redirect("/category");
}

module.exports = {
  list,
  listItems,
  showCreate,
  create,
  showUpdate,
  update,
  showRemove,
  remove,
};
