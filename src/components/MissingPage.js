import Hero from "./Hero.js";

const MissingPage = () => {
  return (
    <>
      <Hero text="Uh Oh. It wasn't supposed to end this way." />
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 my-5">
            <p className="lead">
								This is embarassing. Looks like one of our developers is getting fired. Please don't tell your friends.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MissingPage;
