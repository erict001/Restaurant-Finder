const router = require('express').Router();
const apiRoutes = require('./api');
const frontEndRoutes = require('./frontEndRoutes');
const restaurantRoutes = require('./api/restaurantRoutes')

router.use('/api', apiRoutes);

router.use('/', frontEndRoutes);

router.use('/restaurant', restaurantRoutes);


// router.use((req, res) => {
//   res.send("<h1>Error Route</h1>")
// });

module.exports = router;