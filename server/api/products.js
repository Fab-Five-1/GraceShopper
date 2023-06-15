const router = require("express").Router();
const User = require("../db/models/User");
const {
    models: { Product },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (err) {
        console.log(err);
    }
});

router.get("/:productId", async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.send(product);
    } catch (err) {
        console.log(err);
    }
});
