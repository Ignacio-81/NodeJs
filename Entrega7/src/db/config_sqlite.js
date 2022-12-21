//import knex from "knex";
import path, { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const config = {
    client: 'sqlite3',
    connection: { filename: path.resolve(__dirname, "../ecommerce/chatdb.sqlite") },
    //connection: { filename: __dirname + '/ecommerce/chatdb.sqlite' },
    useNullAsDefault: true
};

//const database = knex(config);

export default config;
