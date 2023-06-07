import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
let Client: Pool = new Pool({});

const {
    PROSTGRES_HOST,
    PROSTGRES_DB,
    PROSTGRES_DB_TEST,
    PROSTGRES_PASSWORD,
    PROSTGRES_USER,
    ENV
} = process.env

if (ENV === "test") {
    Client = new Pool({
        host: PROSTGRES_HOST,
        database: PROSTGRES_DB_TEST,
        user: PROSTGRES_USER,
        password: PROSTGRES_PASSWORD
    })
}

if(ENV == 'dev') {
    Client = new Pool({
        host: PROSTGRES_HOST,
        database: PROSTGRES_DB,
        user: PROSTGRES_USER,
        password: PROSTGRES_PASSWORD
    })
}

export default Client