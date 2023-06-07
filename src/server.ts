import express, { Request, Response } from 'express';

import bodyParser from 'body-parser';
import orderRoutes from './handlers/order-routes';
import productRoutes from './handlers/product-routes';
import userRoutes from './handlers/users-routes';

const port = 3000;
const app: express.Application = express();
app.use(bodyParser.json());

// app.get('/', (req: Request, res: Response) => {
//     res.send('Project 2')
// })

// app.get('/users', (req: Request, res: Response) => {
//     // const result = await user.index()
//     console.log('user');
//     res.send('users')
// })

orderRoutes(app)
productRoutes(app)
userRoutes(app);

app.listen(port, () => {
    console.log(`App list port: ${port}`);
})