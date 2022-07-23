const axios = require("axios").default;

const getMovies = async () => {
  const options = {
    method: "GET",
    url: "https://streamlinewatch-streaming-guide.p.rapidapi.com/movies",
    params: {
      region: "US",
      sort: "popularity",
      sources: "netflix,hulu",
      offset: "0",
      limit: "5",
    },
    headers: {
      "X-RapidAPI-Key": "bf20b440d9msh9b898a1a35f2380p15c2acjsnb088435b4acb",
      "X-RapidAPI-Host": "streamlinewatch-streaming-guide.p.rapidapi.com",
    },
  };
  return await axios.request(options);
};

const getMovie = async (id) => {
  const options = {
    method: "GET",
    url: "https://streamlinewatch-streaming-guide.p.rapidapi.com/movies/" + id,
    params: { platform: "ios", region: "US" },
    headers: {
      "X-RapidAPI-Key": "bf20b440d9msh9b898a1a35f2380p15c2acjsnb088435b4acb",
      "X-RapidAPI-Host": "streamlinewatch-streaming-guide.p.rapidapi.com",
    },
  };
  try {
    return await axios.request(options);
  } catch (err) {
    console.log(err);
  }
};

const searchMovies = async (query) => {
  const options = {
    method: "GET",
    url: "https://streamlinewatch-streaming-guide.p.rapidapi.com/search",
    params: { type: "movie", query: query, limit: "20" },
    headers: {
      "X-RapidAPI-Key": "bf20b440d9msh9b898a1a35f2380p15c2acjsnb088435b4acb",
      "X-RapidAPI-Host": "streamlinewatch-streaming-guide.p.rapidapi.com",
    },
  };

  return await axios.request(options);
};

module.exports = {
  getMovies,
  getMovie,
  searchMovies,
};
