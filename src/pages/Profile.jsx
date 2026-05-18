import { useContext } from "react"

import Navbar from "../components/Navbar"

import { AuthContext } from "../context/AuthContext"

function Profile() {

  const { user } = useContext(AuthContext)

  return (

    <div>

      <Navbar />

      <div className="flex justify-center mt-10 px-4">

        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

          <img
            src={user?.image}
            alt="user"
            className="w-32 h-32 rounded-full mx-auto mb-6"
          />

          <h1 className="text-3xl font-bold text-center mb-6">
            My Profile
          </h1>

          <div className="space-y-4">

            <p>
              <span className="font-bold">
                Name:
              </span>{" "}
              {user?.firstName} {user?.lastName}
            </p>

            <p>
              <span className="font-bold">
                Email:
              </span>{" "}
              {user?.email}
            </p>

            <p>
              <span className="font-bold">
                Phone:
              </span>{" "}
              {user?.phone}
            </p>

            <p>
              <span className="font-bold">
                Username:
              </span>{" "}
              {user?.username}
            </p>

            <p>
              <span className="font-bold">
                Company:
              </span>{" "}
              {user?.company?.name}
            </p>

          </div>

        </div>

      </div>

    </div>

  )

}

export default Profile