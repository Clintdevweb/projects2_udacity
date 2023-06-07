import Client from "../database"; 

export class Orders {
    async getOrderByUserId(user_id: string) {
        try {
            const connect = await Client.connect();
            const sql = `SELECT * FROM orders WHERE user_id=($1)`;
            const result = await connect.query(sql, [user_id])
            
        } catch (err) {
            throw new Error(`Can not get order product ${err}`)
        }
    }

}