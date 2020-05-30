const initOptions = {
    promiseLib: require('bluebird')
};

const pgp = require('pg-promise')(initOptions);

// Database connection details;
const cn = {
    host: 'localhost',
    port: '5432',
    database: 'postgres',
    schema: 'public',
    user: 'postgres',
    password: 'admin',
};
const db = pgp(cn); // database instance;

const query = async (sql, values, cb) => {
    try {
        const data = await db.any(sql)
        return data
    } catch (e) {
        console.log('ERROR:', e);
    } finally {
        db.$pool.end()
    }
}

module.exports = db