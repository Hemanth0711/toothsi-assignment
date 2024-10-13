import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/action';
import { useProductContext } from '../context/ProductContext';
import { FaCartPlus } from 'react-icons/fa'; // Import cart icon from react-icons

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const { setProducts } = useProductContext();
  const cart = useSelector((state) => state.cart);

  // Initialize quantity from global state (if exists), otherwise default to 1
  const [quantity, setQuantity] = useState(product.quantity || 1);
  const [selected, setSelected] = useState(false); // Track if product is selected

  // Check if the product is already in the cart and set the 'selected' state accordingly
  useEffect(() => {
    const isInCart = cart.find((item) => item.id === product.id);
    if (isInCart) {
      setSelected(true); // If the product is already in the cart, set it as selected
    }
  }, [cart, product.id]);

  // Handle updating the quantity in the global products state
  const handleQuantity = () => {
    setProducts((prevProducts) =>
      prevProducts.map((item) =>
        item.id === product.id ? { ...item, quantity: quantity } : item
      )
    );
  };

  useEffect(handleQuantity, [quantity]);

  // Toggle product selection and add/remove from cart
  const handleSelected = () => {
    const isInCart = cart.find((item) => item.id === product.id);
    
    if (isInCart) {
      dispatch(removeFromCart(product));
      setSelected(false); // Unselect when removed from cart
    } else {
      dispatch(addToCart({ ...product, quantity }));
      setSelected(true); // Select when added to cart
    }
  };

  return (
    <tr>
      <td>
        <img src={product.images[0] || product.images[1]} alt={product.title} width="50" height="50" />
      </td>
      <td>{product.title}</td>
      <td>{product.color || 'N/A'}</td>
      <td>{product.inStock ? 'Yes' : 'No'}</td>
      <td>${product.price}</td>
      <td>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))} // Make sure to convert to number
          min="1"
          max={product.inStock ? product.inStock : 10}
        />
        {selected && <FaCartPlus style={{ marginLeft: '10px', color: 'green' }} />}
      </td>
      <td>
        <input
          type="checkbox"
          checked={selected}
          onChange={handleSelected}  
        />
      </td>
    </tr>
  );
};

export default ProductItem;
