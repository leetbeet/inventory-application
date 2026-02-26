const pool = require("../db/pool");

async function getAll() {
  const result = await pool.query("SELECT * FROM item ORDER BY id");
  return result.rows;
}

async function create(name, categoryId, brand, quantity) {
  const result = await pool.query(
    "INSERT INTO item (name, categoryId, brand, quantity) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, categoryId, brand, quantity],
  );
  return result.rows[0];
}

async function update(name, categoryId, brand, quantity, id) {
  const result = await pool.query(
    "UPDATE item SET name=$1, categoryId=$2, brand=$3, quantity=$4 WHERE id=$5 RETURNING *",
    [name, categoryId, brand, quantity, id],
  );
  return result.rows[0];
}

async function remove(id) {
  const result = await pool.query("DELETE FROM item WHERE id=$1 RETURNING *", [
    id,
  ]);
  return result.rows[0];
}

module.exports = {
  getAll,
  create,
  update,
  remove,
};
