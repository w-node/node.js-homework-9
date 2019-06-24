const debug = require('debug')('homework:deleteUser');
const db = require('../OwnMongoDbDriver');

module.exports = async ctx => {

    debug({_id: ctx.params.userId});
    db.deleteOne({_id: ctx.params.userId});

    ctx.redirect('/');
};