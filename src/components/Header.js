import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
//import Button from "./Button.js";

export default function Header(props) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) {
      setIsDarkTheme(true);
    }
	 //console.log(prefersDark);
  }, []);

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkTheme]);

  return (
    <header className="header">
		 <nav>
      	<NavLink to="/" className="logo">
        		<img src="/logo.png" alt="" />
      	</NavLink>
		</nav>
	 </header>
  );
}