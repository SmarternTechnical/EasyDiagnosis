import React, { useEffect, useState } from 'react';
import { ShoppingCart, ChevronDown, ChevronUp, X } from 'lucide-react';
import ProductCard from './ProductCard'; // Import the ProductCard component
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductGrid = ({ category }) => {
  const [cart, setCart] = useState([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const handleApi = async () => {
      try {
        const { data } = await axios.post('http://127.0.0.1:8000/get-category-details', {
          service: 'medicines',
          category: category
        });
        // console.log(data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching category details:", error);
      }
    };

    handleApi();
  }, [category]);

  // Pagination logic
  const itemsPerPage = 6;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const addToCart = (product) => {
    setCart([...cart, product]);
    toast.success("Product added to cart successfully!"); // Show toast notification
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const toggleSortMenu = () => setIsSortOpen(!isSortOpen);

  const handleSortSelection = (option) => {
    setSortBy(option);
    setIsSortOpen(false); // Close the dropdown after selection
  };

  const sortingOptions = ['Relevance', 'Price: Low to High', 'Price: High to Low', 'New Arrivals'];

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="mb-4 md:mb-0">
          <h1 className="text-[#19456b] text-xl font-semibold">
            Products <span className="text-[#19456b]">- Total Items ({products.length})</span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={toggleSortMenu}
              className="flex items-center gap-2 px-4 py-2 border rounded-full text-[#19456b] border-1 border-[#19456b] "
            >
              <span>Sort by: {sortBy}</span>
              {isSortOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {/* Dropdown Menu */}
            {isSortOpen && (
              <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {sortingOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSortSelection(option)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cart Button */}
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
            <ShoppingCart className="w-5 h-5" />
            <span>VIEW CART ({cart.length})</span>
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentProducts.map((product) => (
          <ProductCard
            keyy={product.id}
            productId={product.id}
            image={product.product_image}
            category={product.category}
            name={product.product_name}
            packSize={product.packSize || "N/A"}
            mrp={product.actual_product_price}
            discountedPrice={product.discounted_price}
            cashback={product.cashback || "0.00"}
            onViewDetails={() => addToCart(product)}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 text-white bg-[#1FAB89] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-center font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-[#1FAB89] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default ProductGrid;
