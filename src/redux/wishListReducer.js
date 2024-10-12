const wishListReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD_TO_WISH_LIST':
            return [...state, action.payload];
        case 'REMOVE_FROM_WISH_LIST':
            return state.filter((item) => item.id !== action.payload.id);
        default: 
            return state;
    }
}

export default wishListReducer;