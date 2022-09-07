import React from "react";
import { useRef } from "react";

export default function Navbar() {
  const navLinks = useRef();
  const burger = useRef();

  const toggleBurger = (e) => {
    navLinks.current.classList.toggle("nav-active");
    burger.current.classList.toggle('toggle');
  };

  return (
    <div>
      <nav>
        <div className="logo">
          <h4><a href="/">Space Odyssey</a></h4>
        </div>
        <ul className="nav-links" ref={navLinks}>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/reserv">Reservations</a>
          </li>
          <li>
            <a href="/flights">Flights</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
        </ul>
        <div className="burger" ref={burger} onClick={toggleBurger}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>
      <br></br>
    </div>
  );
}
