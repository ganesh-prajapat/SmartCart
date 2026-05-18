import { useEffect, useState } from "react"

import { useParams } from "react-router-dom"

import Navbar from "../components/Navbar"

import api from "../services/api"

function ProductDetail() {

  const { id } = useParams()

  const [product, setProduct] = useState(null)

  const [loading, setLoading] = useState(false)

  async function fetchSingleProduct() {

    try {

      setLoading(true)

      const response = await api.get(`/products/${id}`)

      setProduct(response.data)

      setLoading(false)

    }

    catch (error) {
     setLoading(false)

    }

  }

  useEffect(() => {

    fetchSingleProduct()

  }, [])

  if (loading) {
    return (
      <h1 className="text-3xl text-center mt-10">
        Loading...
      </h1>
    )
  }

  return (

    <div>

      <Navbar />

      <div className="max-w-7xl mx-auto p-4 sm:p-8">

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-10 p-6">

          <div className="bg-gray-100 rounded-xl flex items-center justify-center p-6">

            <img
              src={product?.thumbnail}
              alt={product?.title}
              className="object-contain hover:scale-105 transition duration-300"
            />

          </div>

          <div>

            <span className="bg-black text-white px-4 py-2 rounded-full text-sm">

              {product?.category}

            </span>

            <h1 className="text-4xl font-bold mt-6 mb-4">

              {product?.title}

            </h1>

            <p className="text-gray-600 text-lg mb-6">

              {product?.description}

            </p>

            <h2 className="text-3xl font-bold mb-6">

              ₹ {product?.price}

            </h2>

            <div className="space-y-4 text-lg">

              <p>

                <span className="font-bold">
                  Brand:
                </span>{" "}

                {product?.brand}

              </p>

              <p>

                <span className="font-bold">
                  Rating:
                </span>{" "}

                ⭐ {product?.rating}

              </p>

              <p>

                <span className="font-bold">
                  Stock:
                </span>{" "}

                {product?.stock}

              </p>

              <p>

                <span className="font-bold">
                  Warranty:
                </span>{" "}

                {product?.warrantyInformation}

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  )

}

export default ProductDetail