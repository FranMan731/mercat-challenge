import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    error: {
        status: 0,
        message: "",
    },
    loading: false,
    data: [],
    open: false,
    total: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItemsToCart: (state, { payload }) => {
            state.data = payload;
            state.total = payload.reduce((previous, current) => previous + current.price * current.cantidad, 0);
        },
        handleCart: (state, { payload }) => {
            let { action, item } = payload;
            let data = [...state.data];
            let total = state.total;
            const index = data.findIndex(x => x._id === item._id);
            const auxItem = {...item};

            if (action) {
                if(index !== -1) {
                    auxItem['cantidad'] += 1;
                    data[index] = auxItem;
                } else {
                    auxItem['cantidad'] = 1;
                    data.push(auxItem);
                }
                
                total += item.price;
            } else {
                if(item.cantidad > 1) {
                    auxItem['cantidad'] -= 1;
                    data[index] = auxItem;
                } else {
                    data = data.filter(x => x._id !== item._id);
                }
                
                total -= item.price;
            }


            localStorage.setItem("cart", JSON.stringify(data));
            state.data = [...data];
            state.total = total;
        },
        openCart: (state) => {
            state.open = !state.open;
        },
        clearCart: (state) => {
            state.data = [];
            state.total = 0;
        },
        finish: (state) => {
            state.data = [];
            state.total = 0;
        }
    },
});

export const {
    addItemsToCart,
    handleCart,
    finish,
    clearCart,
    openCart,
} = cartSlice.actions;

export const cart = (state) => state.app.cart;

const { reducer } = cartSlice;
export default reducer;