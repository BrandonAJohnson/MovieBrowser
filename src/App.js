import './App.css';
import Navbar from './components/Navbar.js';
import HomeView from './components/HomeView.js';
import AboutView from './components/AboutView.js';
import { Switch, Route } from 'react-router-dom';
import SearchView from './components/SearchView.js';
import MovieView from './components/MovieView.js';
import MissingPage from './components/MissingPage.js';
import { useState, useEffect } from 'react';
import config from "./config.json";

function App() {
  // first var in state is the variable, second is the function to access that state
  // useState is a hook to define this
  // basically a setter and a private property
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [clickedSearch, setClickedSearch] = useState(false);

  // takes a function that runs whenever the searchText is updated
  useEffect(() => {
    if (searchText) {
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=${config.apiKey}&language=en-US&query=${searchText}&page=1&include_adult=false`)
      .then(response => response.json())
      .then(data => {
        setSearchResults(data.results);
      });
      setClickedSearch(false);
    }
  },[searchText, clickedSearch]);

  return (
    <div>
      {/* set searchText in navbar and have it passed through to searchview
        using the setSearchResults functions as a property of NavBar
      */}
      <Navbar searchText={searchText} setSearchText={setSearchText} setClickedSearch={setClickedSearch}/>
      <Switch>
        <Route path="/" exact>
          <HomeView />
        </Route>
        <Route path="/about" component={AboutView}/>
        <Route path="/search" exact>
          <SearchView keyword={searchText} searchResults={searchResults} />
        </Route>
        <Route path="/movies/:id" component={MovieView}/>
        <Route path="/missing-page" component={MissingPage}/>
      </Switch>
    </div>
  );
}

export default App;
