import { Schema, Model, Document, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid'

interface INote {
  title: string;
  id_account: string;
  content: string;
}

interface NoteModelInterface extends Model<NoteDoc> {
  build (attr: INote): NoteDoc
}

interface NoteDoc extends Document {
  title: string;
  id_account: string;
  content: string;
}

const noteSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  created_at: {
    type: Number,
    required: true
  },
  id_account: {
    type: String,
    required: true
  }
})

noteSchema.statics.build = (attr: INote) => {
  return new Note({
    _id: uuidv4(),
    created_at: Date.now(),
    ...attr
  })
}

const Note = model<NoteDoc, NoteModelInterface>('Notes', noteSchema)

export { Note }