const serve = require('koa-static');
const path  = require('path');
const debug = require('debug')('homework:static');


module.exports = async function (ctx, next) {

    const staticPath = path.join(__dirname, '../');
    const bootstrapPath = path.join(__dirname, '../node_modules/bootstrap/dist/css/');
    const url = ctx.request.url;

    debug(url);

    if (url.match(/\/static\/\w+\.(ico|css|html)/) || url.match(/\/data\/\w+\.(jpg|jpeg|png)/)) {
        return serve(staticPath, {
            maxAge: 0,
            gzip: true
        })(ctx, next);
    } else if (url.startsWith('/bootstrap.css')) {
        return serve(bootstrapPath, {
            maxAge: 0,
            gzip: true
        })(ctx, next);
    }

    debug(url + ' not static');

    await next();
};