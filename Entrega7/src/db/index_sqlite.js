import knex from "knex";

const config = {
    client: "sqlite3",
    connection: { filename: "../ecommerce/proddb.sqlite" },
    useNullAsDefault: true,
};

const database = knex(config);

export default database;
