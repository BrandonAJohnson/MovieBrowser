import { Link } from 'react-router-dom';
import MovieCard from './MovieCard.js';
import Hero from './Hero.js';

const TrendingView = ({ trending }) => {
	const resultsHTML = trending && trending.map((obj, i) => {
		return obj.original_title && <MovieCard key={i} movie={obj}/>;
	});
	return (
		<>
			<Hero text="Trending Now"/>
			{resultsHTML &&
				<div className="container">
					<div className="row">
						<div className="container">
							<div className="row">
								{resultsHTML}
							</div>
						</div>
					</div>
				</div>
			}
		</>
	);
}

export default TrendingView;
