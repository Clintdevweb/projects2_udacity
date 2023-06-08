import { Request, Response, Application } from 'express'
import { User, usersShopping } from '../models/users'
import authenticateToken from '../middle-ware/token-middleware'

const users = new usersShopping()

const index = async (req: Request, res: Response) => {
  try {
  const user = await users.index()
  console.log(user);
  res.status(200).json(user)
    
  } catch (err) {
    res.status(400)
    res.json(err)
  }

}

const show = async (req: Request, res: Response) => {
  try {
    const user = await users.show(req.params.id)
    res.status(200).json(user)
    
  } catch (err) {
    res.status(400)
    res.json(err)
  }

}

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      id: req.body.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
    }
    const userNew = await users.create(user)
    res.status(200).json(userNew)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const userRoutes = (app: Application) => {
  app.get('/users', index)
  app.get('/users/:id', show)
  app.post('/users', authenticateToken, create)
}

export default userRoutes
