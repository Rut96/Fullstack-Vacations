import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../Models/UserModel";

// Init user (on login, on register):
export function initUser(currentState: UserModel, action: PayloadAction<UserModel>): UserModel {
    return action.payload;;
}

// Logout user: 
export function logoutUser(currentState: UserModel, action: PayloadAction): UserModel {
    // Create new state which is the given user:
    const newState: UserModel = null;
    // Return new state: 
    return newState;
}

export const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: { initUser, logoutUser }
});

export const userActions = userSlice.actions;
