// Get the client
import mysql from 'mysql2/promise';
import 'dotenv/config';
// const dotenv = require('dotenv')
// dotenv.config()


// Create the connection to database
/*const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'HealthDiary',
  password: 'Joshua'
});*/


const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

console.log(process.env.DB_HOST);
console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_NAME);


// const promisePool = pool.promise();

/* const connection = await pool.getConnection();

const [rows, fields] = await pool.query('SELECT `field` FROM `table`');
console.log(rows);
console.log(fields);

} catch (err) {
  console.log(err)
}
*/

// A simple SELECT query
/*try {
  const [results, fields] = await connection.query(
    'SELECT * FROM Users;'
  );

  console.log(results); // results contains rows returned by server
  console.log(fields); // fields contains extra meta data about results, if available
} catch (err) {
  console.log(err);
}*/
