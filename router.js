const Router = require('koa-router');
const router = new Router();
const upsertUser = require('./crudMiddlewares/upsertUser');
const deleteUser = require('./crudMiddlewares/deleteUser');
const editUser = require('./crudMiddlewares/editUser');
const readUsers = require('./crudMiddlewares/readUsers');

router
    .get('/', readUsers) // READ ALL USERS
    .post('/upsert', upsertUser) // CREATE / UPDATE user
    .get('/delete/:userId', deleteUser) // DELETE user
    .get('/edit/:userId', editUser); // READ user to edit

module.exports = router;
