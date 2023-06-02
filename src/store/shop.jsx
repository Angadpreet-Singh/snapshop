import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentShop: {
        shopName:"",
        shopId:""
    }
}
const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        login: (state, action) => {
            state.currentShop = action.payload
        },
        logout: (state) => {
            state.currentShop = initialState.currentShop
        }
    }
})

export const { login, logout } = shopSlice.actions;

export default shopSlice;