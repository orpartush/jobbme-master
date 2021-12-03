const { signup, signin } = require('./auth.service');

module.exports = {
  register,
  login,
  logout,
};

async function register(req, res) {
  try {
    const newUser = await signup(req.body);
    if (newUser === 409) {
      res.status(409).json({
        message: 'Email exists',
      });
      return;
    }
    req.session.user = newUser._id;
    res.json(newUser);
  } catch (e) {
    console.trace(`Error while registering user(controller)`, err);
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await signin(email, password);
    if (!user) {
      return res.status(401).json({
        message: 'Auth failed',
      });
    }
    req.session.user = user._id;
    res.json(user);
  } catch (err) {
    console.error(`Error while logging in`, err);
  }
}

async function logout(req, res) {
  try {
    req.session.destroy();
    res.status(200).json({ message: 'logged out successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
