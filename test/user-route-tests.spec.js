const { app } = require('./main-get-tests.spec');
const expect = require('chai').expect

describe('/api/user routes', () => {
    describe('/user/:id GET URI', () => {
        it('should fetch a user', () => {
            app
            .get(`/api/user`)
        })
    })
})
