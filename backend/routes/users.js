const express = require('express');
const router = express.Router();
const controller = require("../controller/common_controller");

/* GET users listing. */

router.post('/addDealer', controller.addDealer);
router.post('/addCar', controller.addCar);
router.get('/readCar/:brand', controller.readCar);
router.get('/readDealer', controller.readDealer);
router.delete('/deleteCar/:id',controller.deleteCar);
router.delete('/deleteDealer/:id',controller.deleteDealer);
router.put('/editCar/:id', controller.editCar);
router.put('/editDealer/:id', controller.editDealer);
router.get('/getData', controller.getData);
router.get('/carFindById/:id',controller.carFindById);
router.get('/dealerFindById/:id',controller.dealerFindById);
router.get('/dealerSearchApi/:key',controller.dealerSearchApi);
router.get('/carSearchApi/:key',controller.carSearchApi);
router.get('/pptlData',controller.ppltData);

module.exports = router;
 