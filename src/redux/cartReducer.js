const cartReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD_TO_CART':
            // Check if the product is already in the cart
            const existingProductIndex = state.findIndex(item => item.id === action.payload.id);

            if(existingProductIndex !== -1) {
                // Product is already in the cart, update its quantity
                return state.map(item => 
                    item.id === action.payload.id 
                    ? action.payload 
                    : item
                );
            } else {
                // Product not in the cart, add it
                return [...state, action.payload];
            }

        case 'REMOVE_FROM_CART':
            return state.filter((item) => item.id !== action.payload.id);

        case 'UPDATE_QUANTITY':
            return state.map(item => {
                if(item.id === action.payload.id){
                    return {...item, quantity: action.payload.quantity};
                }
                return item;
            });

        default: 
            return state;
    }
}

export default cartReducer;
