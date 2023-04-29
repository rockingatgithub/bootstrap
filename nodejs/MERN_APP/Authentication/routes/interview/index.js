const {Router} = require('express')
const Interview = require('../../model/interview')
const Student = require('../../model/student')
const passportJWT = require('../../config/passportJWT')
const router = Router()

router.post('/', async (req, res) => {

    const interview = await Interview.create(req.body)
    return res.status(200).json({
        "message": "Interview successfully created!",
        data: interview
    })

})

router.get('/assign/:interview/:student', async (req, res) => {

    const interview = await Interview.findById(req.params.interview)
    const student = await Student.findById(req.params.student)

    interview.candidates.push(student._id)
    student.interviews.push(interview._id)

    await interview.save()
    await student.save()

    const studentData = await student.populate('interviews')

    return res.status(200).json({
        message: "The interview added successfully!",
        data: studentData
    })
})

router.get('/', passportJWT.authenticate('jwt', { session: false, failureRedirect: '/login' }) ,async (req, res) => {

    const interview = await Interview.find({})
    return res.status(200).json({
        "message": "Interviews fetched!",
        data: interview
    })
})

module.exports = router
