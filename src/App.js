import React, { Component } from 'react';

import flatten from "lodash/flatten";
import uniq from "lodash/uniq";
import axios from "axios";

import MovieDetails from "./components/MovieDetails";
import MovieGenrePicker from "./components/MovieGenrePicker";
import Carousel from "./components/Carousel";
import Spinner from "./components/Spinner";


class App extends Component {
  state = {
    selectedMovieId: '',
    movies: [],
    genres: [],
    selectedGenre: '' // defaults to all genres
  };

  // sets the state when genre is selected
  genreSelectedHandler = genre => {

    // set the genre and unselect movie id, so we can default to
    // showing the first movie of the list
    this.setState({
      selectedGenre: genre,
      selectedMovieId: ''
    });
  };

  // sets the state when movie is selected
  movieSelectedHandler = movieId => {
    this.setState({ selectedMovieId: movieId });
  };

  // get unique list of genres from movies array
  getUniqueGenres(movies) {
    // extract genre string from movies, split them into arrays by comma and trim whitespace 
    const genreArrays = movies.map(movie => movie.Genre.split(',').map(genre => genre.trim()));
    // flatten the arrray of genre arrays then dedupe them
    const genres = uniq(flatten(genreArrays));
    // alphabetize the genres
    const genresSorted = genres.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });

    return genresSorted;
  }

  // filters movies by genre
  getMoviesByGenre(movies, genre) {
    // when no genre is selected, return all movies
    if (genre === '') {
      return movies.slice();
    }
    return movies.filter(movie => movie.Genre.includes(genre));
  }

  // gets the movie by movie Id
  getMovie(movieId) {
    return this.state.movies.find(movie => movie.Id === movieId);
  }

  componentDidMount() {
    axios.get("http://www.mocky.io/v2/5af935ab320000221d86afe6")
      .then(response => {
        const movies = response.data;
        const genres = this.getUniqueGenres(movies); // extract list of genres from movies downloaded

        this.setState({
          movies,
          genres
        });
      })
      // no real error handling
      .catch(error => {
        console.error(error);
      });
  }

  render() {

    // For this basic test, we return a spinner
    // More advanced implementation could be a fake movie ui placeholder for perceived speed boost
    if(this.state.movies.length === 0) {
      return <Spinner></Spinner>;
    }

    // filter movies based on genre
    const filteredMovies = this.getMoviesByGenre(this.state.movies, this.state.selectedGenre);

    // create list of items for carousel. the carousel doesn't have to know movie data schema
    const movieItems = filteredMovies.map(movie => {
      return {
        id: movie.Id,
        src: movie.Poster
      };
    });

    // if there's a movie selected, display that movie, else default to the first item in
    // the movie list
    const movieDetails = this.state.selectedMovieId
      ? this.getMovie(this.state.selectedMovieId)
      : filteredMovies[0];

    return <div className="App">
        <MovieDetails movie={movieDetails} />
        <MovieGenrePicker change={this.genreSelectedHandler} genres={this.state.genres} />

        {/* this is a bit hacky. key is to let the carousel know when to reset based on the parent. in this case, its when genre changes */}
        <Carousel refreshKey={this.state.selectedGenre} click={this.movieSelectedHandler} items={movieItems} />
      </div>;
  }
}

export default App;
