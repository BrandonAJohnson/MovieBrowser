
const ReviewView = ({reviews}) => {

	const getCardColor = (rating) => {
		if (rating >= 8) return 'text-success border-success';
		if (rating >= 7) return 'text-primary border-primary';
		if (rating >= 6) return 'text-warning border-warning';
		if (rating < 6) return 'text-danger border-danger';
		return 'border-secondary';
	}

	return (
		<>
			{reviews && reviews.length > 0 &&
				<>
					<div className="position-relative my-5">
						<div className="mt-5">
							<h2 className="mb-3">Reviews</h2>
							<div className="row">
								{
									reviews.map((obj, i) => {
										return (
											<div key={i}>
												<div className={`card mb-3 rounded-3 border border-3 ${getCardColor(obj.author_details?.rating)} shadow`}>
													<div className="card-body">
														<h5 className="card-title">{obj.author}</h5>
														<h6>{obj.author_details?.rating}</h6>
														<p className="card-text">{obj.content}</p>
														{/* need to format this date
															<p className="card-text"><small>{obj.updated_at}</small></p> */}
													</div>
												</div>
											</div>
										);
									})
								}
							</div>
						</div>
					</div>
				</>
      }
		</>
	)
}

export default ReviewView;
