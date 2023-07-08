import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
const GoalForm = () => {
  const [cookies]= useCookies(["access_token"]);
  const [goalData, setGoalData] = useState({
    goal_name: '',
    goal_amount: 0,
    amount_deposit: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoalData((prevData) => ({
      ...prevData,
      [name]: name === 'goal_amount' || name === 'amount_deposit' ? parseInt(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = cookies["access_token"];
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      axios
        .post(
          `https://ispay.onrender.com/api/dashboard/new-saving-goal`,
          { ...goalData},
          { headers: headers },
        )
        .then((response) => {
          alert(response.data.message);
        })
        .catch((error) => {
          alert(error.data.message)
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Goal Name:
        <input
          type="text"
          name="goal_name"
          value={goalData.goal_name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Goal Amount:
        <input
          type="number"
          name="goal_amount"
          value={goalData.goal_amount}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Amount Deposit:
        <input
          type="number"
          name="amount_deposit"
          value={goalData.amount_deposit}
          onChange={handleChange}
        />
      </label>
      <br />

      <button type="submit">Submit</button>
    </form>
  );
};

export default GoalForm;
