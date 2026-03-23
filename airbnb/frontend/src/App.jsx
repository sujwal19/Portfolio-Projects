import Navbar from "./components/Navbar";
import AddListing from "./pages/AddListing";
import EditListing from "./pages/EditListing";
import Home from "./pages/Home";
import ListingDetails from "./pages/ListingDetails";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="add-listing bg-[#F7F7F7]">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "8px",
          },
        }}
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add" element={<AddListing />} />
        <Route path="listing/:id" element={<ListingDetails />} />
        <Route path="listing/:id/edit" element={<EditListing />} />
      </Routes>
    </div>
  );
};

export default App;
