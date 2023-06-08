import express from 'express';
import { Orders } from '../src/models/order';
import { ProductStore } from '../src/models/product';
import { usersShopping } from '../src/models/users';
import supertest from 'supertest';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const request = supertest(app)
const product = new ProductStore()
const user = new usersShopping()
const order = new Orders()

describe('Proct store', () => {
  it('should have an index method', () => {
    expect(product.index).toBeDefined();
  })

  it('Show list product', async() => {
    const result = await product.index()
    expect(result.length).toBeNaN();
  })
})

describe('User store', () => {
  it('should have an index method', () => {
    expect(user.index).toBeDefined()
  })

  it('should have an index method', () => {
    expect(user.index).toBeDefined()
  })

})

describe('Order store', () => {
  it('should have an index method', () => {
    expect(order.getOrderByUserId).toBeDefined()
  })
})

describe('test api', () => {
  it('Should be connect success', async () => {
    await request.get('/products').expect(200)
  })
})
