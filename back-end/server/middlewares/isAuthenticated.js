module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.json({ message: 'Silahkan login terlebih dahulu' });
};
