import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    phoneNumber: ""

}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.firstname = action.payload.firstname
            state.lastname = action.payload.lastname
            state.email = action.payload.email
            state.role = action.payload.role
            state.phoneNumber = action.payload.phoneNumber
        },
        logout: (state) => {
            state.firstname = ""
            state.lastname = ""
            state.email = ""
            state.role = ""
            state.phoneNumber = ""
        }
    },
});

export const { setUser, logout } = userSlice.actions

export default userSlice.reducer;