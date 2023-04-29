const {Router} = require('express')
const router = Router()

router.use('/student', require('./student'))
router.use('/auth', require('./auth'))
router.use('/interview', require('./interview'))
router.use('/report', require('./report'))


router.get('/unauthorized', (req, res) => {
    return res.status(401).json({
        message: 'User not found!'
    })
})

module.exports = router