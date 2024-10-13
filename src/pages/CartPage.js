import React from 'react';
import { FaTrashAlt } from 'react-icons/fa'; // Trash icon for remove button
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/action'; // Redux actions

const CartPage = () => {
  const cart = useSelector((state) => state.cart); 
  const dispatch = useDispatch();

  // Calculate total price of the items in the cart
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  // Calculate subtotal (same as total in this case, but you can add discounts or shipping if needed)
  const getSubtotal = () => {
    return cart.reduce((subtotal, item) => subtotal + item.price * item.quantity, 0).toFixed(2);
  };

  // Handle quantity change for cart items
  const handleQuantityChange = (itemId, quantity) => {
    if (quantity <= 0) return; // Avoid negative quantities

    // Update quantity in the Redux store
    dispatch(updateQuantity({ id: itemId, quantity }));
  };

  // Remove an item from the cart
  const handleRemoveItem = (itemId) => {
    // Remove from Redux store
    dispatch(removeFromCart({ id: itemId }));
  };

  return (
    <div className="cart-summary">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div className="cart-content">
          {/* Cart Table */}
          <table className="cart-table">
            <thead>
              <tr>
                <th></th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="cart-row">
                  <td>
                    <button onClick={() => handleRemoveItem(item.id)} className="remove-btn">
                      x
                    </button>
                  </td>
                  <td className="product-info">
                    <img src={item.images[0] || item.images[1]} alt={item.title} className="product-image" />
                    <span>{item.title}</span>
                  </td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      min="1"
                    />
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total Card */}
          <div className="cart-total-card">
            <h3>Order Summary</h3>
            <div className="subtotal">
              <p>Subtotal:</p>
              <p>${getSubtotal()}</p>
            </div>
            <div className="total">
              <p>Total:</p>
              <p>${getTotalPrice()}</p>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
