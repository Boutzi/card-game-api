function isLogged(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

module.exports = isLogged;
