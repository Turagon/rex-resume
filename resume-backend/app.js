if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = require('express')()
const session = require('express-session')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const port = process.env.PORT

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  next()
})
app.use(session({secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false}))

app.listen(port, () => {
  console.log('Server on')
})