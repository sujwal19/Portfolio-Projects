import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="shadow-soft flex items-center justify-between bg-gray-100 px-6 py-5">
      <div className="logo">
        <Link to="/" className="text-2xl font-bold text-[#FF6B6B]">
          🏠 StayEase
        </Link>
      </div>
      <div className="flex items-center gap-10">
        <Link
          to="/"
          className="font-semibold text-[#1A1A1A] hover:text-[#FF6B6B]"
        >
          Home
        </Link>
        <Link
          to="/login"
          className="font-semibold text-[#1A1A1A] hover:text-[#FF6B6B]"
        >
          Login
        </Link>
        <Link
          to="/add"
          className="font-semibold text-[#1A1A1A] hover:text-[#FF6B6B]"
        >
          Add
        </Link>
        <Link
          to="/login"
          className="rounded-md px-4 py-2 font-semibold transition-colors"
          style={{ backgroundColor: "#FF6B6B", color: "#FFFFFF" }} // Primary Coral + white text
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="rounded-md px-4 py-2 font-semibold transition-colors"
          style={{ backgroundColor: "#FF6B6B", color: "#FFFFFF" }} // Primary Coral + white text
        >
          Signup
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
