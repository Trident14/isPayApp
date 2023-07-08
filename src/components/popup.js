import React from "react";
import '../css/popup.css'

import { useQueryClient } from '@tanstack/react-query';

function Popup(props){
    const queryClient = useQueryClient();

    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={() => 
                    {props.setTrigger(false); 
                    queryClient.refetchQueries(['balanceFetch']);
                    queryClient.refetchQueries(['transactions']);
                    queryClient.refetchQueries(['savingGoals']);
                 
                }
                    
                    
                    
                }>X</button>
                {props.children}
            </div>    
        </div>
    ) : "";
}

export default Popup;