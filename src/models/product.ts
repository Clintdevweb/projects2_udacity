import Client from "../database";

export type Product = {
    id?: any;
    name: string;
    price: number;
    category?: any;
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const connect = await Client.connect();
            const sql = 'SELECT * FROM product';
            const result = await connect.query(sql);
            connect.release();
            return result.rows
        } catch (err) {
            throw new Error(`Can not get all product ${err}`)
        }
    }

    async show(id: string): Promise<Product> {
        try {
            const connect = await Client.connect();
            const sql = 'SELECT * FROM product WHERE id=($1)';
            const result = await connect.query(sql, [id]);
            console.log(result);
            console.log('result---', result);
            connect.release();
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find book ${id}. Error: ${err}`)
        }
    }

    async create(product: Product): Promise<Product> {
        try {
            const connect = await Client.connect();
            const sql = 'INSERT INTO product (name, price, category) VALUES ($1, $2, $3)';
            const result = await connect.query(sql, [product.name, product.price, product.category])
            connect.release();
            return result.rows[0]

        } catch (err) {
            throw new Error(`Could not create product ${product} Error: ${err}`)
        }
    }

    async getFivePopularProduct(): Promise<Product[]> {
        try {
            const connect = await Client.connect();
            const sql = 'SELECT * FROM order_products ORDER BY quantity DESC LIMIT 5';
            const result = await connect.query(sql)
            connect.release();
            return result.rows

        } catch (err) {
            throw new Error(`Could not get product Error: ${err}`)
        }
    }


}