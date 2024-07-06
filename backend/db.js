const mysql = require("mysql2");

const sql = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "product",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const getAllUsers = (id) => {
  if (id) {
    return new Promise(function (resolve, reject) {
      sql.query(
        "SELECT * FROM product WHERE id = ?",
        [id],
        function (err, rows, cols) {
          if (err) {
            console.error(err, "Data loading failed");
            reject(err);
          } else {
            console.log(rows, "data loading success");
            resolve(rows);
          }
        }
      );
    });
  } else {
    return new Promise(function (resolve, reject) {
      sql.query("SELECT * FROM product", function (err, rows, cols) {
        if (err) {
          console.error(err, "Data loading failed");
          reject(err);
        } else {
          console.log(rows, "data loading success");
          resolve(rows);
        }
      });
    });
  }
};

const createAllUsers = (name, price, brand, category) => {
  return new Promise(function (resolve, reject) {
    sql.query(
      `INSERT INTO product(name , price , brand , category) VALUES(?,?,?,?)`,
      [name, price, brand, category],
      function (err, rows, cols) {
        if (err) {
          console.error(err, "Data insertion failed");
          reject(err);
        } else {
          console.log(rows, "data insertion success");
          resolve(rows);
        }
      }
    );
  });
};


const updateAllUsers = (id, name, price, brand, category) => {
  return new Promise(function (resolve, reject) {
    sql.query(
      `UPDATE product SET name = ? , price = ? , brand = ?, category = ? WHERE id = ?`,
      [name, price, brand, category, id],
      function (err, rows, cols) {
        if (err) {
          reject(err);
          console.error(err, "Data loading failed");
        } else {
          resolve(rows);
          console.log(rows, "data loading success");
        }
      }
    );
  });
};

const deleteAllUsers = (id) => {
  return new Promise(function (resolve, reject) {
    getAllUsers(id)
      .then((result) => {
        if (result.length > 0) {
          sql.query(
            `DELETE FROM product WHERE id = ?`,
            [id],
            function (err, rows, cols) {
              if (err) {
                reject(err);
                console.error(err, "Data loading failed");
              } else {
                resolve(rows);
                console.log(rows, "data loading success");
              }
            }
          );
        } 
        else {
          console.log("not found");
        //   reject(404);
        }
      })
      .catch((err) => {
        console.log("not found");
        reject(404);
      });
  });
};

getAllUsers();

// createAllUsers("Shirt", 2999 , "Levis" , "Clothing");
// updateAllUsers(1 ,"T-shirt", 500 , "Levis" , "Clothing");
// deleteAllUsers(8);

module.exports = {
  getAllUsers,
  createAllUsers,
  updateAllUsers,
  deleteAllUsers,
};

// create table from your database 
// this using for curd operations  

// CREATE TABLE product (
//   id int PRIMARY KEY AUTO_INCREMENT,
//   phone varchar(100),
//   price INTEGER,
//   brand VARCHAR(100),
//   category VARCHAR(100),
// )