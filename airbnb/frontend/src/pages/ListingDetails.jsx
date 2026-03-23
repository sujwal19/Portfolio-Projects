import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatName } from "../utils/formatName";
import toast from "react-hot-toast";

const ListingDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);

  const getListing = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/listings/${id}`);
      setListing(res.data.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListing();
  }, [id]);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const owner = listing?.host?._id === user?.id;

  const deleteHandler = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this listing?",
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/listings/${listing._id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      toast.success("Listing deleted!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  if (loading)
    return <h2 className="mt-10 text-center text-gray-500">Loading...</h2>;
  if (!listing)
    return (
      <h2 className="mt-10 text-center text-gray-500">Listing not found</h2>
    );

  return (
    <div className="flex min-h-screen justify-center bg-gray-100 p-5">
      <div className="flex w-full max-w-3xl flex-col gap-6 rounded-xl bg-white p-6 shadow-md">
        <Link
          to="/"
          className="text-gray-500 transition-colors hover:text-[#4ECDC4]"
        >
          &larr; Back to Home
        </Link>

        {listing.image && (
          <div className="relative">
            <img
              src={listing.image}
              className="h-96 w-full rounded-md object-cover"
              alt=""
            />
          </div>
        )}
        <h1 className="text-3xl font-bold text-[#FF6B6B]">{listing.title}</h1>
        <p className="text-gray-700">{listing.description}</p>
        <h3 className="text-xl font-semibold text-[#FF6B6B]">
          ${listing.price}
        </h3>
        <p className="text-gray-500">
          Hosted by: {formatName(listing.host?.name)}
        </p>

        {owner && (
          <section className="mt-4 flex gap-3">
            <Link to={`/listing/${listing._id}/edit`}>
              <button className="rounded-md bg-[#4ECDC4] px-4 py-2 font-semibold text-white transition-colors hover:bg-teal-500">
                Edit
              </button>
            </Link>
            <button
              onClick={deleteHandler}
              className="rounded-md bg-red-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-600"
            >
              Delete
            </button>
          </section>
        )}
      </div>
    </div>
  );
};

export default ListingDetails;
