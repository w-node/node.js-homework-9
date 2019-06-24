const debug = require('debug')('homework:editUser');
const db = require('../OwnMongoDbDriver');

module.exports = async ctx => {
    const users = await db.find({});
    const user = (await db.find({_id: ctx.params.userId}))[0];
    debug('users:', users);
    debug('user:', user);

    ctx.render(__dirname + '/../tmpl/index.pug', {
        user: user,
        users: users
    });
};