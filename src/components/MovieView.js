import Hero from './Hero.js';
import ProductionView from './ProductionView.js';
import SimilarView from './SimilarView.js';
import ReviewView from './ReviewView.js';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import config from "../config.json";

const MovieView = () => {
	const { id, media_type } = useParams();
	const [movieDetails, setMovieDetails] = useState({});
  const [movieReviews, setMovieReviews] = useState({});
  const [movieProviders, setMovieProviders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
    window.scrollTo(0, 0)
    fetch(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${config.apiKey}&language=en-US`)
      .then(response => response.json())
      .then(data => {
        setMovieDetails(data);
        setIsLoading(false);
      });
    fetch(`https://api.themoviedb.org/3/${media_type}/${id}/reviews?api_key=${config.apiKey}&language=en-US&page=1`)
    .then(response => response.json())
    .then(data => {
      setMovieReviews(data);
    });
    fetch(`https://api.themoviedb.org/3/${media_type}/${id}/watch/providers?api_key=${config.apiKey}`)
    .then(response => response.json())
    .then(data => {
      if (data?.results?.US?.flatrate) {
        data.results.US.flatrate.forEach((obj) => {
          obj.name = obj.provider_name;
        });
        setMovieProviders(data.results.US.flatrate);
      }
    });
	}, [id, media_type]);

  function renderMovieDetails() {
    if (isLoading) {
      return <Hero text="Loading..."/>
    }
    else if (movieDetails) {
      const posterURL = movieDetails.poster_path ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}` : 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2538&q=80';
      const backdropURL = movieDetails.backdrop_path ? `https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}` : '';
      const imdbURL = movieDetails.imdb_id ? `https://www.imdb.com/title/${movieDetails.imdb_id}` : '';
      const badgeType = movieDetails.vote_average ? movieDetails.vote_average >= 8 ? 'bg-success' : movieDetails.vote_average >= 7 ? 'bg-primary' : movieDetails.vote_average >= 6 ? 'bg-warning' : 'bg-danger' : 'bg-secondary';
      const productionType = media_type === "movie" ? "production_companies" : "networks";
      const productionHTML = movieDetails[productionType] && movieDetails[productionType].map((obj, i) => {
        return <ProductionView key={i} company={obj}/>;
      });
      const providerHTML = movieProviders && movieProviders.map((obj, i) => {
        return <ProductionView key={i} company={obj}/>;
      });
      return (
        <>
          <Hero text={movieDetails[media_type === "movie" ? "original_title" : "name"]} backdrop={backdropURL} />
          <div className="container my-5">
            <div className="row">
              <div className="col-md-3">
                <img src={posterURL} alt={movieDetails.original_title} className="img-fluid shadow rounded"/>
                <h5>{movieDetails.tagline}</h5>
                <span className={`p-2 badge ${badgeType}`}>{movieDetails.vote_average}</span>
                {movieDetails.genres &&
                  <ul className="my-3">
                    {
                      movieDetails.genres.map((genre, i) => {
                        return <li key={i}>{genre.name}</li>
                      })
                    }
                  </ul>
                }
              </div>
              <div className="col-md-8">
                <h2>{movieDetails.original_title}</h2>
                <p className="lead">{movieDetails.overview}</p>

                {media_type === "movie" &&
                  <>
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
                  </>
                }
                {media_type === "tv" &&
                  <>
                    <div className="row">
                      <div className="col-md-6">
                        <p>
                          <span className="fst-italic">First Aired Date:</span> <span className="fw-bold">{movieDetails.first_air_date}</span>
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p>
                          <span className="fst-italic">Episode Runtime:</span> <span className="fw-bold">{movieDetails.episode_run_time} minutes</span>
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <p>
                          <span className="fst-italic">Number of Seasons:</span> <span className="fw-bold">{movieDetails.number_of_seasons}</span>
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p>
                          <span className="fst-italic">Number of Episodes:</span> <span className="fw-bold">{movieDetails.number_of_episodes}</span>
                        </p>
                      </div>
                    </div>
                  </>
                }

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
                {movieDetails.production_companies && productionHTML &&
                  <>
                  <h3>Production Companies</h3>
                  <div className="container">
                    <div className="row">
                      {productionHTML}
                    </div>
                  </div>
                  </>
                }
                {movieProviders.length > 0 && providerHTML &&
                  <>
                  <h3>Watch Providers</h3>
                  <div className="container">
                    <div className="row">
                      {providerHTML}
                    </div>
                  </div>
                  </>
                }
              </div>
            </div>
            { movieReviews && movieReviews.results?.length > 0 &&
              <ReviewView reviews={movieReviews.results}/>
            }
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
