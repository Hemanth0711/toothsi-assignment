import React, { useContext } from 'react';
import { FaTrashAlt } from 'react-icons/fa'; // Trash icon for remove button
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../redux/cartSlice'; // Redux actions

const CartSummary = () => {
    const cart = useSelector((state) => state.cart.cartItems); 
  const dispatch = useDispatch();

  // Calculate total price of the items in the cart
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  // Handle quantity change for cart items
  const handleQuantityChange = (itemId, quantity) => {
    if (quantity <= 0) return; // Avoid negative quantities

    // Update cart in the context
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: quantity } : item
      )
    );

    // Update quantity in the Redux store
    dispatch(updateQuantity({ id: itemId, quantity }));
  };

  // Remove an item from the cart
  const handleRemoveItem = (itemId) => {
    // Remove from cart in the context
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));

    // Remove from Redux store
    dispatch(removeItem({ id: itemId }));
  };

  return (
    <div className="cart-summary">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>${item.price}</td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    min="1"
                  />
                </td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button onClick={() => handleRemoveItem(item.id)}>
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {cart.length > 0 && (
        <div className="cart-total">
          <h3>Total: ${getTotalPrice()}</h3>
        </div>
      )}
    </div>
  );
};

export default CartSummary;
