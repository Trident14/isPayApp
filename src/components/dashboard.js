import React from 'react';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import '../css/dashboard_nav.css'
import Popup from './popup';
import GoalForm from '../forms/goalForm';
import TransferForm from '../forms/transferForm'
import {useQuery} from '@tanstack/react-query';
import UpdateGoalForm from '../forms/updateGoal'
import { useQueryClient } from '@tanstack/react-query';
import refreshLogo from '../asset/refreshLogo.png'


export const Dashboard = () => {

  const queryClient = useQueryClient();
  const [username, setUsername] = useState(null);
  const [cookies] = useCookies(["access_token"]);
 

  const [currentPage, setCurrentPage] = useState(0);


  const [createGoalPopup, setCreateGoalPopup] = useState(false);
  const [viewAllGoalsPopup, setViewAllGoalsPopup] = useState(false);
  const [transactionPopup, setTransactionPopup] = useState(false);
  const [transferPopup, setTransferPopup] = useState(false);
  const [isactivateSavings,setActiveSaving]=useState(false)
  const [updateGoal,setUpdateGoal]=useState(false)
  const [currentGoal,setCurrentGoal]=useState('');
  const closePopups = () => {
    setCreateGoalPopup(false);
    setViewAllGoalsPopup(false);
    setTransferPopup(false);
    setTransactionPopup(false);
    setUpdateGoal(false)
  
  };

  const checkSavingsActive=()=>{
    const token = cookies["access_token"];
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      axios.get(
          `https://ispay.onrender.com/api/dashboard/check-saving-goals-enable`,
          { headers: headers },
        )
        .then((response) => {
          setActiveSaving(response.data);
        })
        .catch((error) => {
          alert(error.data)
        });
    }
  };


  const activateSavings = () => {
    const token = cookies["access_token"];
    if (token) {
      const user = localStorage.getItem("username");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      axios
        .post(
          `https://ispay.onrender.com/api/dashboard/enable-saving-goals`,
          { username: user },
          { headers: headers },
        )
        .then((response) => {
          alert("Saving Feature Active");
          setActiveSaving(true);
        })
        .catch((error) => {
          alert(error.data.message)
        });
    }
  };

const BalanceUseCheck = async () => {
    const token = cookies["access_token"];
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
  
      const response = await axios.get(`https://ispay.onrender.com/api/dashboard/balance`,
        { headers: headers }
      );  

      
      return response;
    }
   alert("Somthing went Wrong, retry")

  };
  
const viewAllGoal = async () => {
  const token = cookies["access_token"];
  if (token) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.get(
      `https://ispay.onrender.com/api/dashboard/all-savings-goal`,
      { headers: headers }
    );

    return response.data;
  }

  throw new Error('Access token not found.');
};


const viewAllTransactions = async () => {
  const token = cookies["access_token"];
  if (token) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.get(
      `https://ispay.onrender.com/api/dashboard/all-transaction`,
      { headers: headers }
    );

    return response.data;
  }

  throw new Error('Access token not found.');
};

