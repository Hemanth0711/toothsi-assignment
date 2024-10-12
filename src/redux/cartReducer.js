
const cartReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD_TO_CART':
            return [...state, action.payload];
        case 'REMOVE_FROM_CART':
            return state.filter((item) => item.id !== action.payload.id);

        case 'UPDATE_QUANTITY':
            return state.map(item => {
                if(item.id === action.payload.id){
                    return {...item, quantity: action.payload.quantity}
                }
                else return item
            });
        default: 
            return state;
    }
}

export default cartReducer;