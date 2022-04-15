import express, { Request, Response} from 'express'
import AccountController from './controllers/accountController'
import NoteController from './controllers/noteController'

const router = express.Router()

router.get('/api/notes', (_: Request, res: Response) => {
  return res.send([])
})

router.post('/api/note', async (req: Request, res: Response, next) => {
  try {
    const data = req.body;
    const id = await NoteController.create(data)
    return res.status(201).send(id)
  } catch (e) {
    next(e)
  }
})

router.post('/api/account', async (req: Request, res: Response, next) => {
  try {
    const data = req.body;
    const id = await AccountController.create(data)
    return res.status(201).send(id)
  } catch (e) {
    return next(e)
  }
})

export default router