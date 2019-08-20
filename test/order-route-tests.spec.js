const app = require('./main-get-tests.spec');
const request = require('supertest');
const session = require('supertest-session');
const expect = require('chai').expect
const { db, Session, User, Order, OrderProduct, Product } = require('../server/db/index.js');

//beforeAll(async () => await db.sync());

describe('/api/orders routes', () => {
    describe('GET Orders', () => {
        xit('returns a list of all orders for the current user', async () => {
          const response = await request(app).get('/api/orders');
          expect(response.status).toEqual(200);
          expect(response.body.length).toBeGreaterThan(1);
        });
      });
})

//afterAll(() => db.close());