import conf from './../appconf'

function verifyToken (req: any, res: any, next: () => any) {
  if (!req.session.user) {
    return res.status(403).send('You are not authorized to make this request')
  }
  return next()
}

module.exports = verifyToken
