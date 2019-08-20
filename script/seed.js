const {db, Product, User} = require('../server/db/index');
const users = require('./users');
const products = require('./products');

async function syncAndSeed() {
    try {
        await db.sync({force: true});
        await Promise.all([users.map(user => User.create(user)), products.map(product => Product.create(product))]);
    } catch (err) {
        console.log(err);
    }
}

if(require.main === module) syncAndSeed();

module.exports = syncAndSeed;