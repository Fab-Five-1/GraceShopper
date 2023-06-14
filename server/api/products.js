const router = require('express').Router()
const { models: { Product } } = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
    try {

        const products = await Product.findAll({
            // // explicitly select only the id and username fields - even though
            // // users' passwords are encrypted, it won't help if we just
            // // send everything to anyone who asks!
            attributes: ['name', 'description']
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
        const product = await Product.findByPk(productId, {
            attributes: ['name', 'description']
        });
        if (!product) {
            return res.status(404).send("Product not found")
        }
        return res.send(product)
    }
    catch (err) {
        console.log(err)
    }
});


