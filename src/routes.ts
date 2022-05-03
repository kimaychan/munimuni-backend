import express from 'express'
import AccountController from './controllers/accountController'
import NoteController from './controllers/noteController'

const router = express.Router()

router.post('/api/login', AccountController.login)

// account

router.post('/api/account', AccountController.create)

// notes

router.get('/api/notes', () => {})
router.post('/api/notes', NoteController.create)

export default router