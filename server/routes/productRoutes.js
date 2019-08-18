const router = require('express').Router();
const {User, Product} = require('../db/index');
const isAdmin = require('./customMiddle');

router.route('/')
    .get(async (req, res, next) => {
        try {
            res.send(await Product.findAll());
        } catch (err){
            next(err);
        }
    })
    .post(isAdmin, async (req, res, next) => {
        try {
            res.send(await Product.create(req.body));
        } catch (err){
            next(err);
        }
    });

router.route('/:productId')
    .get(async (req, res, next) => {
        try {
            res.send(await Product.findOne({
                where: {
                    id: req.params.productId
                }
            }))
        } catch (err) {
            next(err);
        }
    })
    .delete(isAdmin, async (req, res, next) => {
        try {
            res.send(await Product.destroy({
                where: {
                    id: req.params.productId
                },
                returning: true
            })[1])
        } catch (err) {
            next(err);
        }
    })
    .put(async (req, res, next) => {
        try {
            const productId = req.params.productId;
            const userId = req.session.userId;
            const {productUpdates} = req.body;

            const user = await User.findByPk(userId);
            const product = await Product.findByPk(productId);
            
            if(user.isAdmin) {
                const updatedProduct = await product.update({...productUpdates});
                res.send(updatedProduct);
            } else {
                res.status(401).redirect('/')
            }
        } catch (err){
            next(err);
        }
    });

module.exports = router;
