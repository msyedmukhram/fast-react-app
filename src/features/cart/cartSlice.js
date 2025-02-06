import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],

    // cart: [
    //     {
    //         pizzaId: 12,
    //         name: 'Mediterranean',
    //         quantity: 2,
    //         unitPrice: 16,
    //         totalPrice: 32
    //     }
    // ]
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => { 
            const item = action.payload;
            const existingItem = state.cart.find((i) => i.pizzaId === item.pizzaId);
            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.quantity * existingItem.unitPrice;
            } else {
                state.cart.push({
                    pizzaId: item.pizzaId,
                    name: item.name,
                    quantity: item.quantity,
                    unitPrice: item.unitPrice,
                    totalPrice: item.unitPrice * 1
                })
            }
        },
        deleteItem: (state, action) => {
            const pizzaId = action.payload;
            state.cart = state.cart.filter((i) => i.pizzaId !== pizzaId);
         },
        increaseItemQuantity: (state, action) => {
            const pizzaId = action.payload;
            const existingItem = state.cart.find((i) => i.pizzaId === pizzaId);
            // if (!existingItem) return;
            existingItem.quantity++;
            existingItem.totalPrice = existingItem.quantity * existingItem.unitPrice;
         },
        decreaseItemQuantity: (state, action) => {
            const pizzaId = action.payload;
            const existingItem = state.cart.find((i) => i.pizzaId === pizzaId);
            // if (!existingItem) return;
            if (existingItem.quantity === 1) {
                state.cart = state.cart.filter((i) => i.pizzaId !== pizzaId);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.quantity * existingItem.unitPrice;
            }
            // cartSlice.caseReducers.deleteItem(state, action);
         },
        clearCart: (state) => {
            state.cart = [];
         },

    }
})

export const { addItem,deleteItem,increaseItemQuantity,decreaseItemQuantity,clearCart  } = cartSlice.actions;
export default cartSlice.reducer;

export const getTotalCartQuantity = (state) => state.cart.cart.reduce((acc, item) => acc + item.quantity, 0)

export const getTotalCartPrice = (state) => state.cart.cart.reduce((acc, item) => acc + item.totalPrice, 0)

export const getCart = (state) => state.cart.cart;

export const getCurrentQuantityById = id=>{
    return (state) => state.cart.cart.find(item=>item.pizzaId===id)?.quantity ?? 0;
}