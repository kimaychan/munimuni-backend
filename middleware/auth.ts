import jwt from 'jsonwebtoken'
import conf from './../appconf'

function verifyToken (req: any, res: any, next: () => any) {
  const token = req.body.token || req.query.token || req.headers["x-access-token"]
  if (!token) {
    return res.status(403).send('You are not authorized to make this request')
  }
  try {
    const decoded = jwt.verify(token, conf.TOKEN_KEY)
    req.user = decoded
  } catch (e) {
    return res.send(401).send('Invalid Token')
  }
  return next()
}

module.exports = verifyToken
