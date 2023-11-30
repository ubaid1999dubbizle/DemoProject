const ConnectionRequestController = require('../controllers/connectionController');

const router = require('express').Router();

router.post('/addConnection', ConnectionRequestController.addConnectionReq);

router.get('/getAllConnections', ConnectionRequestController.getConnectionRequests);

//dynamic routers comes after specific ones

router.get('/:senderId/:receiverId', ConnectionRequestController.getOneConnectionRequest);

router.put('/:senderId/:receiverId', ConnectionRequestController.updateConnectionRequest);

router.delete('/:senderId/:receiverId', ConnectionRequestController.deleteConnectionRequest);


module.exports = router 