const User = require("../models/User");
const { isNil, ifElse, identity, pipeP } = require("ramda");

async function createUserSafe(user) {
  const findUser = user => User.findOne(user);
  const createUser = () => User.create(user);

  return pipeP(
    findUser,
    ifElse(isNil, createUser, identity)
  )(user);
}

module.exports = {
  async store(req, res) {
    const { email } = req.body;

    const user = await createUserSafe({ email });

    return res.json(user);
  }
};
