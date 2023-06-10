import Client from "../database";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();
const { TOKEN_SECRET } = process.env

export type User =  {
    id?: string,
    firstName?: string,
    lastName?: string,
    userName?: string,
    password?: string
}

export class usersShopping {
    generateAccessToken(user: User) {
        return jwt.sign({userName: user.userName, password: user.password}, TOKEN_SECRET as string)
    }

    async index(): Promise<User[]> {
        try {
            const connect = await Client.connect();
            console.log(connect);
            const sql = `SELECT * FROM users`;
            const result = await connect.query(sql);
            connect.release();
            return result.rows
        } catch (err) {
            throw new Error(`Can not get all user ${err}`)
        }
    }

    async show(id: string): Promise<User> {
        try {
            const connect = await Client.connect();
            const sql = `SELECT * FROM users WHERE id=($1)`;
            const result = await connect.query(sql, [id])
            connect.release();
            return result.rows[0]
        } catch (err) {
            throw new Error(`Can not show User ${err}`)
        }
    }

    async create(user: User): Promise<User> {
        try {
            const connect = await Client.connect();
            const sql = 'INSERT INTO user (id, firstName, lastName, password) VALUES ($1, $2, $3, $4)';
            const result = await connect.query(sql, [user.id, user.firstName, user.lastName, user.password])
            connect.release();
            return result.rows[0]

        } catch (err) {
            throw new Error(`Could not create product ${user} Error: ${err}`)
        }
    }
}