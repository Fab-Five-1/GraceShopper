const router = require('express').Router()
const { models: { Product } } = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const  products = await Product.findAll({
            // // explicitly select only the id and username fields - even though
            // // users' passwords are encrypted, it won't help if we just
            // // send everything to anyone who asks!
            // attributes: ['id', 'username']
        })
        res.json(products)
        // res.send("hi!")
    } catch (err) {
        console.log(err)
    }
})


router.get("/:productId", async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).send("Product not found")
        }
    }
    catch (err) {
        next(err)
    }
});