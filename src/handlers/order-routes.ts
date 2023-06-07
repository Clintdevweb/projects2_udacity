import express, { Request, Response } from "express";
import { Orders } from "../models/order";
import authenticateToken from "../middle-ware/token-middleware";

const order = new Orders();

const getOrderByUserId = async (req: Request, res: Response) =>{
    const orders = await order.getOrderByUserId(req.body.userId)
    res.json(orders)
}


const orderRoutes = (app: express.Application) => {
    app.get('/order-product/:userid', authenticateToken, getOrderByUserId)
}

export default orderRoutes