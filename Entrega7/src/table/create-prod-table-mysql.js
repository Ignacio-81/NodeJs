import database from "../db/index_mysql.js";

const createProdTable = async () => {
    try {
        await database.schema.dropTableIfExists("products");

        await database.schema.createTable("products", (prodTable) => {
            prodTable.increments("id").primary();
            prodTable.string("title", 25).notNullable();
            prodTable.integer("price").notNullable();
            prodTable.string("thumbnail").notNullable();
        });

        console.log("Products table created in SQL DB!");
        database.destroy();
    } catch (err) {
        console.log(err);

        database.destroy();
    }
};

createProdTable();
