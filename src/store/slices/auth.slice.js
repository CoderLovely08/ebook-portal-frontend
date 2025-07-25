import { USER_TYPES } from "@/utils/app.constants";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        clearUser(state) {
            state.user = null;
            localStorage.removeItem("user");
        },
    },
});

export const { setUser, clearUser } = authSlice.actions;
export const selectUser = (state) => state?.auth?.user;
export const selectIsAdmin = (state) =>
    state?.auth?.user?.userType?.name === USER_TYPES.ADMIN;
export default authSlice.reducer;
