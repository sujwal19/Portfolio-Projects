import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
      return alert("Please fill all fields");
    }

    try {
      const url = "http://localhost:5000/api/auth/register";
      const response = await axios.post(url, signupInfo);
      toast.success("Account created!");
      setSignupInfo({ name: "", email: "", password: "" });
      navigate("/login");
    } catch (error) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-5">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold text-[#FF6B6B]">
          Signup to StayEase
        </h1>

        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            onChange={inputHandler}
            value={signupInfo.name}
            className="rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#4ECDC4] focus:outline-none"
          />

          <input
            type="text"
            name="email"
            placeholder="Enter Email"
            onChange={inputHandler}
            value={signupInfo.email}
            className="rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#4ECDC4] focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={inputHandler}
            value={signupInfo.password}
            className="rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#4ECDC4] focus:outline-none"
          />

          <button className="rounded-md bg-[#FF6B6B] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#e55b5b]">
            Signup
          </button>
        </form>
        <p className="mt-4 text-center text-gray-500">
          Already have an account?
          <Link to="/login" className="text-[#4ECDC4] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
