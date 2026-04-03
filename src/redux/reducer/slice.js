import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAdmin: JSON.parse(localStorage.getItem("fin_is_admin") ?? "false"),
};

const slice = createSlice({
    name: "adminCheck",
    initialState,
    reducers: {
        setIsAdmin: (state, action) => {
            state.isAdmin = action.payload;
        },
    },
});

export default slice;
export const { setIsAdmin } = slice.actions;
