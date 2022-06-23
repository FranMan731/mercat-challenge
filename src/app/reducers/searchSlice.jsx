import { v4 as uuidv4 } from 'uuid';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../../api/products";

const initialState = {
    filter: {
        search: ""
    },
    error: {
        status: 0,
        message: "",
    },
    loading: false,
    data: []
}

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setFilter: (state, { payload }) => {
            state.filter.search = payload;
            state.data = [];
        },
        setItem: (state, { payload }) => {
            //Action is if product was added or removed
            const { action, _id } = payload;
            const data = [...state.data];

            const index = data.findIndex(x => x._id === _id);
            //If action is true, then the product was added.
            if (index !== -1) {
                data[index].added = action;
            }

            state.data = [...data];
        },
        resetItems: (state) => {
            let data = [...state.data];
            
            data.forEach(x => {
                x.added = false;
            });

            state.data = [...data];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(searchProducts.pending, (state) => {
            state.loading = true;
            state.error = initialState.error;
        })
        builder.addCase(searchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.error = initialState.error;
            
            const { amiibo } = action.payload;
            state.filter.count = amiibo.length;

            const data = [];

            for (let i = 0; i < amiibo.length; i++) {
                const { 
                    name,
                    type,
                    image
                } = amiibo[i];

                data.push({
                    _id: uuidv4(),
                    name,
                    type,
                    image,
                    added: false,
                    price: Math.floor(Math.random() * 201) + 1,
                });
            }

            state.data = [...data];
        })
        builder.addCase(searchProducts.rejected, (state, { payload }) => {
            state.loading = false;

            if (payload) {
                state.error = {
                    status: payload.status,
                    message: payload.message
                };
            } else {
                state.error = {
                    status: 500,
                    message: "There was a error with the server, please retry."
                }
            }
        })
    }
});

export const {
    setFilter,
    setItem,
    resetItems
} = searchSlice.actions;

export const search = (state) => state.app.search;

export const searchProducts = createAsyncThunk(
    'searchProducts', 
    async (_, { getState, rejectWithValue }) => {
        try {
            const search = getState().app.search;
            const { filter } = search;

            const params = {
                name: filter.search
            };

            const response = await fetchProducts(params);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
});

const { reducer } = searchSlice;
export default reducer;