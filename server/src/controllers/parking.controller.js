const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { parkingService } = require('../services');
const { sendParkcarcateViaEmail } = require('../services/email.service');
const { User } = require('../models');
const { Parking } = require('../models');

const createParking = catchAsync(async (req, res) => {
  const parking = await parkingService.createParking(req.body);
  res.status(httpStatus.CREATED).send(parking);
});

const getParkings = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await parkingService.queryParkings(filter, options);
  res.send(result);
});

const getParking = catchAsync(async (req, res) => {
  const parking = await parkingService.getParkingById(req.params.parkingId);
  if (!parking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Parking not found');
  }
  res.send(parking);
});

const updateParking = catchAsync(async (req, res) => {
  const parking = await parkingService.updateParkingById(req.params.parkingId, req.body);
  res.send(parking);
});

const deleteParking = catchAsync(async (req, res) => {
  await parkingService.deleteParkingById(req.body.parkingId);
  res.status(httpStatus.NO_CONTENT).send();
});

const parkCar = catchAsync(async (req, res) => {
  const parkingLotId = '64f07582ffd8956f0a0eaa43';

  if (!req.body.userId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Provide A UserId');
  }

  const lot = await Parking.findById(parkingLotId);
  console.log(lot);

  if (lot.parkedCars.length >= lot.capacity) {
    throw new ApiError(400, 'No spot available for parking.');  
  }

  lot.parkedCars.push(req.body.userId);

  const user = await User.findByIdAndUpdate(req.body.userId, {
    parkingDetails: {
      lot: parkingLotId,
      entryTime: Date.now(),
    },
  });

  await lot.save();

  res.status(202).send({ message: 'Spot registered', user: user });
});

const unparkCar = catchAsync(async (req, res) => {
  const parkingLotId = '64f07582ffd8956f0a0eaa43';
  console.log(Parking);
  const lot = await Parking.findById(parkingLotId);

  lot.parkedCars = lot.parkedCars.filter((ele) => ele != req.user.id);

  const user = await User.findById(req.user.id);

  const parkingDetails = {
    ...user.parkingDetails,
    exitTime: Date.now(),
  };

  user.parkingHistory.push(parkingDetails);
  user.parkingDetails = {};

  await lot.save();
  await user.save();
  res.status(202).send({ message: 'Spot registered' });
});

module.exports = {
  createParking,
  getParkings,
  getParking,
  updateParking,
  deleteParking,
  parkCar,
  unparkCar,
};
