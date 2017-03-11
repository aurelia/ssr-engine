var express = require('express');
var path = require('path');
var app = express();
var aureliaSSR = require('../../dist/commonjs/aurelia-ssr-engine').middleware;

app.use(aureliaSSR({
  relativeToDir: path.resolve(__dirname, '..', 'src'),
  indexPath: path.resolve(__dirname, '../index.html') // this should be removed
}));

app.get('/', function (req, res, next) {
  res.send('Hello, world!');
});

// development error handler
// will print stacktrace
app.use(function (err, req, res, next) {
	var response = {
		status: "fail",
		timestamp: Date.now(),
		message: err.message,
    error: err.stack
	};

	res.status(err.status || 500);

	console.error(err);
	console.error(err.stack);
	res.json(response);
});

module.exports = app;
