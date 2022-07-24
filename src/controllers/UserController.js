const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  // Register
  async register(req, res) {
    const { username, email, password, confirmpassword } = req.body;

    if (!username) {
      return res.status(422).json({ message: "The Username is necessary!" });
    }

    if (!email) {
      return res.status(422).json({ message: "The E-mail is necessary!" });
    }

    if (!password) {
      return res.status(422).json({ message: "The Password is necessary!" });
    }

    if (password !== confirmpassword) {
      return res.status(422).json({ message: "The passwords do not match!" });
    }

    // check if user exists
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res
        .status(422)
        .json({ message: "Please try to use another E-mail!" });
    }

    // create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // create user
    const user = new User({
      username,
      email,
      password: passwordHash,
    });

    try {
      await user.save();
      res.status(201).json({ message: "User created succesfully!" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  // Login User
  async login(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(422).json({ message: "The E-mail is necessary!" });
    }

    if (!password) {
      return res.status(422).json({ message: "The Password is necessary!" });
    }

    // check if user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // check if the password match
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(422).json({ message: "Wrong password!" });
    }

    try {
      const secret = process.env.SECRET;
      const token = jwt.sign(
        {
          id: user.id,
        },
        secret
      );

      res.status(200).json({ message: "successful authentication!", token });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  // fav Movie
  async movie(req, res) {
    try {
      const user = await User.create(
        { _id },
        {
          movie: dataCreate,
        },
        { new: true }
      );
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
};
