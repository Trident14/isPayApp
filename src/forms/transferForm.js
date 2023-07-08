import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const TransferForm = () => {
  const [error, setError] = useState('');
  const [transferData, setTransferData] = useState({
    username: '',
    amount: 0,
  });

  const [cookies] = useCookies(['access_token']);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransferData((prevData) => ({
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
          `https://ispay.onrender.com/api/dashboard/transfer`,
          {
            username: transferData.username,
            amount: Number(transferData.amount),
          },
          { headers: headers },
        )
        .then((response) => {
         
          alert(response.data.message);
        })
        .catch((error) => {
         
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
            value={transferData.username} 
            onChange={handleChange}
            />
        </label>
        <br />
        <label>
            Amount:
            <input
            type="number"
            name="amount"
            value={transferData.amount} 
            onChange={handleChange}
            />
        </label>
        <br />
        <button type="submit">Submit</button>
     </form>
  );
};

export default TransferForm;
