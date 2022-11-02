const { OAuth2Client } = require('google-auth-library')
const {
  MAX_ACCESS_BOUNDARY_RULES_COUNT,
} = require('google-auth-library/build/src/auth/downscopedclient')
const jwt = require('jsonwebtoken')

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

async function auth(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const googleToken = token.length > 1000
    if (googleToken) {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      })
      const payload = ticket.getPayload()
      req.user = {
        id: payload.sub,
        name: payload.name,
        photoUrl: payload.picture,
      }
    } else {
      //verify our custon jwt token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
      const { id, name, photoUrl } = decodedToken
      req.user = { id, name, photoUrl }
    }
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({
      success: false,
      message: 'Something went wrong with your authorization',
    })
  }
}

module.exports = auth
