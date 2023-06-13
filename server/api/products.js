const router = require("express").Router();
const { models: { Product } } = require("../db");
module.exports = router

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