import { createSlice } from '@reduxjs/toolkit';
import { saveCartToLocalStorage, loadCartFromLocalStorage } from './cartUtils';

const initialState = loadCartFromLocalStorage() || {
    items: {}, // Object to store items
    totalQuantity: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Add an item to the cart
        addItemToCart(state, action) {
            const { id, quantity, size, price, name, imageUrl, shopId } = action.payload;
            const itemKey = `${id}_${size}_${shopId}`;

            if (state.items[itemKey]) {
                // If item exists, increase quantity by the new quantity
                state.items[itemKey].quantity = state.items[itemKey].quantity + quantity;
            } else {
                // If item doesn't exist, add it to the cart
                state.items[itemKey] = {
                    ...action.payload, // Add all item details from payload
                    quantity: quantity || 1,
                };
            }

            // Recalculate total quantity
            state.totalQuantity = Object.values(state.items).reduce((total, item) => total + item.quantity, 0);

            // Save the updated cart to localStorage
            saveCartToLocalStorage(state);
        },

        // Update an existing item’s quantity and price
        updateCartItem(state, action) {
            const { id, quantity, price, size, shopId } = action.payload;
            const itemKey = `${id}_${size}_${shopId}`;

            if (state.items[itemKey]) {
                state.items[itemKey] = {
                    ...state.items[itemKey],
                    quantity, // Update quantity
                    price, // Update price
                };
            }

            // Recalculate total quantity
            state.totalQuantity = Object.values(state.items).reduce((total, item) => total + item.quantity, 0);

            // Save the updated cart to localStorage
            saveCartToLocalStorage(state);
        },

        // Remove an item from the cart
        removeItemFromCart(state, action) {
            const { id, size, shopId } = action.payload;
            const itemKey = `${id}_${size}_${shopId}`;

            if (state.items[itemKey]) {
                const item = state.items[itemKey];
                state.totalQuantity -= item.quantity; // Subtract quantity from total
                delete state.items[itemKey]; // Remove item from cart
            }

            // Save the updated cart to localStorage
            saveCartToLocalStorage(state);
        },

        // Increment an item’s quantity
        incrementItemQuantity(state, action) {
            const { id, size, shopId } = action.payload;
            const itemKey = `${id}_${size}_${shopId}`;

            if (state.items[itemKey]) {
                state.items[itemKey] = {
                    ...state.items[itemKey],
                    quantity: state.items[itemKey].quantity + 1, // Increment quantity
                };
                state.totalQuantity += 1; // Increase total quantity
            }

            // Save the updated cart to localStorage
            saveCartToLocalStorage(state);
        },

        // Decrement an item’s quantity
        decrementItemQuantity(state, action) {
            const { id, size, shopId } = action.payload;
            const itemKey = `${id}_${size}_${shopId}`;

            if (state.items[itemKey]) {
                const item = state.items[itemKey];
                if (item.quantity > 1) {
                    // Decrement quantity but don't go below 1
                    state.items[itemKey] = {
                        ...state.items[itemKey],
                        quantity: item.quantity - 1,
                    };
                    state.totalQuantity -= 1; // Decrease total quantity
                } else {
                    // Remove item if quantity reaches 0
                    delete state.items[itemKey];
                    state.totalQuantity -= 1;
                }
            }

            // Save the updated cart to localStorage
            saveCartToLocalStorage(state);
        },

        // Clear all items in the cart
        clearCart(state) {
            state.items = {};
            state.totalQuantity = 0;
            saveCartToLocalStorage(state); // Save the cleared cart to localStorage
        },
    },
});

export const {
    addItemToCart,
    updateCartItem,
    removeItemFromCart,
    incrementItemQuantity,
    decrementItemQuantity,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
