const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/index');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json())
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'pug');
app.use(authRoute);

app.get('/', (req, res) => {
   const theme = req.cookies.theme || 'dark';  
   const userAuth = req.cookies.user_token ? true : false; 
 
   res.render('index', { theme, userAuth });
 });

app.listen(port, () => {
   console.log(`Server listening on port ${port}`);
});