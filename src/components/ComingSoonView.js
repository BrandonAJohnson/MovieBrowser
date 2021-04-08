import CardGroup from "./CardGroup.js";
import config from "../config.json";
import { useEffect, useState } from 'react';


const ComingSoonView = () => {
	const [comingSoonData, setComingSoon] = useState([]);
	useEffect(() => {
    if (!comingSoonData || comingSoonData.length === 0) {
			fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${config.apiKey}&language=en-US&page=1`)
      .then(response => response.json())
      .then(data => {
        setComingSoon(data.results);
      });
    }
  },[comingSoonData]);

  return (
		<>
			{comingSoonData && <CardGroup title="Coming Soon" data={comingSoonData}/>}
		</>
	);
};

export default ComingSoonView;
