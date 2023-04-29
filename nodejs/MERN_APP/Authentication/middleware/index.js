const jwt = require('jsonwebtoken')
const Student = require('../model/student')


exports.authMiddleware3 = async (req, res, next) => {

    console.log(req.body);
    const token = req.body.token
    const payload =  jwt.verify(token, 'mykey');
    console.log("payload",payload)
    const student =  await Student.findById(payload)
    if (student) {
        req.user = student
        next()
    }
    else {
        return res.status(401).json({
            message: "Unauthorized!",
        })
    }
    
}