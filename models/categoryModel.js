const pool = require("../db/pool");

async function getAllCategories() {
  const result = await pool.query("SELECT * FROM category ORDER BY id");
  return result.rows;
}

async function addCategory(name) {
  const result = await pool.query(
    "INSERT INTO category (name) VALUES ($1) RETURNING *",
    [name],
  );
  return result.rows[0];
}

async function updateCategory(name, id) {
  const result = await pool.query(
    "UPDATE category SET name=$1 WHERE id=$2 RETURNING *",
    [name, id],
  );
  return result.rows[0];
}

async function deleteCategory(id) {
  const result = await pool.query(
    "DELETE FROM category WHERE id=$1 RETURNING *",
    [id],
  );
  return result.rows[0];
}

module.exports = {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};
