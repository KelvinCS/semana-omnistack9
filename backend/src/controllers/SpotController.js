const Spot = require("../models/Spot");
const User = require("../models/User");

const { trim, map, split } = require("ramda");

module.exports = {
  async index(req, res) {
    const { tech } = req.query;

    const spots = await Spot.find({ techs: tech });

    res.json(spots);
  },

  async store(req, res) {
    const { filename } = req.file;
    const { company, price, techs } = req.body;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);

    if (!user) {
      return req.status(400).json({ error: "User does not exists" });
    }

    const spot = await Spot.create({
      user: user_id,
      thumbnail: filename,
      company,
      price,
      techs: map(trim, split(",", techs))
    });

    return res.json(spot);
  }
};
