import React, { useState } from 'react';
import Popup from './popup';
import '../css/adminpanel.css'
import AddMoney from '../forms/addbalance';
import DeleteUser from '../forms/deleteUser';


const AdminPanel=()=>{
    const [addMoney,setAddMoney]=useState(false);
    const [deleteUser,setDeleteUser]=useState(false);


    const closePopups = () => {
        setAddMoney(false);
        setDeleteUser(false)
      
      };


    return (
        <div className='main-panel'>
            <h1>Welcome Admin</h1>
            <div className='main-inner'>
                <div className='admin'>
                    {(addMoney ||deleteUser) ? null : <button onClick={()=>setAddMoney(true)} className='pop-btn'>Deposit</button>}
                    <Popup trigger={addMoney} setTrigger={closePopups}>
                        <h1>Account Deposit</h1>
            
                            <AddMoney />
                    </Popup>
                    </div>

                    <div className='transfer'>
                    {(addMoney ||deleteUser) ? null : <button onClick={()=>setDeleteUser(true)} className='pop-btn'>Close A/C</button>}
                    <Popup trigger={deleteUser} setTrigger={closePopups}>
                        <h1>Close Account</h1>
                            <DeleteUser />
                    </Popup>
                </div>
            </div>
        </div>
    );
}

export default AdminPanel