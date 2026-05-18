import { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import { AuthContext } from "../context/AuthContext";

import api from "../services/api";

function Dashboard() {
  const { user } = useContext(AuthContext);

  const [products, setProducts] = useState([]);

  async function fetchProducts() {
    try {
      const response = await api.get("/products?limit=4");

      setProducts(response.data.products);
    } catch (error) {
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="bg-gradient-to-r from-black to-gray-800 text-white rounded-2xl p-8 mb-8">
          <h1 className="text-4xl font-bold mb-3">
            Welcome, {user?.firstName}
          </h1>

          <p className="text-gray-300 text-lg">
            Manage products and view your profile easily.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-gray-500 mb-2">Total Products</h2>

            <p className="text-3xl font-bold">194</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-gray-500 mb-2">Categories</h2>

            <p className="text-3xl font-bold">24</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-gray-500 mb-2">User</h2>

            <p className="text-xl font-bold">{user?.username}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-gray-500 mb-2">Company</h2>

            <p className="text-xl font-bold">{user?.company?.name}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-10">
          <Link to="/products">
            <button className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition">
              View Products
            </button>
          </Link>

          <Link to="/profile">
            <button className="bg-white border border-black px-6 py-3 rounded-xl hover:bg-gray-100 transition">
              My Profile
            </button>
          </Link>
        </div>

        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Featured Products</h2>

            <Link to="/products" className="text-blue-600 font-semibold">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
              >
                <div className="h-52 bg-gray-100 flex items-center justify-center p-4">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="max-h-full object-contain"
                  />
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>

                 <p className="text-gray-500 text-sm mb-4 min-h-[60px]">
                    {item.description.slice(0, 50)}...
                  </p>
                <div className="mt-auto">
                  <Link to={`/products/${item.id}`}>
                    <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
                      View Details
                    </button>
                  </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
