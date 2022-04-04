import { ADD_FRIEND, REMOVE_FRIEND } from "../utils/types";


export const addFriend = friendsIndex => (
  {
    type: ADD_FRIEND,
    payload: friendsIndex,
  }
)

export const removeFriend = friendsIndex =>(
  {
    type: REMOVE_FRIEND,
    payload: friendsIndex,
  }
)