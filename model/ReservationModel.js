const mongoose = require('mongoose');
const ReservationModel = mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [ true, 'Please add first name' ]
		},
		lastName: {
			type: String,
			required: [ true, 'Please add last name' ]
		},
		reservationDate: {
			type: Date,
			required: [ true, 'Date missing!' ]
		},
		checkedFlights: {
			type: Array,
			required: true
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Reservation', ReservationModel);
