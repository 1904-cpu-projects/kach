const {User} = require('../db/index');

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.session.userId
      }
    })
    if (user.isAdmin) next()
    else throw 'Unauthorized User'
  } catch (err) {
    res.status(401).redirect('/#/signin')//TODO: learn how 302 status/redirecting should work 
  }
}

module.exports = isAdmin;