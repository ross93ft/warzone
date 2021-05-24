import React, {useState, useEffect} from "react";
import './styles/app.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./components/Home.js";
import Players from "./components/Players.js";
import Locations from "./components/Locations.js";
import NotFound from "./components/NotFound.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import useFetch from "./helpers/useFetch.js";

function App() {
	const [players, setPlayers] = useState([]);
	const [locations, setLocations] = useState([]);
	const [results, setResults] = useState([]);
	const { get } = useFetch("/");

	useEffect(() => {
		get("players.json")
		.then((data) => {
			setPlayers(data);
		})
		.catch((error) => console.log("Could not load players", error));
	},[]);

	useEffect(() => {
		get("locations.json")
		.then((data) => {
			setLocations(data);
		})
		.catch((error) => console.log("Could not load locations", error));
	},[]);

	function handlePlayerChange(e, chosenPlayer){
		e.preventDefault();
		let newStatus = "";

		const existingPlayer = players.find(
			(player) => player.id === chosenPlayer.id
		);

		if (existingPlayer.status === "on") {
			newStatus = "off";
		} else if(existingPlayer.status === "off") {
			newStatus = "on";
		}

		const updatedPlayers = players.map((player) => {
			if (player.id === chosenPlayer.id) {
			  return {
				 ...player,
				 status: newStatus,
			  };
			}
			return player;
		});

		setPlayers(updatedPlayers);
	}

	function handleLocationChange(e, chosenLocation){
		e.preventDefault();
		let newLocationStatus = "";

		const existingLocation = locations.find(
			(location) => location.id === chosenLocation.id
		);

		if (existingLocation.status === "on") {
			newLocationStatus = "off";
		} else if(existingLocation.status === "off") {
			newLocationStatus = "on";
		}

		const updatedLocations = locations.map((location) => {
			if (location.id === chosenLocation.id) {
			  return {
				 ...location,
				 status: newLocationStatus,
			  };
			}
			return location;
		});
		
		setLocations(updatedLocations);
	}

	const chosenPlayers = players.filter(function (el) {
		return el.id &&
				 el.name &&
				 el.status === "on";
	});

	const playerCount = chosenPlayers.length;

	const chosenLocations = locations.filter(function (el) {
		return el.id &&
				 el.name &&
				 el.status === "on";
	});

	const locationCount = chosenLocations.length;

	function searchForArray(haystack, needle){
		var i, j, current;
		for(i = 0; i < haystack.length; ++i){
		   if(needle.length === haystack[i].length){
				current = haystack[i];
				for(j = 0; j < needle.length && needle[j] === current[j]; ++j);
			 	if(j === needle.length) return true;
		   }
		}
		return false;
	}

	function createMatches(names, numberOfMatches, matches = []){
		//names = ['1','2','3','4','5','6'];
		var x = 0;
		
		for (x;x<numberOfMatches;x++){
		  names.sort(function(){
				return Math.round(Math.random()) - 0.5;
		  });
		  var noOfTeams = 2;
		  var totalTeams = Math.ceil(names.length/noOfTeams);
		  var i,j,temparray,chunk = totalTeams;
		
		  for (i=0,j=names.length; i<j; i+=chunk) {
				temparray = names.slice(i,i+chunk);
				temparray.sort();
				if(!searchForArray(matches, temparray)){
					matches.push(temparray);
				}
		  }
		}
		return matches;
	}

	function generateLocations(numberOfMatches){
		var x = 0;
		let matchLocations = [];
		for (x;x<numberOfMatches;x++){
			var location = chosenLocations[Math.floor(Math.random() * chosenLocations.length)];
			matchLocations.push(location['name']);
		}
		return matchLocations;
	}

	function handleSearchClick() {
		//create results
		const numberOfMatches = 30;
		
		//strip out id and status just to use names in player list
		let playerNames = [];
		for (var x = 0;x<chosenPlayers.length;x++){
			playerNames.push(chosenPlayers[x]['name']);
		}

		const matches = createMatches(playerNames, numberOfMatches);
		
		//generate a list of random locations, duplicates allowed
		const locations = generateLocations(numberOfMatches);

		//format matches and locations into results
		let results = [];
		let count1, count2 = 0;
		let numberOfCreatedMatches = Math.round(matches.length / 2);

		for(var i=0; i < numberOfCreatedMatches; i++){
			count1 = i*2;
			count2 = count1+1;
			results.push({
				location: locations[i],
				team1: matches[count1],
				team2: matches[count2]
			});
		}

		//show results by updating state
		setResults(results);
	}

  	return (
		<BrowserRouter>
			<div className="container">
				<Header />
				<main>
					<Switch>
						<Route exact path="/">
							<Home results={results} onSearchClick={handleSearchClick} playerCount={playerCount} playerTotal={players.length} locationCount={locationCount} locationTotal={locations.length} />
						</Route>
						<Route exact path="/players">
							<Players players={players} onPlayerChange={handlePlayerChange} />
						</Route>
						<Route exact path="/locations">
							<Locations locations={locations} onLocationChange={handleLocationChange} />
						</Route>
						<Route>
							<NotFound />
						</Route>
					</Switch>
				</main>
				<Footer />
			</div>
		</BrowserRouter>
  	);
}

export default App;
