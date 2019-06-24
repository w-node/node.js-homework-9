const debug = require('debug')('homework:mongodb');
const config = require('config');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const util = require('util');

const url = util.format('mongodb://%s:%s', config.mongodb.host, config.mongodb.port);
const dbName = config.mongodb.db;
const collection = 'users';

const insertMany = async (data) => {
    const client = new MongoClient(url, {"useNewUrlParser": true});

    try {
        await client.connect();
        const db = await client.db(dbName);
        const r = await db.collection(collection).insertMany(data);
        console.log(r);
    } catch (e) {
        console.error('%s\n\n', e.message);
    }

    client.close();
};

const upsertOne = async (what, data) => {
    const client = new MongoClient(url, {"useNewUrlParser": true});

    try {
        await client.connect();
        const db = await client.db(dbName);
        const r = await db.collection(collection).updateOne(what, {$set: data}, {upsert: true});
        debug(r.toString());
    } catch (e) {
        console.error(e);
    }

    client.close();
};

const find = async (what) => {
    const client = new MongoClient(url, {"useNewUrlParser": true});

    let r;
    try {
        await client.connect();
        const db = await client.db(dbName);
        r = await db.collection(collection).find(what).sort({_id: 1}).toArray();
        debug(r);
    } catch (e) {
        console.error(e);
    }

    client.close();

    return r;
};

const deleteOne = async (what) => {
    const client = new MongoClient(url, {"useNewUrlParser": true});

    try {
        await client.connect();
        const db = await client.db(dbName);
        const r = await db.collection(collection).deleteOne(what);
        debug(r.toString());
    } catch (e) {
        console.error(e);
    }

    client.close();
};

const dropCollection = async () => {
    const client = new MongoClient(url, {"useNewUrlParser": true});

    try {
        await client.connect();
        const db = await client.db(dbName);
        const r = await db.collection(collection).drop();
        console.log(r);
    } catch (e) {
        console.error('Could not drop collection \'%s\' in DB \'%s\' (%s)', collection, config.mongodb.db, e.message);
    }

    client.close();
};

module.exports = {
    upsertOne,
    insertMany,
    find,
    deleteOne,
    dropCollection
};

