var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var history = require('connect-history-api-fallback');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// 處理同源政策，最後可以拔掉
var cors = require('cors')
app.use(cors());
// 處理同源政策，最後可以拔掉



app.use('/', indexRouter);
app.use('/service/users', usersRouter);
//get 请求静态文件 配置 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

app.use('/users', usersRouter);

app.use(history({
  rewrites: [
    {//后缀为js|css 访问dist下相应文件
      from: /^\/js\/.*$/,
      to: function(context) {
        let thePath = '/' + context.parsedUrl.pathname;
        console.log(thePath, context);
        return thePath;
      }
    },
    {//访问路径不含dist则默认访问/dist/index.html
      from: /^\/css\/.*$/,
      to: function(context) {
        let thePath = '/' + context.parsedUrl.pathname;
        console.log(thePath, context);
        return thePath;
      }
    },
  ]
}));

app.use(express.static(path.join(__dirname, 'public')));




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

module.exports = app;
