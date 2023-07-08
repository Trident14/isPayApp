import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const UpdateGoalForm = ({ current_goal_name }) => {
    const currentGoal=current_goal_name;

  const [error, setError] = useState('');
  const [amount, setAmount] = useState(0);

  const [cookies] = useCookies(['access_token']);

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = cookies['access_token'];
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      const requestBody = {
        goal_name: currentGoal,
        amount_deposit: amount,
      };
      try {
        const response = await axios.patch(
          'https://ispay.onrender.com/api/dashboard/update-money-saving-goal',
          requestBody,
          { headers: headers }
        );
        alert(response.data.message)
        
      } catch (error) {
    
        alert(error.response.data.message);
        setError(error.response.data.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <label>
        Amount:
        <input
          type="number"
          name="amount"
          value={amount}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UpdateGoalForm;
