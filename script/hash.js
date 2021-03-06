const crypto = require('crypto');
require('dotenv').config();

const secret = process.env.SECRET || 's3cret';

const hash = (password) => {
    return (crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex'))
}


module.exports = hash;