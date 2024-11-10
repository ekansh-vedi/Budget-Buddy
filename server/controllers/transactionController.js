const Transaction = require('../models/Transaction');
 
 // Inside the addTransaction controller function
exports.addTransaction = async (req, res) => {
    const { type, amount, description } = req.body;
    const userId = req.user.id; // Getting the user ID from the authenticated user
  
    try {
      // Create a new transaction
      const transaction = new Transaction({
        user: userId,
        type,
        amount,
        description,
      });
  
      // Save the transaction to the database
      await transaction.save();
  
      // Return the created transaction as a response
      res.status(201).json(transaction);
    } catch (error) {
      // Handle errors
      console.error(error); // Log the error for debugging
      res.status(500).json({ msg: 'Internal server error', error: error.message });
    }
  };
  

// Get all transactions for a user
exports.getTransactions = async (req, res) => {
    try {
      const transactions = await Transaction.find({ user: req.user.id });
      res.json(transactions);  // Return the list of transactions
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };






// Delete a transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const userId = req.user.id; // Get user ID from auth middleware

    // Find and delete the transaction
    const transaction = await Transaction.findOneAndDelete({
      _id: transactionId,
      user: userId, // Ensure that the user can only delete their own transactions
    });

    if (!transaction) {
      return res.status(404).json({ msg: 'Transaction not found' });
    }

    res.status(200).json({ msg: 'Transaction deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error', error: error.message });
  }
};

  
