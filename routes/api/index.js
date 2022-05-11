const express = require('express')
const router = require('express').Router();

const userRoutes = require('./userRoutes');
router.use('/user', userRoutes);


const restaurantRoutes = require('./restaurantRoutes');
router.use('/restaurants', restaurantRoutes);


module.exports = router;
