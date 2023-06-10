import express from 'express';
import { Orders } from '../src/models/order';
import { ProductStore } from '../src/models/product';
import { usersShopping } from '../src/models/users';
import supertest from 'supertest';
import { v4 as uuidv4 } from 'uuid';

const app: express.Application = express();
const request = supertest(app)
const product = new ProductStore()
const user = new usersShopping()
const order = new Orders()

describe('Proct store', () => {
  it('should have an index method', () => {
    expect(product.index).toBeDefined();
  })

  it('should have an show method', () => {
    expect(product.show).toBeDefined();
  })

  it('should have an create method', () => {
    expect(product.create).toBeDefined();
  })

  it('fetch all products', async () => {
    const item = {
        id: uuidv4(),
        name: "Legion Laptop",
        price: 800,
        category: "Laptop"
    }
    await product.create(item)
    const products = await product.index()

    expect(products.length).toBeGreaterThan(0);
  });


  it('Show list product', async() => {
    const result = await product.index()
    expect(result.length).not.toBeNaN();
  })

  it('Show specify product', async() => {
    const result = await product.show('1')
    console.log(result)
    expect(result).toEqual({
      'id': 1,
      'name': 'iphone',
      'price': 100,
      'category': null
    });
  })

  it('Should be connect api success route', () => {
    request.get('/products').expect(200)
  })

  it('get all product by for api success route', () => {
    request
      .get('/products/1')
      .expect(200)
  })

  it('get a product by for api success route', () => {
    request
      .get('/products/1')
      .send({
        id: '1'
      })
      .expect(200)
  })

  it('Create a product for api success', () => {
    const tokenRequest: any = user.generateAccessToken({
      userName: 'hanh',
      password: 'hanh123',
    })
    request
      .post('/products/create')
      .set('Authorization', `bearer ${tokenRequest.token}`)
      .send({
        name: 'iphone',
        price: 1000,
        category: 'new'
      })
      .expect(200)
  })

  it('get five products popular', async() => {
     const result = await product.getFivePopularProduct()
     expect(result.length).not.toBeNaN();
  })

})

describe('User store', () => {
  it('should have an index method', () => {
    expect(user.index).toBeDefined()
  })

  it('should have an index method', () => {
    expect(user.index).toBeDefined()
  })

  it('Create user success for call api - route', () => {
    const tokenRequest: any = user.generateAccessToken({
      userName: 'hanh',
      password: 'hanh123',
    })
    request
      .post('/users/sign-in')
      .set('Authorization', `bearer ${tokenRequest.token}`)
      .send({
        id: '1',
        firstName: 'ngo',
        lastName: 'hanh',
        userName: 'hanh123',
        password: 'hanh123',
      })
      .expect(200)
  })

})

describe('Order store', () => {
  it('should have an index method', () => {
    expect(order.getOrderByUserId).toBeDefined()
  })

  it('get order success ', async() => {
      const result = await order.getOrderByUserId('1')
      expect(result.length).not.toBeNaN()
  })

  it('Create oder success - route', () => {
    const tokenRequest: any = user.generateAccessToken({
      userName: 'hanh',
      password: 'hanh123',
    })
    request
      .get('/order-product/:userid')
      .set('Authorization', `bearer ${tokenRequest.token}`)
      .send({
        id: '1',
      })
      .expect(200)
  })
})

