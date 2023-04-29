const {Router} = require('express')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const { OAuth2Client } = require('google-auth-library')
var generator = require('generate-password');
const Student = require('../../model/student');
const sendMail = require('../../mailers/googleMailer');

const router = Router()


router.post('/',async  (req, res) => {

    try{

        const student = await Student.findOne({ roll: req.body.roll, name: req.body.name })

        if(student){

            res.cookie('id', student._id)
            return res.status(200).json({
                message: "Student added successfully!",
                data: student
            })
            
        }

        return res.status(401).json({
            message: "Unauthorized!",
        })

    }catch(error){

        return res.status(500).json({
            message: "Request failed!",
        })
    }

})

router.post('/jwt',  async (req, res) => {

    try{

        console.log(req.body)

        const student = await Student.findOne({email: req.body.email})
        if(student) {
            const token = jwt.sign(student.id, 'mykey')
            return res.status(200).json({token, message: "User authenticated successfully!" })
        }
        return res.status(401).json({ message: "User anot found!" })

    }catch(error) {

        console.log(error)
        return res.status(500).json({
            "message": "Server Error!",
        })

    }

} )


router.post("/google", async (req, res) => {

    try{

        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        const { token }  = req.body
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const { name, email, picture } = ticket.getPayload();    
    
        let student = await Student.findOne({email: email})
        if(student) {

            sendMail(student.email)
            const token = jwt.sign(student.id, 'mykey')
            return res.status(200).json({token, message: "User authenticated successfully!" })
        }
        
        // if user email doesn't exist
        const password = generator.generate({
            length: 10,
            numbers: true
        });

        student = await Student.create({
            name, email, password
        })
        sendMail(student.email)
        const jwtToken = jwt.sign(student.id, 'mykey')
        return res.status(200).json({token: jwtToken, message: "User authenticated successfully!" })

    }catch(error) {

        console.log(error)
        return res.status(500).json({
            message: "Server error"
        })

    }

    
})


module.exports = router