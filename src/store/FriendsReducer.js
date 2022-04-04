import { combineReducers } from 'redux';
import { ADD_FRIEND, REMOVE_FRIEND } from '../utils/types';
import React, {useState, useEffect} from "react";

//const [data,setData]= useState([])

const INITIAL_STATE = {current: [],
                       possible: ['Alice',
                                  'Bob',
                                  'Sammy']
                       };


const friendsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        
        case ADD_FRIEND:
            // Pulls current and possible out of previous state
            // We do not want to alter state directly in case
            // another action is altering it at the same time
            const {current, possible} = state;
            // Pull friend out of friends.possible
            // Note that action.payload === friendIndex
            const addedFriend = possible.splice(action.payload, 1);

            // And put friend in friends.current
            current.push(addedFriend);

            // Finally, update the redux state
            const newState = { current, possible };
  
            return newState;

        case REMOVE_FRIEND:
            console.log(REMOVE_FRIEND)
            
        default:
            return state
  }
};

const pedidosReducer = (state = 'asd', action)=>{
    switch(action.type){
        //case x:
        default:
            return state
    }
}

export default combineReducers({friends: friendsReducer, pedidos: pedidosReducer});