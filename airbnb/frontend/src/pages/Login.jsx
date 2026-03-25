import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_URL } from "../utils/config";

const Login = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = loginInfo;

    if (!email || !password) {
      return console.log("Bad Field");
    }

    try {
      const url = `${API_URL}/auth/login`;
      const response = await axios.post(url, loginInfo);
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-5">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold text-[#4CA3DD]">
          Login to StayEase
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            name="email"
            placeholder="Enter Email"
            onChange={inputHandler}
            value={loginInfo.email}
            className="rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#4CA3DD] focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={inputHandler}
            value={loginInfo.password}
            className="rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#4CA3DD] focus:outline-none"
          />
          <button className="rounded-md bg-[#4CA3DD] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#3B8AC4]">
            Login
          </button>
        </form>
        <div className="mt-4 text-center text-gray-500">
          <Link to="/" className="transition-colors hover:text-[#3B8AC4]">
            &larr; Back to Home
          </Link>
        </div>
        <p className="mt-4 text-center text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#4CA3DD] hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
