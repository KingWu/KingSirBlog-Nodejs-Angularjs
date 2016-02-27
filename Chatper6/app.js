'use strict';
var messages = require('./controllers/messages');
var compress = require('koa-compress');
var logger = require('koa-logger');
var serve = require('koa-static');
var route = require('koa-route');
var koa = require('koa');
var path = require('path');
var app = module.exports = koa();


var moment = require('moment');
var winston = require('winston');
var winstonLogger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(
      {
        formatter: function(options) {
          return moment().format() +' # '+ options.level.toUpperCase() +': '+ (undefined !== options.message ? options.message : '') +
            (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
        }
      }
    )
  ]
});

// Logger
app.use(logger());

app.use(route.get('/', messages.home));
app.use(route.get('/messages', messages.list));
app.use(route.get('/messages/:id', messages.fetch));
app.use(route.post('/messages', messages.create));
app.use(route.get('/async', messages.delay));

// Serve static files
app.use(serve(path.join(__dirname, 'public')));
app.use(serve(path.join(__dirname, '.')));


// Compress
app.use(compress());

if (!module.parent) {
  app.listen(3000);
  console.log('listening on port 3000');
  winstonLogger.info('listening on port 3000');
}
