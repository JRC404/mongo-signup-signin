const hbs = require('express-handlebars');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const userRouter = require('./routes/user');

mongoose.connect('mongodb+srv://dean:password123abc@cluster0-j1kc2.mongodb.net/userDB?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine('.hbs',hbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}));
app.set('view engine','.hbs');

app.use('/', userRouter);
app.use('/product', userRouter);

app.listen(3000);