import Hero from "./Hero.js";

const HomeView = () => {
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
			</div>
		</>
	)
}

export default HomeView;
