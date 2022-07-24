const Movie = require("../model/Movie");
const Users = require("../model/User");

module.exports = {
  // Create
  async store(req, res) {
    const { title, thumb, rating } = req.body;

    if (!title) {
      return res.status(422).json({ error: "The Title is necessary!" });
    }

    const dataCreate = {
      title,
      thumb,
      rating,
      user_id: req.session._id,
    };

    try {
      const movie = await Movie.create(dataCreate);
      await Users.findOneAndUpdate(
        {
          _id: req.session._id,
        },
        {
          $addToSet: {
            movies: {
              _id: movie._id,
              title,
              thumb,
              rating,
            },
          },
        }
      );
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
    const { title, thumb, rating } = req.body;

    const dataCreate = {
      title,
      thumb,
      rating,
    };

    try {
      const movies = await Movie.findOneAndUpdate({ _id }, dataCreate, {
        new: true,
      });
      if (!movies) {
        return res.status(422).json({ message: "Movie was not found!" });
      }
      const user = await Users.findById(req.session._id, "-password");
      const newMovies = user.movies.map((movie) => {
        if (movie._id.toString() == movies._id.toString()) {
          movie.title = title;
          movie.thumb = thumb;
          movie.rating = rating;
        }
        return movie;
      });
      await Users.updateOne(
        { _id: req.session._id },
        {
          $set: {
            movies: newMovies,
          },
        }
      );

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
        return res.status(422).json({ message: "Movie was not found!" });
      }
      const user = await Users.findById(req.session._id);
      const newMovies = user.movies.filter(
        (movie) => movie._id.toString() !== movies._id.toString()
      );
      await Users.updateOne(
        { _id: req.session._id },
        {
          $set: {
            movies: newMovies,
          },
        }
      );

      res.status(200).json({ message: "Movie deleted Succesfully" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
};
