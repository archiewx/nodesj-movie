var express = require('express');
var path = require("path");
var bodyParser = require("body-parser");
var cookieSession = require('cookie-session');
// var session = require('express-session');
var cookieParser = require('cookie-parser');

var mongoose = require("mongoose");
// var mongoStore = require('connect-mongo')(session);


// 设置端口
var port = process.env.PORT || 3000;
// 实例化express
var app = express();


//
var dbUrl = 'mongodb://localhost/movie'
// 链接本地数据库
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl);


// 设置视图根目录
app.set("views" , "./app/views/pages");
//设置视图引擎
app.set("view engine" , "jade");
app.use(bodyParser.urlencoded({extended : true}));
//设置静态资源
app.use(express.static(path.join(__dirname,'public')));
// 使用cookie和session
app.use(cookieParser());
app.use(cookieSession({
	secret: 'movie',
}));

var morgan = require('morgan');

if('development' == app.get('env')) {
	app.set('showStack', true);
	var logger = morgan('dev');
	app.use(logger);
	app.locals.pretty = true;
	mongoose.set('debug', true);
}



require('./config/routes')(app);

// app.use(session({
// 	secret: 'movie',
// 	store: new mongoStore({
// 		url: dbUrl,
// 		collection: 'sessions'
// 	})
// }))
app.locals.moment = require('moment');
app.listen(port);



console.log("server started on port : " + port );









