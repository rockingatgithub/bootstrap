const {Router} = require('express')
const Student = require('../../model/student')
const passportJWT = require('../../config/passportJWT')
const { authMiddleware3 } = require('../../middleware')
const router = Router()

router.get('/all', passportJWT.authenticate('jwt', { failureRedirect: '/unauthorized', session: false })  , async (req, res) => {

    try{

        const students = await Student.find()
        // console.log(req.user)
        return res.status(200).json({
            message: "Student fetched successfully!",
            data: students
        })

    }catch(error){

        return res.status(500).json({
            message: "Student fetch failed!",
        })
    }
    
})


router.post('/', async  (req, res) => {

    try{

        const student = await Student.create(req.body)

        return res.status(200).json({
            message: "Student added successfully!",
            data: student
        })

    }catch(error){

        return res.status(500).json({
            message: "Student adding failed!",
        })
    }

})

router.get('/', passportJWT.authenticate('jwt', { failureRedirect: '/unauthorized', session: false }), (req, res) => {

    console.log(req.user)
    return res.status(200).json({
        student: req.user
    })


})

module.exports = router