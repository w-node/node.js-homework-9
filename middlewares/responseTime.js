const debug = require('debug')('homework:response-time');

module.exports = async (ctx, next) => {
    const start = Date.now();
    await next();
    const now = Date.now();
    debug(now - start);
    ctx.set('X-Response-Time', now - start);
};