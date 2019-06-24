const pug  = require('pug');
const path = require('path');
const debug = require('debug')('homework:templates');

module.exports = async (ctx, next) => {
    debug('');

    ctx.render = function (pathToFile, locals) {

        return ctx.body = pug.renderFile(path.normalize(pathToFile), locals);
    };

    await next();
};

