const mariadb = requiere("mariadb");

const config = {
    host: localhost,
    user: nodeUser,
    password: nodeUser,
    database: nodeuser,
    connectionLimit: 10,
};

console.log(config);

const pool = mariadb.createPool(config);

module.exports = pool;