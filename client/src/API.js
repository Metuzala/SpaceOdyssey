const axios = require('axios');

export function getAllPlanets() {
	return axios.get('/all-planets');
}
export function getRouteFromServer(startPlanet, endPlanet, searchType) {
	return axios.post('/get-route', { startPlanet, endPlanet, searchType });
}
export function getPriceList() {
	return axios.get('/pricelist');
}
export function getReservations() {
	return axios.get('/reservations');
}
export function makeReservation(checkedFlights, reservationDate, customerInfo) {
	return axios.post('/reservations', { checkedFlights, reservationDate, customerInfo });
}
