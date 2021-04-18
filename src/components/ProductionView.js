
const ProductionView = ({ company }) => {
  const logoURL = company.logo_path ? `https://image.tmdb.org/t/p/w500${company.logo_path}` : 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2538&q=80';
  return (
    <div className="col-lg-3 col-md-3 col-2 m-2">
      <div className="card shadow p-2">
        <img src={logoURL} className="card-img-top" alt={company.name}/>
        <div className="card-body">
          <h5 className="card-title">{company.name}</h5>
        </div>
      </div>
    </div>
	);
};

export default ProductionView;

