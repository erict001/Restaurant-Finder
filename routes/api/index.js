const express = require('express')
const router = require('express').Router();

const userRoutes = require('./userRoutes');
router.use('/user', userRoutes);

const restaurantRoutes = require('./restaurantRoutes');
router.use('/restaurants', restaurantRoutes);

const favoriteRoutes = require('./favoriteRoutes');
router.use('/favorites', favoriteRoutes);

module.exports = router;
