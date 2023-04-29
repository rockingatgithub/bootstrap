const express = require('express')
const cookieParser = require('cookie-parser')
const db = require('./config/mongoose')
const Student = require('./model/student')
const jwt = require('jsonwebtoken')
const cors = require('cors')

// const passport = require('./config/passportLocalStrategy')
const passportJWT = require('./config/passportJWT')
const PORT = 8000
const app = express()

app.use(cors())
app.use(express.urlencoded())
app.use(express.json())
app.use(cookieParser())
// app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(passportJWT.initialize());
// app.use(passport.session());

app.use('/', require('./routes'))


















// const authMiddleware = async (req, res, next) => {
//     // console.log("runs before request reaches controller!", req.cookies['id'])
//     const id = req.cookies['id']
//     const student = await Student.findById(id)
//     if(student) {
//         req.user = student
//         next()
//     } else {
//         return res.status(401).json({
//             message: "Unauthorized!",
//         })
//     }
// }


// const authMiddleware2 = (req, res, next) => {
//     console.log(req.user, req.cookies)
//     console.log(req.session)

//     if(req.isAuthenticated()) { next()  }
//     return res.status(401).json({
//         message: "Unauthorized!",
//     })
// }



// app.post('/login', 
//   passport.authenticate('local', { failureRedirect: '/login', session: false }),
//   function(req, res) {
//       console.log(req.user)
//     return res.status(200).json({
//         data: req.user,
//         message: "Request authenticated"
//     });
//   });






app.listen(PORT, () => {
    console.log("Server successfully started!")
})