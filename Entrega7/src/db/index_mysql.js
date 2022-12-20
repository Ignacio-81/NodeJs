import knex from "knex";

const config = {
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: "28158598",
        database: "coderhouse",
    },
    pool: { min: 0, max: 7 },
};

const database = knex(config);

export default database;
