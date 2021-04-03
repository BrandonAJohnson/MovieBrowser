import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const posterURL = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2538&q=80';
  const detailURL = `/movies/${movie.id}`;
  const badgeType = movie.vote_average ? movie.vote_average >= 8 ? 'bg-success' : movie.vote_average >= 7 ? 'bg-primary' : movie.vote_average >= 6 ? 'bg-warning' : 'bg-danger' : 'bg-secondary';
	return (
    <div className="col-lg-3 col-md-2 col-1 my-4">
      <div className="card shadow">
        <img src={posterURL} className="card-img-top" alt={movie.original_title}/>
        <div className="card-body">
          <h5 className="card-title">{movie.original_title}</h5>
          <p className="card-text"><span className={`badge ${badgeType}`}>{movie.vote_average}</span></p>
          <Link to={detailURL} className="btn btn-primary">Details</Link>
        </div>
      </div>
    </div>
	);
}

export default MovieCard;
