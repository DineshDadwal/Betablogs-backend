var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var dashboardRouter = require ('./routes/dashboard');
var adminRouter = require ('./routes/admin');
var userDataTableRouter = require ('./routes/userDataTable');
var categoryRouter = require('./routes/category');
var subcategoryRouter = require('./routes/subcategory');
var aboutRouter = require('./routes/about');
var topicRouter = require('./routes/topic');
var messageRouter = require('./routes/message');
var resetRouter = require('./routes/reset');
var googleRouter = require('./routes/google');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register',registerRouter);
app.use('/login',loginRouter);
app.use('/dashboard',dashboardRouter);
app.use('/admin',adminRouter);
app.use('/userDataTable',userDataTableRouter);
app.use('/category',categoryRouter);
app.use('/subcategory',subcategoryRouter);
app.use('/about',aboutRouter);
app.use('/topic',topicRouter);
app.use('/message',messageRouter);
app.use('/reset',resetRouter);
app.use('/google', googleRouter);
app.use('/uploads', express.static('./uploads'));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Database Connection
mongoose.connect("mongodb+srv://dinesh_dadwal:DDLB9216@cluster0.d6eft.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err)
    console.error(err)
  else
    console.info("DataBase Conected Success")
})

module.exports = app;
