import React from "react";
import {Link} from "react-router-dom";
import Button from "./Button.js";

export default function Home(props) {
	let counter = 0;
	document.title = "Warzone Teams";
  	return <>
	<div className="oneAction">
		<Link to="/players">
			Players ({props.playerCount}/{props.playerTotal}) <img src="/arrow-right.svg" alt="arrow icon" />
		</Link>
	</div>
	<div className="oneAction">
		<Link to="/locations">
			Locations ({ props.locationCount }/{props.locationTotal}) <img src="/arrow-right.svg" alt="arrow icon" />
		</Link>
	</div>
   <div className="buttonHolder">
		<Button className="green" onClick={props.onSearchClick}>Go</Button>
	</div>
	<div className="resultsHolder">
		{props.results.length === 0 ? "" : <p>Results:</p>}
		{props.results &&
			props.results.map((result) => {
				counter++;
				return (
					<div className="oneResult">
						<h3>Game #{counter}</h3>
						<p>{result.location}</p>
						<div className="oneTeam">
							<h3>Team #1</h3>
							<p>{result.team1[0]}</p>
							<p>{result.team1[1]}</p>
							<p>{result.team1[2]}</p>
						</div>
						<div className="oneTeam">
							<h3>Team #2</h3>
							<p>{result.team2[0]}</p>
							<p>{result.team2[1]}</p>
							<p>{result.team2[2]}</p>
						</div>
					</div>
				);
			})
		}
	</div>
  </>;
}