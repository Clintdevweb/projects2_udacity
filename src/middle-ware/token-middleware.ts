import { Request, Response, Application } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();
const { TOKEN_SECRET } = process.env

const authenticateToken = (req: Request, res: Response, next: any) => {
    try {
        const authenHeader = req.headers['authorization'];
        const token = authenHeader ? authenHeader.split(' ')[1] : '';
        
        if(!token) {
            return res.status(403).send("A token is required");
        }
        const decode = jwt.verify(token, TOKEN_SECRET as string)
        next()
    } catch (error) {
        res.status(401).send('Invalid token')
    }
}

export default authenticateToken