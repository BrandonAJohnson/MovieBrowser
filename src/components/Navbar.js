import { useHistory, Link } from 'react-router-dom';

//functional component
const Navbar = ({ searchText, setSearchText, setClickedSearch }) => {
  const history = useHistory();
  const updateSearchText = (e) => {
    // navigates to search anytime that the search bar is typed in
    history.push('/search');
    // sets search text for passed in property
    // this property then gets passed into the searchView
    setSearchText(e.target.value);
  }

  const clickedSearch = (e) => {
    // navigates when search button is clicked
    history.push('/search');
    setClickedSearch(true);
  }
  const clickedNavLink = (e) => {
    let elems = document.getElementsByClassName('nav-link');
    Array.from(elems).forEach((elem) => {
      elem.classList.remove('active');
    });
    if (e.target.id === "logolink") {
      document.getElementById("homelink").classList.add('active');
    }
    else {
      e.target.classList.add('active');
    }
  }
	return (
	  <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
      <div className="container-fluid">
          <Link id="logolink" className="navbar-brand" to="/" onClick={clickedNavLink}>Movie Browser</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
           <Link id="homelink" className="nav-link active" aria-current="page" to="/" onClick={clickedNavLink}>Home</Link>
          </li>
          <li className="nav-item">
           <Link className="nav-link" to="/about" onClick={clickedNavLink}>About Us</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/comingsoon" onClick={clickedNavLink}>Coming Soon</Link>
          </li>
        </ul>
        <form className="d-flex">
          <input
            id="searchbar"
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchText}
            onChange={updateSearchText}
          />
          <button className="btn btn-outline-primary" type="button" onClick={clickedSearch}>Search</button>
        </form>
        </div>
      </div>
	  </nav>
	)
}

export default Navbar;
