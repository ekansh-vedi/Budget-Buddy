import React, { useState, useEffect } from 'react';
import axios from '../api';
import './TransactionList.css';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  // Fetch transactions from the backend
  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/transactions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(res.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  // Format the transaction date to a readable format
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString();
  };

  // Delete transaction handler
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      // Send DELETE request to the backend
      await axios.delete(`/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Remove the deleted transaction from the state
      setTransactions(transactions.filter((transaction) => transaction._id !== id));
      alert('Transaction deleted successfully');
    } catch (error) {
      console.error('Error deleting transaction:', error);
      alert('Error deleting transaction');
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="transaction-list-container">
      <h2>Transaction List</h2>
      {transactions.length === 0 ? (
        <div className="no-transactions">No transactions found</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Date</th>
              <th>Action</th> {/* Add Action column for delete button */}
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{transaction.description}</td>
                <td className="transaction-amount">{transaction.amount}</td>
                <td className={`transaction-type ${transaction.type.toLowerCase()}`}>
                  {transaction.type}
                </td>
                <td className="transaction-date">{formatDate(transaction.date)}</td>
                <td>
                  <button
                    onClick={() => handleDelete(transaction._id)} // Delete button click handler
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionList;
