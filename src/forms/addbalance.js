import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const AddMoney = () => {
 
  const [error, setError] = useState('');
  const [addMoneyData, setAddMoneyData] = useState({
    username: '',
    amount: 0,
  });

  const [cookies] = useCookies(['access_token']);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddMoneyData((prevData) => ({
      ...prevData,
      [name]: value
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
        .patch(
          `https://ispay.onrender.com/updateBalance`,
          {
            username: addMoneyData.username,
            newBalance: Number(addMoneyData.amount),
          },
          { headers: headers },
        )
        .then((response) => {
          alert(response.data.message);
        })
        .catch((error) => {
          alert(error.response.data.message)
          setError(error.response.data.message);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
       {error && <p>{error}</p>}
        <label>
            Username:
            <input
            type="text"
            name="username" 
            value={addMoneyData.username} 
            onChange={handleChange}
            />
        </label>
        <br />
        <label>
            Amount:
            <input
            type="number"
            name="amount"
            value={addMoneyData.amount} 
            onChange={handleChange}
            />
        </label>
        <br />
        <button type="submit">Submit</button>
     </form>
  );
};

export default AddMoney;
