const devLogger = require('koa-logger');
const debug = require('debug')('homework:server');
const config = require('config');
const Koa = require('koa');
const app = new Koa();
const staticMW = require('./middlewares/static');
const responseMW = require('./middlewares/responseTime');
const pugMW = require('./middlewares/templates');
const bodyparser = require('koa-bodyparser');
const busboyParser = require('./busboyParser');
const router = require('./router');
const catchError = require('./catchError');

app.use(devLogger());
app.use(responseMW);
app.use(staticMW);
app.use(pugMW);
app.use(bodyparser({
    formLimit: '1mb',
    jsonLimit: '1mb',
    textLimit: '1mb'
}));
app.use(busboyParser);
app.use(router.routes());
app.use(async (ctx, next) => {
    await next();
    ctx.throw(404);
});
app.use(router.allowedMethods({
    throw: true
}));

app.on('error', async err => {
    debug('server error:', err);
});

catchError();

app.listen(config.port, () => {
    debug('Server is running on port %s http://%s:%s', config.port, config.host, config.port);
    console.log('Server is running on port %s http://%s:%s', config.port, config.host, config.port);
});
