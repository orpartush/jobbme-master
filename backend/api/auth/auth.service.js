const bcrypt = require('bcrypt');
const User = require('../../models/User');

module.exports = {
  signup,
  signin,
};

async function signup(userData) {
  try {
    const { email, password } = userData;
    const existUser = await User.findOne({ email });
    if (existUser) return 409;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      ...userData,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    delete savedUser.password;
    return savedUser;
  } catch (e) {
    console.trace(`Error while registering user(service)`, err);
  }
}

async function signin(email, password) {
  try {
    const user = await User.findOne({ email });
    if (!user) return null;

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return null;

    delete user._doc.passowrd;
    return user._doc;
  } catch (e) {
    console.trace(`Error while signing in`, e);
  }
}
