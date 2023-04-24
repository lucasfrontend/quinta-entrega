const multer = require('multer')
const { dirname } = require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, `${dirname(__dirname)}/public/uploads`)
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalName}`)
    }
})

const uploader = multer({
    storage,
    onError: function(err, next){
        console.log(err)
        next()
    }
})

module.exports = {
    uploader
}