const users = require('./data/users');
const db = require('./OwnMongoDbDriver');
const config = require('config');

(async () => {
    console.log(
        '\033[1;35m', 'POSTINSTALL \'initDb.js\' prepares data db with config:', '\033[0m',
        Object.assign(config.mongodb, {collection: 'users'})
    );

    await db.dropCollection();
    await db.insertMany(users);
})();

