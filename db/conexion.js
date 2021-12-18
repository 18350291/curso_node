const mariadb = requiere("mariadb");

const config = {
    host: localhost,
    user: nodeUser,
    password: nodeUser,
    database: nodeUser,
    connectionLimit: 10,
};

const pool = mariadb.createPool(config);

module.exports = pool;