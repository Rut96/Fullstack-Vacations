import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VacationModel } from "../Models/VacationModel";


// Init entire Vacations once: 
export function initVacations(currentState: VacationModel[], action: PayloadAction<VacationModel[]>): VacationModel[] {
    return action.payload;
}

// Add Vacation to global state: 
export function addVacation(currentState: VacationModel[], action: PayloadAction<VacationModel>): VacationModel[] {
    const newState = [...currentState];
    newState.push(action.payload);
    return newState;
}

// Update Vacation in global state: 
export function updateVacation(currentState: VacationModel[], action: PayloadAction<VacationModel>): VacationModel[] {
    const newState = [...currentState];
    const index = newState.findIndex(p => p.id === action.payload.id); // Locate index.
    newState[index] = action.payload; // Update - replace old Vacation with given Vacation.
    return newState;
}

// Delete Vacation from global state: 
export function deleteVacation(currentState: VacationModel[], action: PayloadAction<number>): VacationModel[] {
    const newState = [...currentState]; // Duplicate current state.
    const index = newState.findIndex(p => p.id === action.payload); // Locate index.
    newState.splice(index, 1); // Delete given Vacation.
    return newState; // Return the new state.
}

// Clear all Vacations from global state: 
export function clearVacations(currentState: VacationModel[], action: PayloadAction): VacationModel[] {
    return [];
}

// Toggle like for a vacation
export function toggleVacationLike(currentState: VacationModel[], action: PayloadAction<number>): VacationModel[] {
    const newState = [...currentState];
    const index = newState.findIndex(v => v.id === action.payload);

    if (index !== -1) {
        const vacation = newState[index];
        const isCurrentlyLiked = !!vacation.isMyLiked; // !! Making all variables into boolean

        newState[index] = {
            ...vacation,
            isMyLiked: isCurrentlyLiked ? 0 : 1,
            likesCount: (vacation.likesCount || 0) + (isCurrentlyLiked ? -1 : 1)
        };
    }
    return newState;
}


export const vacationSlice = createSlice({
    name: "vacations",
    initialState: [],
    reducers: { initVacations, addVacation, updateVacation, deleteVacation, clearVacations, toggleVacationLike }
});


export const vacationActions = vacationSlice.actions;
