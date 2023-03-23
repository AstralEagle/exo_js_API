require('dotenv').config();
const express = require('express');
require('./DB');
const bodyParser = require('body-parser');

const authRoute = require('./route/auth');
const listRoute = require('./route/list');
const toDoRoute = require('./route/todo');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth', authRoute);
app.use('/list', listRoute);
app.use('/todo', toDoRoute);

app.listen(3000, () => {
  console.log('Server launched on port : 3000');
});
