const passport = require('../lib/passport');

module.exports = (req, res, next) => {
  // Bila request berasal dari user yang terautentikasi,
  // maka kita akan lanjut menjalankan handler berikutnya
  passport.authenticate(
    'jwt',
    {
      session: false,
    },
    (err, user, info) => {
      if (err || !user) {
        req.isAuthenticated = () => false;
      } else {
        req.isAuthenticated = () => true;
        req.user = user;
      }

      return next();
    }
  )(req, res, next);
};
