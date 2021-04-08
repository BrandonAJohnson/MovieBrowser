import Hero from "./Hero.js";
import TrendingView from "./TrendingView.js";
import { useEffect, useState } from 'react';
import config from "../config.json";

const HomeView = () => {
	const [trending, setTrending] = useState([]);
	const getTrending = () => {
		fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${config.apiKey}`)
      .then(response => response.json())
      .then(data => {
        setTrending(data.results);
      });

		setTrending([1]);
	};

	useEffect(() => {
    if (!trending || trending.length === 0) {
			getTrending();
    }
  },[trending]);


	return (
		<>
			<Hero text="Welcome to my Movie Browser"/>
			<div className="container">
				<div className="row">
					<div className="col-lg-8 offset-lg-2 my-5">
						<p className="lead">
							This project utilizes the <a target="_blank" rel="noreferrer" href="https://www.themoviedb.org/">TMDB</a> api. Please browse some movies. Thanks
						</p>
					</div>
				</div>
				{trending && trending.length > 0 &&
					<TrendingView trending={trending}/>
				}
			</div>
		</>
	)
}

export default HomeView;
