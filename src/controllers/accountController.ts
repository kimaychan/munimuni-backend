import { Account } from './../models/account'

interface AccountForm {
  username: string;
  password: string;
}

async function create (form: AccountForm) {
  const account = Account.build(form)
  await account.save()
  return account.id
}

export default { create }
