import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard.js";
import config from "../config.json";

const SimilarView = () => {
	const { id } = useParams();
	const [similarFilms, setSimilarFilms] = useState({});
	const [curPage, setCurrentPage] = useState(0);
	const [totPages, setTotalPages] = useState(0);

	useEffect(() => {
		fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${config.apiKey}&language=en-US&page=1`)
			.then(response => response.json())
			.then(data => {
				console.log('similar films', data);
				setSimilarFilms(data.results);
				setCurrentPage(data.page);
				setTotalPages(data.total_pages);
    });
	}, [id]);

	const showMore = () => {
		if (curPage < totPages) {
			let nextPage = curPage+1;
			fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${config.apiKey}&language=en-US&page=${nextPage}`)
			.then(response => response.json())
			.then(data => {
				console.log('more similar films', data);
				setSimilarFilms(similarFilms.concat(data.results).filter((item, index, self) =>
					index === self.findIndex((t) => (
						t.id === item.id
					))
				));
				setCurrentPage(nextPage);
    });
		}
	}

	return (
		<>
			{similarFilms && similarFilms.length > 0 &&
				<>
					<div className="position-relative my-5">
						<div className="mt-5">
							<h2>Similar Films</h2>
							<div className="row">
								{
									similarFilms.map((obj, i) => {
										return <MovieCard key={i} movie={obj}/>;
									})
								}
							</div>
						</div>
						{curPage < totPages &&
							<div className="position-relative my-3">``
								<div className="position-absolute top-50 start-50 translate-middle">
									<button onClick={showMore} id="showMoreButton" className="btn btn-success shadow">Show More</button>
								</div>
							</div>
						}
					</div>
				</>
      }
		</>
	)
}

export default SimilarView;
