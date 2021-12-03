module.exports = {
  requireAuth,
};

async function requireAuth(req, res, next) {
  if (!req.session) {
    res.status(401).end('Unauthorized');
    return;
  }
  next();
}
