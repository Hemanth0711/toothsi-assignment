import React, { useState, useEffect } from 'react';
import { useProductContext } from '../context/ProductContext';
import ProductItem from './ProductItem';
import { FaSortUp, FaSortDown, FaSearch, FaRedoAlt, FaShoppingCart } from 'react-icons/fa';

const ProductList = () => {
  const { products, setProducts } = useProductContext();
  const [sortConfig, setSortConfig] = useState({ key: 'title', direction: 'ascending' });
  const [searchTerm, setSearchTerm] = useState(''); // For search box
  const [category, setCategory] = useState(''); // For category filter
  const [size, setSize] = useState('');

  // Handle filtering by category or search term
  const filteredProducts = products.filter((product) => {
    return (
      (category === '' || product.category === category) &&  // Fixed category check
      (size === '' || product.size === size) &&  // Fixed size check
      (searchTerm === '' || product.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Sorting function
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedProducts = [...filteredProducts].sort((a, b) => {
      const aValue = a[key] !== undefined ? a[key] : ''; // Handle undefined values
      const bValue = b[key] !== undefined ? b[key] : ''; // Handle undefined values

      if (aValue < bValue) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setProducts(sortedProducts);
    setSortConfig({ key, direction });
  };

  const handleReset = () => {
    setCategory('');
    setSearchTerm('');
    setSize('');
    setProducts(products); // Reset filters
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />;
    } else {
      return <FaSortUp style={{ opacity: 0.5 }} />;
    }
  };

  return (
    <div className="table-wrapper">
      <div className="table-filters">
        <div className="left">
          {/* Category Dropdown */}
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Baby clothes">Clothes</option>
            <option value="Shoes">Shoes</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Others">Others</option>
          </select>

            {/* Size Dropdown */}
          <select value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="">All Sizes</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>

          {/* Reset Button */}
          <button className="reset-btn" onClick={handleReset}>
            <FaRedoAlt style={{ marginRight: '5px' }} />
            Reset
          </button>
        </div>

        <div className="right">
          {/* Search Box */}
          <div className="search-box">
            <FaSearch style={{ marginRight: '5px' }} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Cart Button */}
          <button className="cart-btn" onClick={() => window.location.href = '/cart'}>
            <FaShoppingCart style={{ marginRight: '5px' }} />
            Go to Cart
          </button>
        </div>
      </div>

      {/* Product Table */}
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>
              Name
              <span 
                style={{ marginLeft: '10px', cursor: 'pointer' }} 
                onClick={() => handleSort('title')}
              >
                {getSortIcon('title')}
              </span>
            </th>
            <th>
              Color
              <span 
                style={{ marginLeft: '10px', cursor: 'pointer' }} 
                onClick={() => handleSort('color')}
              >
                {getSortIcon('color')}
              </span>
            </th>
            <th>
              In Stock
              <span 
                style={{ marginLeft: '10px', cursor: 'pointer' }} 
                onClick={() => handleSort('inStock')}
              >
                {getSortIcon('inStock')}
              </span>
            </th>
            <th>
              Price
              <span 
                style={{ marginLeft: '10px', cursor: 'pointer' }} 
                onClick={() => handleSort('price')}
              >
                {getSortIcon('price')}
              </span>
            </th>
            <th>Quantity</th>
            <th>Buy</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
