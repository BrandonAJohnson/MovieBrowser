import Hero from "./Hero.js";

const AboutView = () => {
  return (
    <>
      <Hero text="About Us" />
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 my-5">
            <p className="lead">
              This project originated from a Udemy course I was taking. It had the basic functionality of pulling from the API and displaying movies based on search.
              I thought that the project was fun, and I decided to continue working on it. I have recently added a similar films view, and I intend to continue to expand
              on the project in my free time. The documentation on the <a href='https://developers.themoviedb.org/3/getting-started/introduction' target='_blank' rel="noreferrer">TMDB API</a> is
              pretty large and there are several available datasets that could be entertaining to add. Please feel free to expand on this idea in any way you would like.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutView;
