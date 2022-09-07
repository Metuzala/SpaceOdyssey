import React, { Fragment, useEffect, useState } from "react";
import { getReservations } from "../../API";

function ReservationPage() {
  const [reservations, setReservations] = useState([]);

  function getPrice(reservation) {
    return reservation.checkedFlights.reduce(
      (sum, flight) => flight.provider.price + sum,
      0
    );
  }

  useEffect(function () {
    getReservations().then((response) => setReservations(response.data));
  }, []);

  return (
    <div>
      <section className="container">
        <div>
          <table className="table table text-warning ">
            <thead>
              <tr>
                <th colSpan="100">Reserved Flights</th>
              </tr>
            </thead>
            <tbody>
              {reservations.length === 0 && <tr><td>No reservations found</td></tr>}
              {reservations.map((reservation, i) => (
                <Fragment key={i}>
                  <tr>
                    <td colSpan="100">
                      Flights reserved for {reservation.lastName.toUpperCase()},{" "}
                      {reservation.firstName.toUpperCase()} at{" "}
                      {new Date(
                        reservation.reservationDate
                      ).toLocaleDateString()}{" "}
                      :
                    </td>
                  </tr>
                  {reservation.checkedFlights.map((flight, j) => (
                    <tr key={"flight" + j}>
                      <td>{flight.routeInfo.from.name}</td>
                      <td>{flight.routeInfo.to.name}</td>
                      <td>
                        {new Intl.NumberFormat().format(
                          flight.routeInfo.distance
                        )}{" "}
                        km
                      </td>
                      <td>{flight.provider.company.name}</td>
                      <td>
                        {new Intl.NumberFormat().format(flight.provider.price)}{" "}
                        €
                      </td>
                      <td>
                        {new Date(
                          flight.provider.flightStart
                        ).toLocaleDateString()}
                      </td>
                      <td>
                        {new Date(
                          flight.provider.flightEnd
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="100">
                      Flights total :{" "}
                      {new Intl.NumberFormat().format(getPrice(reservation))} €
                    </td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default ReservationPage;
