import express from 'express'
import AccountController from './controllers/accountController'
import NoteController from './controllers/noteController'

const auth = require('./../middleware/auth')
const router = express.Router()

router.post('/api/register', AccountController.create)
router.post('/api/login', AccountController.login)
router.post('/api/logout', AccountController.logout)

// account

router.get('/api/account/me', auth, AccountController.getMyAccount)

// notes

router.get('/api/notes', () => {})
router.post('/api/notes', auth, NoteController.create)

export default router