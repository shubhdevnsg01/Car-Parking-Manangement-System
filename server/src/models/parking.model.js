const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const ParkingSchema = mongoose.Schema(
  {
    parkedCars: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
    capacity: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
ParkingSchema.plugin(toJSON);
ParkingSchema.plugin(paginate);

/**
 * @typedef Parking
 */
const Parking = mongoose.model('Parking', ParkingSchema);

module.exports = Parking;
