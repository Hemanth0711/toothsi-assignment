import React, { createContext, useState, useEffect, useContext } from 'react';

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products if not already loaded
    if (products.length === 0) {
      fetch('https://api.escuelajs.co/api/v1/products')
        .then((res) => res.json())
        .then((data) => {
          const updatedProducts = data.map(item => ({
            ...item,
            quantity: item.quantity || 0, // Set default quantity
            selected: item.selected || false, // Set default selected state
            color: 'blue', // No color field in this API, using a default value
            size: 'Medium',
            inStock: item.stock > 0 ? 'Yes' : 'No', // Use stock to determine availability
            category: item.category?.name || 'Others', // Use nested category name
          }));
          setProducts(updatedProducts);
        });
    }
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
