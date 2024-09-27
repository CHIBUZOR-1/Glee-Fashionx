import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart : (state, action) => {
            const load = action.payload;
            const findItem = state.items.find((item) => item.id === load.id && item.size === load.size);
            if(findItem) {
                findItem.totalPrice += findItem.totalPrice;
                findItem.quantity += 1
                state.totalQuantity++;
                state.totalPrice += load.totalPrice;
            } else {
                state.items.push({
                    id: load.id,
                    tag: load.tag,
                    brand: load.brand,
                    quantity: 1,
                    size: load.size,
                    price: load.price,
                    totalPrice: load.totalPrice,
                    image: load.image[0]
                });
                state.totalQuantity++
                state.totalPrice += load.totalPrice
            }
        },
        removeFromCart : (state, action)=> {
            const del = action.payload;
            state.items = state.items.filter((item) => {return item.id !== action.payload.id || item.size !== action.payload.size});
            state.totalPrice = state.totalPrice - del.totalPrice;
            state.totalQuantity = state.totalQuantity - del.quantity;
        },
        clearCart: (state) => { 
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;