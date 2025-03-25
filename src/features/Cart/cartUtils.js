const saveCartToLocalStorage = (cart) => {
    try {
        // Check if localStorage is available
        if (typeof window !== "undefined" && window.localStorage) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    } catch (error) {
        console.error('Error saving cart to localStorage:', error);
    }
};

const loadCartFromLocalStorage = () => {
    try {
        // Check if localStorage is available
        if (typeof window !== "undefined" && window.localStorage) {
            const cartData = localStorage.getItem('cart');
            return cartData ? JSON.parse(cartData) : { items: {}, totalQuantity: 0 };
        }
    } catch (error) {
        console.error('Error loading cart from localStorage:', error);
    }
    return { items: {}, totalQuantity: 0 }; // Return default value if there's an error
};

export { saveCartToLocalStorage, loadCartFromLocalStorage };
