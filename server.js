   // server.js
   const express = require('express');
   const bodyParser = require('body-parser');
   const cors = require('cors');
   require('dotenv').config();

   const app = express();
   const PORT = process.env.PORT || 5000;

   // Middleware
   app.use(cors());
   app.use(bodyParser.json());

   // User details (hardcoded for this example)
   const userId = "john_doe_17091999";
   const email = "john@xyz.com";
   const rollNumber = "ABCD123";

   // POST endpoint
   app.post('/bfhl', (req, res) => {
       const inputData = req.body.data;

       if (!Array.isArray(inputData)) {
           return res.status(400).json({ is_success: false, message: "Invalid input" });
       }

       const numbers = inputData.filter(item => !isNaN(item));
       const alphabets = inputData.filter(item => /^[A-Za-z]$/.test(item));
       const highestAlphabet = alphabets.length > 0 ? [alphabets.reduce((a, b) => a > b ? a : b)] : [];

       res.json({
           is_success: true,
           user_id: userId,
           email: email,
           roll_number: rollNumber,
           numbers: numbers,
           alphabets: alphabets,
           highest_alphabet: highestAlphabet
       });
   });

   // GET endpoint
   app.get('/bfhl', (req, res) => {
       res.status(200).json({ operation_code: 1 });
   });

   // Start the server
   app.listen(PORT, () => {
       console.log(`Server is running on http://localhost:${PORT}`);
   });