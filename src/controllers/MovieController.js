const Movie = require("../model/Movie");

module.exports = {
  // Create
  async store(req, res) {
    const { name, description } = req.body;

    if (!name) {
      res.status(422).json({ error: "The name is necessary!" });
      return;
    }

    const dataCreate = {
      name,
      description,
    };

    try {
      await Movie.create(dataCreate);
      res.status(201).json({ message: "Movie added succesfully" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  //READ
  async index(req, res) {
    try {
      const movies = await Movie.find();
      res.status(200).json(movies);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  // Find by ID
  async detail(req, res) {
    const { _id } = req.params;

    try {
      const movies = await Movie.findOne({ _id });

      if (!movies) {
        res.status(422).json({ message: "Movie was not found!" });
        return;
      }

      res.status(200).json(movies);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  //Update
  async update(req, res) {
    const { _id } = req.params;
    const { name, description } = req.body;

    const dataCreate = {
      name,
      description,
    };

    try {
      const movies = await Movie.findOneAndUpdate({ _id }, dataCreate, {
        new: true,
      });

      if (!movies) {
        res.status(422).json({ message: "User was not found!" });
      }

      res.status(200).json(dataCreate);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  //Delete
  async delete(req, res) {
    const { _id } = req.params;

    try {
      const movies = await Movie.findByIdAndDelete({ _id });

      if (!movies) {
        res.status(422).json({ message: "Movie was not found!" });
        return;
      }

      res.status(200).json({ message: "Movie deleted Succesfully" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
};
