const debug = require('debug')('homework:readUser');
const db = require('../OwnMongoDbDriver');

module.exports = async ctx => {

    const users = await db.find({});
    debug(users);

    ctx.render(__dirname + '/../tmpl/index.pug', {
        users: users
    });
};