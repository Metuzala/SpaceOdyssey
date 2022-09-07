import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import { getPriceList } from "../../API";
import ReservationForm from "./ReservationForm";

function FlightTable({ existingRoute }) {
  const [legs, setLegs] = useState([]);
  const [reservationInfo, setReservationInfo] = useState({});
  const [checkedFlights, setCheckedFlights] = useState([]);

  const toggleProvider = (e) => {
    e.currentTarget.classList.toggle("expand");
  };

  const reserve = () => {
    setReservationInfo({ checkedFlights, reservationDate: new Date() });
  };
  const checkFlight = (routeInfo, provider, isChecked) => {
    if (isChecked) {
      checkedFlights.push({ routeInfo, provider });
    } else {
      checkedFlights.pop({ routeInfo, provider });
    }
    setCheckedFlights([...checkedFlights]);
  };

  useEffect(() => {
    if (!existingRoute) {
      getPriceList().then((response) => setLegs(response.data.legs));
    } else {
      setLegs(existingRoute);
    }
  }, [existingRoute]);

  return (
    <div>
      <ReservationForm {...reservationInfo} />
      <section className="container">
        <br></br>
        <table className="table table text-warning" id="flight-table">
          <thead>
            <tr>
              <th scope="col">Route</th>
              <th scope="col">From</th>
              <th scope="col">To</th>
              <th scope="col">Distance</th>
              <th scope="col">Providers</th>
            </tr>
          </thead>
          <tbody>
            {legs.map((leg, i) => (
              <Fragment key={"leg" + i}>
                <tr className="" onClick={toggleProvider}>
                  <td>{i + 1}</td>
                  <td>{leg.routeInfo.from.name}</td>
                  <td>{leg.routeInfo.to.name}</td>
                  <td>
                    {new Intl.NumberFormat().format(leg.routeInfo.distance)} km
                  </td>
                  <td>Open/close</td>
                </tr>
                <tr className="providers">
                  <td colSpan="100">
                    <table className="table table text-warning ">
                      <thead>
                        <tr>
                          <th scope="col">Provider</th>
                          <th scope="col">Price</th>
                          <th scope="col">Departure</th>
                          <th scope="col">Arrival</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {leg.providers.map((provider, j) => (
                          <tr key={"provider" + i + "_" + j}>
                            <td>{provider.company.name}</td>
                            <td>
                              {new Intl.NumberFormat().format(provider.price)}
                            </td>
                            <td>
                              {new Date(
                                provider.flightStart
                              ).toLocaleDateString()}
                            </td>
                            <td>
                              {new Date(
                                provider.flightEnd
                              ).toLocaleDateString()}
                            </td>
                            <td>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  onClick={(e) =>
                                    checkFlight(
                                      leg.routeInfo,
                                      provider,
                                      e.target.checked
                                    )
                                  }
                                />
                                <label className="form-check-label">
                                  Select Flight
                                </label>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
        {checkedFlights.length > 0 && (
          <Button
            variant="warning"
            id="reserve-button"
            onClick={() => reserve(checkedFlights)}
          >
            Reserve
          </Button>
        )}
      </section>
    </div>
  );
}

export default FlightTable;
