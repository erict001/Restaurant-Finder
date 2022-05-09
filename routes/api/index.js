const express = require('express')
const router = require('express').Router();

const frontEndRoutes = require('./frontEndRoutes');
router.use('/', frontEndRoutes);

const restaurantRoutes = require('./restaurantRoutes');
router.use('/profile', restaurantRoutes);


module.exports = router;
