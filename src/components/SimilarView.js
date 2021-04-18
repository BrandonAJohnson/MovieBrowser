import { useParams } from 'react-router-dom';
import { React, useEffect, useState } from "react";
import MovieCard from "./MovieCard.js";
import config from "../config.json";

const SimilarView = () => {
	const { id, media_type } = useParams();
	const [similarFilms, setSimilarFilms] = useState({});
	const [curPage, setCurPage] = useState(1);
	const [totPages, setTotalPages] = useState(0);

	const showMore = () => {
		let nextPage = curPage+1;
		if (nextPage <= totPages) {
			fetch(`https://api.themoviedb.org/3/${media_type}/${id}/similar?api_key=${config.apiKey}&language=en-US&page=${nextPage}`)
				.then(response => response.json())
				.then(data => {
					if (data.results) {
						setSimilarFilms(similarFilms.concat(data.results).filter((item, index, self) =>
							index === self.findIndex((t) => (t.id === item.id))
						));
					}
			});
		}
	}

	useEffect(() => {
		fetch(`https://api.themoviedb.org/3/${media_type}/${id}/similar?api_key=${config.apiKey}&language=en-US&page=1`)
			.then(response => response.json())
			.then(data => {
				setSimilarFilms(data.results);
				setTotalPages(data.total_pages);
				setCurPage(1);
    });
	}, [id, media_type]);


	return (
		<>
			{similarFilms && similarFilms.length > 0 &&
				<>
					<div className="position-relative my-5">
						<div className="mt-5">
							<h2>Similar {media_type === "movie" ? "Films" : "Shows"}</h2>
							<div className="row">
								{
									similarFilms.map((obj, i) => {
										obj.media_type = media_type;
										return <MovieCard key={i} movie={obj}/>;
									})
								}
							</div>
						</div>
						{curPage < totPages &&
							<div className="position-relative my-3">``
								<div className="position-absolute top-50 start-50 translate-middle">
									<button onClick={() => {setCurPage(curPage+1);showMore();}} id="showMoreButton" className="btn btn-success shadow">Show More</button>
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
