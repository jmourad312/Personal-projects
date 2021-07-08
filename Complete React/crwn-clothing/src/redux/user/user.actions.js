import { UserActionTypes } from "./user.types"

// ACTION CREATOR FUNCTION

export const setCurrentUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
})