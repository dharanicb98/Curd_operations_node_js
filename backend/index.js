const express = require("express");
const cors = require("cors");
const routes = require('./routes')
const sql = require('./db')
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.NODE_SERVER_PORT || 5000;

//db initilize 
sql.getConnection((error, connection) => {
  if (error) {
    console.error('Error connecting to the database:', error);
    return;
  }
    console.log('Database connection established.');
    connection.release();
})

routes.setUpRoutes(app)
  
app.listen(PORT, () => {
    console.log(`Server successfully started  http://localhost:${PORT}`);
});