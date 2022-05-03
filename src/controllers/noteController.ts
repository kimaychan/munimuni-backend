import { Note } from './../models/note'
import { Request, Response } from 'express'

async function create (req: Request, res: Response, next: (e: any) => any) {
  try {
    const form = req.body
    const note = Note.build(form)
    await note.save()
    return res.status(201).send(note.id)
  } catch (e) {
    next(e)
  }
}

export default { create }
