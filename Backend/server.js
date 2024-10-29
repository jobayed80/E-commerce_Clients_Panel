const express = require("express")
const mysql = require('mysql')
const cors = require('cors')


const app = express()
app.use(cors())
// app.use(express.json())


// used for images
const moment = require("moment")
const multer = require('multer');
const path = require('path');



//create db
const db = mysql.createConnection({
    host : "localhost",
    user: "root",
    password: "",
    database: "fashion-ecommerce"

})

db.connect(err => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL');
  });


// Route to fetch all products
app.get('/products', (req, res) => {
  const query = 'SELECT * FROM shop ORDER BY Id DESC';
  db.query(query, (err, results) => {
      if (err) return res.status(500).send(err);

      // Convert binary data to base64
      const formattedResults = results.map(product => ({
          ...product,
          image: product.image.toString('base64') // Convert binary to base64
      }));

      res.send(formattedResults);
  });
});




// Route to fetch products with optional search by product type individual
app.get('/SearchProduct_Type', (req, res) => {
  const { type } = req.query;
  let sql = 'SELECT * FROM shop ';
  let params = [];

  // If a type is provided, modify the SQL query to include a WHERE clause
  if (type) {
      sql += ' WHERE Type = ?';
      params.push(type);
  }
  // Add ORDER BY clause to sort in descending order by id (or any other column)
  sql += ' ORDER BY Id DESC';


  db.query(sql, params, (err, results) => {
      if (err) {
          console.error('Error fetching products:', err);
          return res.status(500).json({ message: 'Failed to fetch products' });
      }
      // Convert image buffer to base64 for each product
      res.json(results.map(row => ({
          id: row.Id,
          Product_Name: row.Product_Name,
          Type: row.Type,
          Price: row.Price,
          image: Buffer.from(row.image).toString('base64'),
          mimeType: row.mimeType
      })));
  });
});




    
    app.get('/', (req,res)=>{
        return res.json("From Backend Jobayed hossain")
    })
    
    app.listen(8081, ()=>{
    console.log("listening")
})

