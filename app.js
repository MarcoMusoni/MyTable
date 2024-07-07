var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/tables');

var app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/tables', usersRouter);

// login handler
app.post("/login", async function (req, res, next) {

  console.info(
    new Date().toLocaleString() + " | Login attempted: " + JSON.stringify(req.body)
  );

  if (!req.body.usrMail || !req.body.usrPsw) {
    res.status(400).json({ error: 'missing data' });
    return;
  }

  try {
    // check if the user exists
    let user = null;

    if (user) {
      //check if password matches
      const result = req.body.password === user.password;
      if (result) {
        res.render("tables");
      } else {
        res.status(401).json({ error: "password doesn't match" });
      }
    } else {
      res.status(404).json({ error: "user doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

// error handler
app.use(function (err, req, res, next) {
  console.log('>>> ' + err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
