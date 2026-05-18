import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import api from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  const limit = 6;

  async function fetchProducts() {
    try {
      setLoading(true);
      const skip = (page - 1) * limit;

      const response = await api.get(`/products?limit=${limit}&skip=${skip}`);

      setProducts(response.data.products);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

 useEffect(() => {

  fetchProducts()

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })

}, [page])
  if (loading) {
    return <h1 className="text-center mt-10 text-3xl">Loading...</h1>;
  }

  return (
    <div>
      <Navbar />

      <div className="w-full mx-auto p-4 sm:p-6">
        <h1 className="text-4xl font-bold mb-8">Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col"
            >
              <div className="h-56 bg-gray-100 flex items-center justify-center p-4">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="max-h-full object-contain hover:scale-105 transition duration-300"
                />
              </div>

              <div className="p-4 flex flex-col">
                <h2 className="text-2xl font-bold mb-2">{item.title}</h2>

                <p className="text-gray-600 mb-4 text-sm sm:text-base">
                  {item.description.slice(0, 60)}...
                </p>
                <p className="text-xl font-semibold mb-4">₹ {item.price}</p>

                <Link to={`/products/${item.id}`}>
                  <button className="w-full sm:w-auto bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-4 mt-10">

  <button
    onClick={() => setPage(page - 1)}
    disabled={page === 1}
    className="bg-black text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
  >
    Previous
  </button>

  <p className="text-xl font-semibold">
    Page {page}
  </p>

  <button
    onClick={() => setPage(page + 1)}
    className="bg-black text-white px-4 py-2 rounded-lg"
  >
    Next
  </button>

</div>
      </div>
    </div>
  );
}

export default Products;
