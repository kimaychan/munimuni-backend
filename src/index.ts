import express from 'express'
import { json } from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import session from 'express-session'
import routes from './routes'
import config from './../appconf'

const app = express()
app.use(cors({
  origin: config.ALLOWED_ORIGIN
}))
app.use(json())
let sess = {
  secret: config.NOT_SO_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 7200
  }
}

if (config.NODE_ENV === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.get('/', (_, res) => {
  res.send('hello world')
})

mongoose.connect(config.MONGO_URI, {}, () => {
  console.log('connected to the database')
})

app.listen(config.PORT, () => {
  console.log('server is listening to port 9000')
})
