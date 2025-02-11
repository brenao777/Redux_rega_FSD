const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const notebookRouter = require('./routes/notebookRouter');
const noteRouter = require('./routes/noteRouter');
const tokenRouter = require('./routes/tokenRouter');
const authRouter = require('./routes/authRouter');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/api/notebooks', notebookRouter);
app.use('/api/tokens', tokenRouter);
app.use('/api/notes', noteRouter);
app.use('/api/auth', authRouter);

module.exports = app;
