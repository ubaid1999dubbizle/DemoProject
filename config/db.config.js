module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'qwer1234',
    DB: 'node_complete',
    dialect: 'mysql', 
    pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
    }
    };