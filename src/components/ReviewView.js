
const ReviewView = ({reviews}) => {

	const getCardColor = (rating) => {
		if (rating >= 8) return 'bg-success';
		if (rating >= 7) return 'bg-primary';
		if (rating >= 6) return 'bg-warning';
		if (rating < 6) return 'bg-danger';
		return 'bg-secondary';
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
											<>
												<div className={`card mb-3 text-white ${getCardColor(obj.author_details?.rating)}`}>
													<div className="card-body">
														<h5 className="card-title">{obj.author}</h5>
														<h6>{obj.author_details?.rating}</h6>
														<p className="card-text">{obj.content}</p>
														{/* need to format this date
															<p className="card-text"><small>{obj.updated_at}</small></p> */}
													</div>
												</div>
											</>
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
