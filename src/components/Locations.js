import React from "react";
import {Link} from "react-router-dom";
import Button from "./Button.js";

export default function Locations(props) {
	//console.log('rendering locations');
	document.title = "Choose Locations - Warzone Teams";
  	return <>
    <p>Locations</p>
    <div className="locationsList">
		{props.locations.map((location) => {
			//console.log(location);
			return (
				<div id={"location"+location.id} className={location.status + " oneLocation"} key={location.id} onClick={(e) => props.onLocationChange(e, location)}>
					<p>{location.name}</p>
					<img src="/tick.svg" alt="" />
				</div>
			);
		})}
		 <div className="buttonHolder">
			<Link to="/">
				<Button className="green">Finished</Button>
			</Link>
		</div>
	 </div>
  </>;
}