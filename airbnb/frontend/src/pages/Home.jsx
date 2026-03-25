import { useEffect, useState } from "react";
import axios from "axios";
import ListingCard from "../components/ListingCard";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { API_URL } from "../utils/config";

const Home = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const getListings = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/listings`);
      setListings(res.data.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListings();
  }, []);

  const searchSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const searchQuery = searchInput.trim();
      const res = await axios.get(`${API_URL}/listings?q=${searchQuery}`);
      setListings(res.data.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <h2 className="mt-10 text-center text-gray-500">Loading...</h2>;

  return (
    <div className="min-h-screen bg-[#F3F4F6] p-5">
      <h1 className="mb-6 text-3xl font-bold text-[#4CA3DD]">Discover Stays</h1>

      <form onSubmit={searchSubmitHandler} className="mb-8 flex max-w-md gap-2">
        <input
          type="text"
          placeholder="Search Apartment..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-1 rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#4CA3DD] focus:outline-none"
        />
        <button className="rounded-md bg-[#4CA3DD] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#3B8AC4]">
          Search
        </button>
      </form>

      {listings.length === 0 ? (
        <div className="mt-20 text-center text-[#111827]">
          No listings found 😢 Try again later.
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {listings.map((listing) => (
            <Link key={listing._id} to={`/listing/${listing._id}`}>
              <ListingCard key={listing._id} listing={listing} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