const withdrawalGoal = async (goalname) => {
  const token = cookies["access_token"];
  if (token) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const requestBody = {
      goal_name: goalname,
    };
    try {
      const response = await axios.patch(
        `https://ispay.onrender.com/api/dashboard/withdrwal-money-sg`,
        requestBody,
        { headers: headers }
      );
      alert(response.data.message);
    } catch (error) {
      alert(error);
    }
  }
};
const warningFunc = (goalname) => {
  const shouldProceed = window.confirm(`Are you sure you want to withdrawal, doing this will delete the goal ${goalname}?`);
  if (shouldProceed) {
    // Call another function here
   withdrawalGoal(goalname);
  }
};

  
  
  useEffect(() => {
    const user = localStorage.getItem('username');
    setUsername(user);
    checkSavingsActive()
  }, []);
  
  const {data:balance_response, error:balance_error, isLoading:balance_IsLoading }=useQuery(['balanceFetch'],BalanceUseCheck,{
    enabled: true,
    staleTime: 30000,
    cacheTime: 60000,
  })

  const { data: goal_Data, error: goal_Error, isLoading: goal_IsLoading } = useQuery(['savingGoals'], viewAllGoal, {
    enabled: true,
    staleTime: 30000,
    cacheTime: 60000,
  });
  
  const { data: transaction_Data, error: transaction_Error, isLoading: transaction_IsLoading } = useQuery(['transactions'], viewAllTransactions, {
    enabled: true,      
    staleTime: 30000,
    cacheTime: 60000,
  });
 
  
  if (goal_IsLoading || transaction_IsLoading || balance_IsLoading) {
    return <div>Loading...</div>;
  }
  
  if (goal_Error) {
    return <div>Error: {goal_Error.message}</div>;
  }
  
  if (transaction_Error) {
    return <div>Error: {transaction_Error.data.message}</div>;
  }
  if(balance_error){
    return <div>Error:{balance_error.message}</div>
  }
  // Rest of your component code
  


  return (
  <>
    <div className="main-panel">
              {(createGoalPopup || viewAllGoalsPopup || transferPopup || transactionPopup) ? null : (
                <div className="user-detail-panel">
                  <h1>Welcome Back, {username}</h1>
                  <div className='balance-holder'>
                    <h1>Balance: {balance_response.data.balance}</h1>
                    <button onClick={()=>queryClient.refetchQueries(['balanceFetch'])} className='refresh-btn'>
                      
                        <img className='refresh-logo' src={refreshLogo} alt='refresh' ></img>
                      </button>
                  </div>
                  
                </div>
              )}

      <div className='main-sub-panel'>

        <div className='create-goal'>
        {(createGoalPopup || viewAllGoalsPopup || transferPopup || transactionPopup ||updateGoal) ? null : <button onClick={()=>setCreateGoalPopup(true)} className='pop-btn'>Saving Goal</button>}
          <Popup trigger={createGoalPopup} setTrigger={closePopups}>
            <h1>New Saving</h1>
            {!isactivateSavings?
              <button className='saving-btn' onClick={()=>activateSavings()}>Activate Saving</button>
              :
              <div>
                <GoalForm />
              </div>
          }
          </Popup>
        </div>
       <div className="view-goal">
            {updateGoal ? (
              <Popup trigger={updateGoal} setTrigger={closePopups}>
                <div className="updateGoal">
                  {(createGoalPopup ||
                    viewAllGoalsPopup ||
                    transferPopup ||
                    transactionPopup ||
                    updateGoal) ? null : (
                    <button
                      onClick={() => setTransferPopup(true)}
                      className="pop-btn"
                    >
                      Transfer
                    </button>
                  )}
                  <h1>Update Goal</h1>
                  <UpdateGoalForm current_goal_name={currentGoal} />
                </div>
              </Popup>
            ) : (
              <div>
                {createGoalPopup ||
                viewAllGoalsPopup ||
                transferPopup ||
                transactionPopup ||
                updateGoal ? null : (
                  <button onClick={() => setViewAllGoalsPopup(true)} className="pop-btn">
                    View Goal
                  </button>
                )}
                <Popup trigger={viewAllGoalsPopup} setTrigger={closePopups}>
                  <div className="savings-table">
                    <h1>Saving Goals</h1>
                    <table>
                      <thead>
                        <tr>
                          <th>Goal Name</th>
                          <th>Goal Amount</th>
                          <th>Total Amount</th>
                          <th>Update</th>
                          <th>Withdrawal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {goal_Data.map((goal, index) => (
                          <tr key={index}>
                            <td>{goal.goal_name}</td>
                            <td>{goal.goal_amount}</td>
                            <td>{goal.Total_amount}</td>
                            <td>
                              <button className='inside-btn'
                                onClick={() => {
                                  setUpdateGoal(true);
                                  setCurrentGoal(goal.goal_name);
                                }}
                              >
                                Add
                              </button>
                            </td>
                            <td>
                              <button className='inside-btn' 
                                onClick={()=>{
                                  warningFunc(goal.goal_name)
                                }}           
                              >Withdrawal</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Popup>
              </div>
            )}
          </div>


        <div className='Transaction'>
        {(createGoalPopup || viewAllGoalsPopup || transferPopup || transactionPopup ||updateGoal) ? null :<button onClick={()=>setTransactionPopup(true)}  className="pop-btn">Transaction</button>}
          <Popup trigger={transactionPopup} setTrigger={closePopups}>
          <h1>Transaction</h1>
          <div className='transaction-pop'>
              <table>
                <thead>
                  <tr>
                    <th>Transaction Type</th>
                    <th>Amount</th>
                    <th>Balance</th>
                    <th>To</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {transaction_Data
                    .slice()
                    .reverse()
                    .slice(currentPage * 5, (currentPage + 1) * 5)
                    .map((transaction, index) => (
                      <tr key={index}>
                        <td>{transaction.transaction_type}</td>
                        <td>{transaction.amount}</td>
                        <td>{transaction.balance}</td>
                        <td>{transaction.sendTo}</td>
                        <td>{transaction.created_at}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
                  <div className='btn-prev-next'>
                    <button className='prev-btn'
                      disabled={currentPage === 0}
                      onClick={() => setCurrentPage(currentPage - 1)}>
                      Previous
                    </button>
                    <button  className='next-btn'
                      disabled={(currentPage + 1) * 5 >= transaction_Data.length}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Next
                    </button>
                  </div>
            </div>
          </Popup>
        </div>
        
        <div className='transfer'>
        {(createGoalPopup || viewAllGoalsPopup || transferPopup || transactionPopup ||updateGoal) ? null : <button onClick={()=>setTransferPopup(true)} className='pop-btn'>Transfer</button>}
          <Popup trigger={transferPopup} setTrigger={closePopups}>
            <h1>Transfer</h1>
  
                <TransferForm />
          </Popup>
        </div>
         
      </div>  
    </div>
  </>

  );
};
