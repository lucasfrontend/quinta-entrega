const {Router}  = require ('express')
const products = require ('../routers/products.router.js')
const carts = require ('./cart.router')
const users =  require('./users.router.js')
const imgMulter = require('./multer.router.js')

const router = Router()

router.use("/products", products)
router.use("/carts", carts)
router.use("/", imgMulter)
router.use("/users", users)

module.exports = router