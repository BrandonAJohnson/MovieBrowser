import CardGroup from "./CardGroup.js";

const TrendingView = ({ trending }) => {
	return (
		<>
			{trending && <CardGroup title="Trending Now" data={trending}/>}
		</>
	);
}

export default TrendingView;
