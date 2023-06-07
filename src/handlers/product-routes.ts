import express, { Request, Response } from "express";
import { Product, ProductStore } from "../models/product";

const store = new ProductStore();

const index = async (req: Request, res: Response) => {
    const products = await store.index()
    res.json(products)
}

const show = async (req: Request, res: Response) => {
    const product = await store.show(req.params.id)
    res.json(product)
}

const create = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
            catory: req.body.category
        }
        const productNew = await store.create(product);
        res.json(productNew)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const getFivePopularProduct = async (req :Request, res: Response) => {
    try {
        const fiveProductPopular = await store.getFivePopularProduct()
        res.json(fiveProductPopular)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const productRoutes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', create)
    app.get('/products-five-popular', getFivePopularProduct)
}

export default productRoutes