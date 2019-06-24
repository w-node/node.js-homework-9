const busboy = require('async-busboy');
const fs = require('fs');
const debug = require('debug')('homework:busboyParser');

module.exports = async (ctx, next) => {

    let contentType = ctx.get('content-type');

    if (!contentType.startsWith('multipart/form-data')) {
        return await next();
    }

    const { files, fields } = await busboy(ctx.req, {
        limits: {
            fields: 50,
            files: 3,
            fieldSize: '1mb',
            fileSize: 1000000 * 10 // 10MB
        }
    });

    if (!ctx.request.body) ctx.request.body = {};

    for (let k in fields) {
        ctx.request.body[k] = fields[k];
    }

    debug('busboyPARSER', fields);

    if (files && files.length) {
        for (let i = 0; i < files.length; i++) {
            files[i].filename && await(new Promise((resolve, reject) => {
                const id = fields['_id'];

                let filename = id + '_' + files[i].filename;
                let fieldname = files[i].fieldname;

                if (id) {
                    files[i].pipe(fs.createWriteStream('./data/' + filename));

                    files[i].on('end', () => {
                        ctx.request.body[fieldname] = filename;
                        resolve();
                    });
                } else {
                    ctx.throw(400, 'picture was not saved, because no user data');
                }
            }));
        }
    }

    await next();
};