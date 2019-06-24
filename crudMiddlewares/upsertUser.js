const debug = require('debug')('homework:upsertUser');
const { deleteFile, accessFile } = require('../fileWork');
const db = require('../OwnMongoDbDriver');

module.exports = async ctx => {

    const userNewData = ctx.request.body;
    debug('new user data = ', userNewData);

    if (userNewData._id) {
        let user = (await db.find({_id: userNewData._id}))[0];

        if (user) {
            debug('existed user', user);

            // delete old photo
            if (userNewData['foto'] && userNewData['foto'] !== user['foto']) {
                debug('delete old foto', './data/' + user['foto']);
                accessFile('./data/' + user['foto'], (err) => {
                    if (!err) {
                        deleteFile('./data/' + user['foto']);
                    }
                });
            }
        } else {
            debug('inserted user ', userNewData);
        }

        db.upsertOne({_id: userNewData._id}, userNewData);

    } else {
        debug('do not save');
    }

    ctx.redirect('/');
};