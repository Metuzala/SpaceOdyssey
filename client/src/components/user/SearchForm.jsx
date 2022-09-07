import React, { useEffect, useState } from "react";
import { getAllPlanets } from "../../API";

export default function SearchForm({ setSelectedPlanets }) {
  const [planets, setPlanets] = useState([]);
  useEffect(function () {
    getAllPlanets().then((response) => setPlanets(response.data));
  }, []);

  const [startPos, setStartPos] = useState("");
  const [endPos, setEndPos] = useState("");

  const capitalize = (str) => {
    if (str) return str[0].toUpperCase() + str.slice(1);
  };

  const handleChangeFrom = (e) => {
    setStartPos(capitalize(e.target.value));
    console.log(startPos);
  };
  const handleChangeTo = (e) => {
    setEndPos(capitalize(e.target.value));
    console.log(endPos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!planets.includes(startPos) || !planets.includes(endPos)) {
      alert("Enter two of these planets: " + planets.join(", "));
    } else {
      if (setSelectedPlanets) {
        setSelectedPlanets({ startPlanet: startPos, endPlanet: endPos });
      }
    }
  };

  return (
    <div className="container">
      <div className="segment">
        <h3 className="heading">Search Flights</h3>
        <form className="form-inline" onSubmit={handleSubmit}>
          <div>
            <input
              className="form-control m-1 p-1 bg-transparent text-warning"
              type="text"
              value={startPos}
              placeholder="Starting Planet"
              onChange={handleChangeFrom}
            />
          </div>
          <div>
            <input
              className="form-control m-1 p-1 bg-transparent text-warning"
              type="text"
              value={endPos}
              placeholder="End Planet"
              onChange={handleChangeTo}
            />
          </div>
          <button className="btn btn-warning" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
