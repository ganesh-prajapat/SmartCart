import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, []);
  const { login, token } = useContext(AuthContext);

  async function handleLogin() {
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      setLoading(true);

      const usersResponse = await api.get("/users");

      const matchedUser = usersResponse.data.users.find(
        (item) => item.email === email,
      );

      if (!matchedUser) {
        toast.error("Email not found");

        setLoading(false);

        return;
      }

      const response = await api.post("/auth/login", {
        username: matchedUser.username,
        password: password,
      });

      const userResponse = await api.get(`/users/${response.data.id}`);

      login(userResponse.data, response.data.accessToken);

      setLoading(false);

      toast.success("Login Successful");
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      toast.error("Invalid Credentials");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-black"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-black"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition duration-300 active:scale-90"
        >
          {loading ? "Loading..." : "Login"}
        </button>
        <div className="bg-gray-100 p-4 rounded-lg mb-4 text-sm">
          <p>Email: emily.johnson@x.dummyjson.com</p>
          <p>Password: emilyspass</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
