import React, { useState } from 'react';
import axios from '../api';
import './AddTransaction.css';

const AddTransaction = () => {
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        '/transactions',
        { type, amount, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // If successful, log the response and maybe clear the form or display a success message
      console.log('Transaction added:', res.data);
      alert('Transaction added successfully');
    } catch (error) {
      // Handle errors
      console.error('Error adding transaction:', error.response ? error.response.data.msg : error.message);
      alert(error.response ? error.response.data.msg : 'An error occurred');
    }
  };

  return (
    <div>
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        {/* Dropdown for Income/Expense */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="" disabled>Select type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default AddTransaction;
