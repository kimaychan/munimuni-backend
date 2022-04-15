import { Note } from './../models/note'

interface NoteForm {
  title: string;
  id_account: string;
  content: string;
}

async function create (form: NoteForm) {
  const note = Note.build(form)
  await note.save()
  return note.id
}

export default { create }
