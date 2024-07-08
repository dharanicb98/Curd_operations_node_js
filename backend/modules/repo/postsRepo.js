const sql = require('../../db')
// CREATE TABLE posts (
//    id INT AUTO_INCREMENT PRIMARY KEY,
//    title VARCHAR(255) NOT NULL,
//    body TEXT
// );

const getAllPosts = async () => {
   try {
     const query = `SELECT * FROM posts ORDER BY id DESC`;
     const [rows, fields] = await sql.promise().query(query);
     console.log('rows', rows)
     return rows;
   }
   catch (e) {
      throw new Error(`db error ${e?.message}`)
   }
}

const createPost = async ( title, body ) => {
    try {
      const query = 'INSERT INTO posts (title, body) VALUES (?, ?)';
      const [result]  = await sql.promise().query(query, [title, body]);
     
      const postId = result?.insertId;
      const selectQuery = 'SELECT * FROM posts WHERE id = ?';
      const [rows] = await sql.promise().query(selectQuery, [postId]);
      return rows[0];
    }
    
    catch (e) {
       throw new Error(`db error ${e?.message}`)
    }
}


const updatePost = async (title, body, id) => {
    try {
      const query = 'UPDATE posts SET title = ?, body = ? WHERE id = ?';
      const [result] = await sql.promise().query(query, [title, body, id]);
      
      if (result.affectedRows > 0) {
         const selectQuery = 'SELECT * FROM posts WHERE id = ?';
         const [rows] = await sql.promise().query(selectQuery, [id]);
         return rows[0];
      }
    }
    catch (e) {
       throw new Error(`db error ${e?.message}`)
    }
}


const deletePost = async (postId) => {
    try {
      const query = 'DELETE FROM posts WHERE id = ?';
      const [result] = await sql.promise().query(query, [postId]);
      return result.affectedRows > 0; 
    }
    catch (e) {
       throw new Error(`db error ${e?.message}`)
    }
}

module.exports.getAllPosts = getAllPosts;
module.exports.createPost = createPost;
module.exports.updatePost = updatePost;
module.exports.deletePost = deletePost;