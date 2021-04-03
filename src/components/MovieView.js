import Hero from './Hero.js';
import ProductionView from './ProductionView.js';
import SimilarView from './SimilarView.js';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import config from "../config.json";

const MovieView = () => {
	const { id } = useParams();
	const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
    window.scrollTo(0, 0)
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${config.apiKey}&language=en-US`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setMovieDetails(data);
        setIsLoading(false);
      });
	}, [id]);

  function renderMovieDetails() {
    if (isLoading) {
      return <Hero text="Loading..."/>
    }
    else if (movieDetails) {
      const posterURL = movieDetails.poster_path ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}` : 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2538&q=80';
      const backdropURL = movieDetails.backdrop_path ? `https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}` : '';
      const imdbURL = movieDetails.imdb_id ? `https://www.imdb.com/title/${movieDetails.imdb_id}` : '';
      const resultsHTML = movieDetails.production_companies.map((obj, i) => {
        return <ProductionView key={i} company={obj}/>;
      });
      return (
        <>
          <Hero text={movieDetails.original_title} backdrop={backdropURL} />
          <div className="container my-5">
            <div className="row">
              <div className="col-md-3">
                <img src={posterURL} alt={movieDetails.original_title} className="img-fluid shadow rounded"/>
                <h5>{movieDetails.tagline}</h5>
              </div>
              <div className="col-md-8">
                <h2>{movieDetails.original_title}</h2>
                <p className="lead">{movieDetails.overview}</p>
                <div className="row">
                  <div className="col-md-6">
                    <p>
                      <span className="fst-italic">Release Date:</span> <span className="fw-bold">{movieDetails.release_date}</span>
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      <span className="fst-italic">Runtime:</span> <span className="fw-bold">{movieDetails.runtime} minutes</span>
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <p>
                      <span className="fst-italic">Budget:</span> <span className="fw-bold">${movieDetails.budget}</span>
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      <span className="fst-italic">Revenue:</span> <span className="fw-bold">${movieDetails.revenue}</span>
                    </p>
                  </div>
                </div>

                {(movieDetails.homepage || movieDetails.imd_id) &&
                  <p>
                    {movieDetails.homepage &&
                      <a className="btn btn-primary mx-1" target="_blank" rel="noreferrer" href={movieDetails.homepage}>Official Site</a>
                    }
                    {movieDetails.imdb_id &&
                      <a className="btn btn-primary mx-1" target="_blank" rel="noreferrer" href={imdbURL}>IMDB</a>
                    }

                  </p>
                }
                {movieDetails.production_companies && resultsHTML &&
                  <>
                  <h3>Production Companies</h3>
                  <div className="container">
                    <div className="row">
                      {resultsHTML}
                    </div>
                  </div>
                  </>
                }
              </div>
            </div>
            { id &&
              <SimilarView id="id"/>
            }
          </div>
        </>
      );
    }
  }

  return renderMovieDetails();
};

export default MovieView;
