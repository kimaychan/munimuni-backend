import { Model, Document, Schema, model } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

interface IAccount {
  username: string;
  password: string;
}

interface AccountModelInterface extends Model<AccountDoc> {
  build (attr: IAccount): AccountDoc
}

interface AccountDoc extends Document {
  username: string;
  password: string;
}

const accountSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Number,
    required: true
  }
})

accountSchema.statics.build = (attr: IAccount) => {
  return new Account({
    _id: uuidv4(),
    createdAt: Date.now(),
    ...attr
  })
}

const Account = model<AccountDoc, AccountModelInterface>('Account', accountSchema)

export { Account }
