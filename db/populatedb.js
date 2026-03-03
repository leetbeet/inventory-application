#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `
DROP TABLE IF EXISTS item CASCADE;
DROP TABLE IF EXISTS category CASCADE;

CREATE TABLE IF NOT EXISTS category (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ) NOT NULL
);

INSERT INTO category (name)
VALUES
  ('Computers'),
  ('Smartphones'),
  ('Networking'),
  ('Peripherals'),
  ('Components'),
  ('Storage');

CREATE TABLE IF NOT EXISTS item (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ) NOT NULL,
  categoryId INTEGER NOT NULL,
  brand VARCHAR ( 255 ) NOT NULL,
  quantity INTEGER NOT NULL,

  CONSTRAINT fk_item_category
  FOREIGN KEY (categoryId)
  REFERENCES category(id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);

INSERT INTO item (name, categoryId, brand, quantity)
VALUES
  ('ThinkPad X1 Carbon Gen 11', 1, 'Lenovo', 8),
  ('MacBook Pro 14 M3', 1, 'Apple', 5),

  ('iPhone 15 Pro', 2, 'Apple', 12),
  ('Galaxy S24 Ultra', 2, 'Samsung', 10),

  ('RTX 4070 Graphics Card', 3, 'NVIDIA', 6),
  ('Ryzen 7 7800X3D CPU', 3, 'AMD', 4),

  ('Mechanical Keyboard K8', 4, 'Keychron', 15),
  ('MX Master 3S Mouse', 4, 'Logitech', 20),

  ('UniFi 6 Long Range Access Point', 5, 'Ubiquiti', 7),
  ('AX6000 WiFi Router', 5, 'TP-Link', 9),

  ('Samsung 980 Pro 1TB SSD', 6, 'Samsung', 14),
  ('WD Blue 4TB HDD', 6, 'Western Digital', 11);
`;

async function main() {
  console.log("seeding...");

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("done");
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

main();
