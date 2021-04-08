import Hero from "./Hero.js";
import MovieCard from "./MovieCard.js";

const CardGroup = ({title, data}) => {
	const resultsHTML = data && data.map((obj, i) => {
		return <MovieCard key={i} movie={obj}/>;
	});
  return (
    <>
      <Hero text={title}/>
      {data &&
        <div className="container">
          <div className="row">
            {resultsHTML}
          </div>
        </div>
      }
    </>
  )
}

export default CardGroup;