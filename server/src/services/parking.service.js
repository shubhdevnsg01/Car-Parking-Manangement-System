const httpStatus = require('http-status');
const { Parking } = require('../models');
const ApiError = require('../utils/ApiError');

const createParking = async (parkingBody) => {
  return Parking.create(parkingBody);
};

const queryParkings = async (filter, options) => {
  const parkings = await Parking.paginate(filter, options);
  return parkings;
};

const getParkingById = async (id) => {
  return Parking.findById(id);
};

const getParkingByEmail = async (email) => {
  return Parking.findOne({ email });
};

const updateParkingById = async (parkingId, updateBody) => {
  const parking = await getParkingById(parkingId);
  if (!parking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Parking not found');
  }
  if (updateBody.participants) {
    if (parking.participants != []) parking.participants.push(...updateBody.participants);
  } else {
    Object.assign(parking, updateBody);
  }
  await parking.save();
  return parking;
};

const deleteParkingById = async (parkingId) => {
  const parking = await getParkingById(parkingId);
  if (!parking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Parking not found');
  }
  await parking.remove();
  return parking;
};

module.exports = {
  createParking,
  queryParkings,
  getParkingById,
  getParkingByEmail,
  updateParkingById,
  deleteParkingById,
};
