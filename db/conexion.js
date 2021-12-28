const mariadb = requiere("mariadb");

const config = {
    host: localhost,
    user: nodeUser,
    password: nodeUser,
    database: nodeuser,
    connectionLimit: 10,
};

const pool = mariadb.createPool(config);

module.exports = pool;