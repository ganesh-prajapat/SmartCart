import { Link, useNavigate } from "react-router-dom"

import { useContext } from "react"

import { AuthContext } from "../context/AuthContext"

import { toast } from "react-toastify"

function Navbar() {

  const { user, logout } = useContext(AuthContext)

  const navigate = useNavigate()

  function handleLogout() {

  logout()

  toast.success("Logout Successful")

  navigate("/")

}

  return (

  <div className="bg-black text-white px-4 py-4">

    <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-4">

      <h1 className="text-2xl font-bold text-center md:text-left">
        Smart Cart
      </h1>

      <div className="flex flex-wrap justify-center items-center gap-3">

  <Link
    to="/dashboard"
    className="hover:bg-gray-800 px-4 py-2 rounded-lg transition"
  >
    Dashboard
  </Link>

  <Link
    to="/products"
    className="hover:bg-gray-800 px-4 py-2 rounded-lg transition"
  >
    Products
  </Link>

  <Link
    to="/profile"
    className="hover:bg-gray-800 px-4 py-2 rounded-lg transition"
  >
    Profile
  </Link>

  <div className="flex items-center gap-3 bg-gray-800 px-4 py-2 rounded-xl">

    <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center font-bold text-white">

      {user?.firstName?.charAt(0)}

    </div>

    <div className="text-left">
      <p className="font-semibold">
        {user?.firstName}
      </p>

    </div>

  </div>

  <button
    onClick={handleLogout}
    className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition"
  >
    Logout
  </button>

</div>

    </div>

  </div>

)

}

export default Navbar