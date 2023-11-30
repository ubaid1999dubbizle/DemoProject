const db = require('../util/database');

const ConnectionRequest = db.connectionreqs;


//create ConnectionReq
const addConnectionReq = async (req, res) => {
    try {
      let connectionRequestInfo = {
        senderId: req.body.senderId,
        receiverId: req.body.receiverId,
        status: 'pending'
      };
  
      const connectionRequest = await ConnectionRequest.create(connectionRequestInfo);
      res.status(200).send(connectionRequest);
    } catch (error) {
        console.error('Error adding connection request:', error);

        // Check if the error is due to validation or constraint failure
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ error: 'Invalid connection request data. Please check the provided information.' });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
  };
  

//get all users

const getConnectionRequests = async (req, res) => {
    try {
        let connectionRequests = await ConnectionRequest.findAll();
        res.status(200).send(connectionRequests);
    } catch (error) {
        console.error('Error fetching connection requests:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Get a single connection request
const getOneConnectionRequest = async (req, res) => {
    try {
        let senderId = req.params.senderId;
        let receiverId = req.params.receiverId;

        let connectionRequest = await ConnectionRequest.findOne({ where: { senderId, receiverId : senderId , receiverId} });
        res.status(200).send(connectionRequest);
    } catch (error) {
        console.error('Error fetching connection request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/// Update connection request
const updateConnectionRequest = async (req, res) => {
    try {
        let senderId = req.params.senderId;
        let receiverId = req.params.receiverId;
        let { status } = req.body;

        // Check if the status is either "accepted" or "rejected"
        if (status !== 'accepted' && status !== 'rejected') {
            return res.status(400).json({ error: 'Invalid status. Allowed values are "accepted" or "rejected".' });
        }

        // Update the connection request only if the status is valid
        const [updatedRowsCount, updatedRows] = await ConnectionRequest.update(
            { status },
            { where: { senderId, receiverId, status: 'pending' } }
        );

        if (updatedRowsCount === 0) {
            return res.status(404).json({ error: 'Connection request not found or status is not "pending".' });
        }

        res.status(200).send(updatedRows);
    } catch (error) {
        console.error('Error updating connection request:', error);

        // Check if the error is due to validation or constraint failure
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ error: 'Invalid connection request data. Please check the provided information.' });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};


// Delete connection request
const deleteConnectionRequest = async (req, res) => {
    try {
        let senderId = req.params.senderId;
        let receiverId = req.params.receiverId;

        await ConnectionRequest.destroy({ where: { senderId, receiverId : senderId, receiverId } });
        res.status(200).send('Connection request deleted');
    } catch (error) {
        console.error('Error deleting connection request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    addConnectionReq,
    getConnectionRequests,
    getOneConnectionRequest,
    updateConnectionRequest,
    deleteConnectionRequest
}