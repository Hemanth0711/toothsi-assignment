import {combineReducers} from 'redux';

import cartReducer from './cartReducer';
import wishListReducer from './wishListReducer';

const rootReducer = combineReducers({
    cart: cartReducer,
    wishList: wishListReducer
})

export default rootReducer;