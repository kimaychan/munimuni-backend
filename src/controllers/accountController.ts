import { Account } from './../models/account'
import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'

async function isUsernameTaken (username: string): Promise<boolean> {
  try {
    const existingAccounts = await Account.findOne({ 'username': username })
    return existingAccounts !== null
  } catch (e) {
    throw e
  }
}

async function create (req: Request, res: Response, next: (e: any) => any) {
  try {
    const form = req.body
    const isTaken = await isUsernameTaken(form.username)
    if (isTaken) {
      res.status(409).send('Username already exists')
    } else {
      return bcrypt.genSalt(10, async (saltErr, salt) => {
        if (saltErr) {
          throw saltErr
        } else {
          return bcrypt.hash(form.password, salt, async (hashError, hash) => {
            if (hashError) {
              throw hashError
            } else {
              const account = Account.build({ ...form, password: hash })
              await account.save()
              res.status(201).send(account._id)
            }
          })
        }
      })
    }
  } catch (e) {
    return next(e)
  }
}

async function login (req: Request, res: Response, next: (e: any) => any) {
  try {
    const form = req.body
    const account = await Account.findOne({ 'username': form.username })
    if (account) {
      bcrypt.genSalt(10, async (saltErr, salt) => {
        if (saltErr) {
          throw saltErr
        } else {
          await bcrypt.compare(form.password, account.password, (_, isPasswordCorrect) => {
            if (isPasswordCorrect) {
              res.status(200).send('Ok')
            } else {
              res.status(403).send('wrong')
            }
          })
        }
      })
    } else {
      res.status(404).send('User not found')
    }
  } catch (e) {
    return next(e)
  }
}

export default { create, login }
