const expect = require('chai').expect;
const request = require('supertest');
const myApp = require('../server/routes/index');
const app = request(myApp);

describe('Server', () => {
    describe('Main GET Route', () => {
        it('checks to see if the user already exists', () => {
            app
            .get('/api')
            .expect(200)
        })
    })
})

module.exports = app
