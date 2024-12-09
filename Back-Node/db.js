const { Pool } = require('pg');

const pool = new Pool({
    database: 'login',
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: '1508'
});

module.exports = pool;
