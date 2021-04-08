import CardGroup from "./CardGroup.js";

const SearchView = ({ keyword, searchResults }) => {
	const title = searchResults && searchResults.length > 0 ? `Results: ${keyword}` : `Oops, we didn't find any results for: ${keyword}`;
	return searchResults && <CardGroup title={title} data={searchResults}/>
}

export default SearchView;
