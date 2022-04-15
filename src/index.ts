import express from 'express'
import { json } from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose';
import Routes from './routes'

const app = express()
app.use(json())
app.use(cors({
  origin: 'http://localhost:3000'
}))
app.use(Routes)

app.get('/', (_, res) => {
  res.send('hello world')
})

mongoose.connect('mongodb://localhost:27017/munimunidb', {}, () => {
  console.log('connected to the database')
})

app.listen(9000, () => {
  console.log('server is listening to port 9000')
})
