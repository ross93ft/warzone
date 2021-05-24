import React from "react";
import {Link} from "react-router-dom";
import Button from "./Button.js";

export default function Players(props) {
	//console.log('rendering players');
	document.title = "Choose Players - Warzone Teams";
  	return <>
    <p>Players</p>
    <div className="playersList">
		{props.players.map((player) => {
			return (
				<div id={"player"+player.id} className={player.status + " onePlayer"} key={player.id} onClick={(e) => props.onPlayerChange(e, player)}>
					<p>{player.name}</p>
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