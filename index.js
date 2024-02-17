const express = require("express");
const { body, validationResult } = require('express-validator');
const axios = require("axios");
const con = require("./config");
const app = express();

app.use(express.json());

//get API
app.get('/api/thirdPartyGetAPI', async (req, res) => {
    try {
    //   const apiResponse = await axios.get('https://reqres.in/api/users?page=1');
      const apiResponse = await axios.get('https://reqres.in/api/users/2');
      const responseData = apiResponse.data;
    //   const email = responseData.data.email;
      const finalResult = { 
            id: responseData.data.id,
            firstName: responseData.data.first_name,
            lastName: responseData.data.last_name,
            email: responseData.data.email
        };
      res.json({ Status: 200, Data: finalResult, Message: "Success" })
    } 
    catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

//post API
app.post('/api/thirdPartyPostAPI', [
    body('name')
        .notEmpty().withMessage('Name field is required.')
        .matches(/^[A-Za-z\s]+$/).withMessage('Name must be alphabetic.')
        .isLength({ min: 10, max: 20 }).withMessage('Name length should be 10 to 20 characters'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({ Status: 400, Data: errors.array(), Message: "Failed" })
        }
        else{
            try {
                const postData = req.body;
                const apiResponse = await axios.post('https://reqres.in/api/users', postData);
                const responseData = apiResponse.data;
                res.json({ Status: 200, Data: responseData, Message: "Success" })
            } 
            catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
});

app.listen(5000);
