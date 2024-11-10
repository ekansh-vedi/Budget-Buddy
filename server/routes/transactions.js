const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const transactionController = require('../controllers/transactionController');

// Add a transaction (protected route)
router.post('/', authMiddleware, transactionController.addTransaction);

// Get all transactions (protected route)
router.get('/', authMiddleware, transactionController.getTransactions);

// Delete a transaction (protected route)
router.delete('/:id', authMiddleware, transactionController.deleteTransaction);

module.exports = router;
