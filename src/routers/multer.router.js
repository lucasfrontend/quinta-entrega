const { uploader } = require('../utils/multer')
const {Router} = require('express')

const router = Router()

router.post('/api/products', uploader.single('thumbnail'), (req, res)=>{
  res.status(200).send({
      status: 'success',
      message: 'Subido correctamente'
  })
})

module.exports = router