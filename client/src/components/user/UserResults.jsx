import React, { useEffect, useState } from "react";
import { getRouteFromServer } from "../../API";
import FlightTable from "../layout/FlightTable";

export default function UserResults({ startPlanet, endPlanet }) {
  const [shortestRoute, setShortestRoute] = useState([]);

  useEffect(() => {
    getRouteFromServer(startPlanet, endPlanet, "shortest").then((response) =>
      setShortestRoute(response.data)
    );
  }, [startPlanet, endPlanet]);

  function sortByPrice(providers) {
    return providers.sort((a, b) => a.price - b.price);
  }

  function getProviders(route) {
    return route
      .map((b) => sortByPrice(b.providers)[0].company.name)
      .join(", ");
  }
  function getDistance(route) {
    return route.reduce((a, b) => a + b.routeInfo.distance, 0);
  }

  function getPrice(route) {
    return route.reduce((a, b) => a + sortByPrice(b.providers)[0].price, 0);
  }

  return (
    <div className="container shadow-sm">
      <section>
        <br></br>
        <table className="table table text-warning ">
          <thead>
            <tr>
              <th scope="col">Route</th>
              <th scope="col">From</th>
              <th scope="col">To</th>
              <th scope="col">Stops</th>
              <th scope="col">Distance</th>
              <th scope="col">Price</th>
              <th scope="col">Providers</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Shortest</td>
              <td>{startPlanet}</td>
              <td>{endPlanet}</td>
              <td>{shortestRoute?.length}</td>
              <td>
                {new Intl.NumberFormat().format(getDistance(shortestRoute))} km
              </td>
              <td>{new Intl.NumberFormat().format(getPrice(shortestRoute))}</td>
              <td>{getProviders(shortestRoute)}</td>
            </tr>
          </tbody>
        </table>
        {shortestRoute && <FlightTable existingRoute={shortestRoute} />}
      </section>
    </div>
  );
}
