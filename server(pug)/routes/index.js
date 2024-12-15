const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const secretKey = 'secretKey24'; 

let users = [{username:"Jonh", password:"1234"}];


router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const existingUser = users.find(user => user.username === username);
  console.log("ExistingUser", existingUser)

  if (existingUser) {
    return res.status(400).send('This user already exists');
  }
  users.push({ username, password });

  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
  console.log("token===>", token)
  res.cookie('user_token', token, { httpOnly: true }); 
  res.redirect('/');  
  console.log('register users===>')
});


router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // find in database
  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    return res.status(400).send('Error username or password');
  }

  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
  res.cookie('user_token', token, { httpOnly: true }); 
  res.redirect('/'); 
  console.log('login user===>', users)
});

module.exports = router;