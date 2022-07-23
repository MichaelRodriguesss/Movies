const { getMovies, getMovie, searchMovies } = require("../services/MoviesDB");

const MoviesController = {
  all: async (req, res) => {
    const movies = await getMovies();
    res.json(movies?.data);
  },
  show: async (req, res) => {
    const movie = await getMovie(req.params.id);
    res.json(movie?.data);
  },
  search: async (req, res) => {
    const movies = await searchMovies(req.query.q);
    res.json(movies?.data);
  },
};

module.exports = MoviesController;
