const {Router} = require('express')
const ProductManager = require('../controllers/productsManager')
const {dirname} = require('path')


const router = Router()

const productsList = new ProductManager(`${dirname(__dirname)}/db/products.json`)

router.get('/', async (req, res) => {
    const limit = req.query.limit
    const products = await productsList.getProducts(limit)
    const objeto = {
        styled: "main.css",
        title: "Listado Productos",
        products
    }
    res.render('index', objeto)
})

router.get('/realTimeProducts', async (req, res) => {
    const limit = req.query.limit
    const products = await productsList.getProducts(limit)
    const data = {
        style: "styleProdRt.css",
        title: "Listado Productos",
        products
    }
    res.render('realTimeProducts', data)
})

module.exports = router