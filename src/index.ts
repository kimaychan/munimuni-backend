import express from 'express'
import { json } from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose';
import routes from './routes'
import config from './../appconf'

const app = express()
app.use(cors({
  origin: config.ALLOWED_ORIGIN
}))
app.use(json())
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
