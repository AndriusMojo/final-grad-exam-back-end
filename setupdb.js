/* eslint-disable linebreak-style */
const mysql = require('mysql2/promise');
const dbConfig = require('./src/config');

const setup = async () => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [tables] = await con.execute('SHOW TABLES');
    if (!tables.find((x) => x.Tables_in_defaultdb === 'recipes')) {
      const [data] = await con.execute(
        `CREATE TABLE recipes (
            id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
            user_id INT NOT NULL,
            category_id INT NOT NULL,
            title VARCHAR(255) NOT NULL,
            ingredients TEXT NOT NULL,
            process TEXT NOT NULL,
            img_url VARCHAR(2083) NOT NULL,
            doc TIMESTAMP NOT NULL DEFAULT current_timestamp()
          )`,
      );
      console.log(data);
    }
    if (!tables.find((x) => x.Tables_in_defaultdb === 'users')) {
      const [data] = await con.execute(
        `CREATE TABLE users (
            id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
            name VARCHAR(100) NOT NULL,
            surname VARCHAR(100) NOT NULL,
            nickname VARCHAR(100) UNIQUE KEY NOT NULL,
            email VARCHAR(255) UNIQUE KEY NOT NULL,
            password VARCHAR(255) NOT NULL,
            dom TIMESTAMP NOT NULL DEFAULT current_timestamp()
          )
          `,
      );
      console.log(data);
    }
    if (!tables.find((x) => x.Tables_in_defaultdb === 'categories')) {
      const [data] = await con.execute(
        `CREATE TABLE categories (
              id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
              title VARCHAR(255) UNIQUE KEY NOT NULL
            )
            `,
      );
      console.log(data);
    }
    await con.end();
  } catch (err) {
    console.log(err);
  }
};

setup();
