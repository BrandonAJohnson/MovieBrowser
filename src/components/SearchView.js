import Hero from "./Hero.js";
import MovieCard from "./MovieCard.js";

const SearchView = ({ keyword, searchResults }) => {
	const title = searchResults && searchResults.length > 0 ? `Results: ${keyword}` : `Oops, we didn't find any results for: ${keyword}`;
	const resultsHTML = searchResults && searchResults.map((obj, i) => {
		return <MovieCard key={i} movie={obj}/>;
	});

	return (
		<>
			<Hero text={title}/>
			{resultsHTML &&
        <div className="container">
          <div className="row">
            {resultsHTML}
          </div>
        </div>
      }
		</>
	)
}

export default SearchView;
