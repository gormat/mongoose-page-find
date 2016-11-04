/**
 * Created by gor on 11/4/16.
 */

const async = require("async");

module.exports = exports = function pageFindPlugin (schema) {
    schema.statics.pageFind = function pagedFind (options, cb) {
        const thisSchema = this;

        options.filters = typeof options.filters !== 'undefined' ? options.filters : {};
        options.keys = typeof options.keys !== 'undefined' ? options.keys : '';
        options.limit = typeof options.limit !== 'undefined' ? options.limit : 50;
        options.page = typeof options.page !== 'undefined' ? options.page : 1;
        options.sort = typeof options.sort !== 'undefined' ? options.sort : {};

        const output = {
            data: null,
            pages: {
                current: options.page,
                total: 0
            },
            items: {
                begin: ((options.page - 1) * options.limit) + 1,
                end: options.page * options.limit,
                total: 0
            }
        };

        const count = callback => {
            thisSchema.count(options.filters, (err, count) => {
                output.items.total = count;
                callback(null);
            });
        };

        const get = callback => {
            let query = thisSchema.find(options.filters, options.keys);
            query.skip((options.page - 1) * options.limit);
            query.limit(options.limit);
            query.sort(options.sort);
            query.exec((err, results) => {
                if (err) {
                    return callback(err);
                }
                output.data = results;
                return callback(null);
            });
        };

        async.parallel(
            [
                count,
                get
            ],
            err => {
                if (err) {
                    cb(err, null);
                }

                output.pages.total = Math.ceil(output.items.total / options.limit);
                if (output.items.end > output.items.total) {
                    output.items.end = output.items.total;
                }

                cb(null, output);
            }
        );
    };
};
