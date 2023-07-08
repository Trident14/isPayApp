import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';


const DeleteUser = () => {
 
  const [error, setError] = useState('');
  const [usernameData, setUsername] = useState('');

  const [cookies] = useCookies(['access_token']);

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = cookies["access_token"];
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
  
      const requestData = {
        username: usernameData,
      };
  
      axios
        .delete(`https://ispay.onrender.com/delete`, {
          headers: headers,
          data: requestData,
        })
        .then((response) => {
          alert(response.data.message);
        })
        .catch((error) => {
          alert(error.response.data.message);
          setError(error.response.data.message);
        });
    }
  };
  
  
  // ...
  
  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={usernameData}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default DeleteUser;
