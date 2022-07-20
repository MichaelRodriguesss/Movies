const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  // Register
  async register(req, res) {
    const { username, email, password, confirmpassword } = req.body;

    if (!username) {
      res.status(422).json({ message: "The Username is necessary!" });
      return;
    }

    if (!email) {
      res.status(422).json({ message: "The E-mail is necessary!" });
      return;
    }

    if (!password) {
      res.status(422).json({ message: "The Password is necessary!" });
      return;
    }

    if (password !== confirmpassword) {
      res.status(422).json({ message: "The passwords do not match!" });
      return;
    }

    // check if user exists
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      res.status(422).json({ message: "Please try to use another E-mail!" });
      return;
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
      res.status(422).json({ message: "The E-mail is necessary!" });
      return;
    }

    if (!password) {
      res.status(422).json({ message: "The Password is necessary!" });
      return;
    }

    // check if user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).json({ message: "User not found!" });
      return;
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
};
