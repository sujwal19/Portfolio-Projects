import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ListingCard from "../components/ListingCard";
import toast from "react-hot-toast";
import { API_URL } from "../utils/config";

const EditListing = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
  });

  const [currentImage, setCurrentImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isImageRemoved, setIsImageRemoved] = useState(false);

  const fileInputRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const getListing = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/listings/${id}`);
      setListing(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getListing();
  }, [id]);

  useEffect(() => {
    if (listing) {
      setFormData({
        title: listing.title || "",
        description: listing.description || "",
        price: listing.price || "",
        image: null,
      });
      setCurrentImage(listing.image || null);
      setPreview(null);
      setIsImageRemoved(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, [listing]);

  const owner = listing?.host?._id === user?.id;

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fileHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
      setIsImageRemoved(false); // reset remove flag if new file is chosen
    }
  };

  const removeImage = () => {
    setPreview(null);
    setCurrentImage(null);
    setFormData((prev) => ({ ...prev, image: null }));
    setIsImageRemoved(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);

      if (formData.image) data.append("image", formData.image);
      if (isImageRemoved) data.append("removeImage", "true");

      await axios.put(`${API_URL}/listings/${id}`, data, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Listing updated!");
      setIsImageRemoved(false);
      navigate(`/listing/${id}`);
    } catch (err) {
      toast.error("Error updating listing");
    }
  };

  if (loading)
    return <h2 className="mt-10 text-center text-gray-500">Loading...</h2>;
  if (!listing)
    return (
      <h2 className="mt-10 text-center text-gray-500">Listing not found</h2>
    );
  if (!owner)
    return (
      <h2 className="mt-10 text-center text-gray-500">
        You are not authorized to edit this listing
      </h2>
    );
  return (
    <div className="flex min-h-screen justify-center bg-gray-100 p-5">
      <div className="flex w-full max-w-6xl flex-col gap-6 lg:flex-row">
        <div className="flex items-center justify-center lg:w-1/2">
          <div className="w-full max-w-sm">
            <ListingCard listing={listing} />
          </div>
        </div>
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-md lg:w-1/2"
        >
          <h2 className="text-2xl font-bold text-[#3B8AC4]">Edit Listing</h2>
          <input
            type="text"
            name="title"
            placeholder="Enter Title"
            onChange={inputHandler}
            value={formData.title}
            className="rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#3B8AC4] focus:outline-none"
          />
          <textarea
            name="description"
            placeholder="Enter Description"
            onChange={inputHandler}
            value={formData.description}
            className="h-24 resize-none rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#3B8AC4] focus:outline-none"
          />
          <input
            type="number"
            name="price"
            placeholder="Enter Price"
            onChange={inputHandler}
            value={formData.price}
            className="rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#3B8AC4] focus:outline-none"
          />
          <input
            type="file"
            onChange={fileHandler}
            ref={fileInputRef}
            name="image"
            accept="image/*"
            className="rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#3B8AC4] focus:outline-none"
          />
          {(preview || currentImage) && (
            <div className="relative mt-2 h-48 w-full">
              <img
                src={preview || currentImage}
                className="h-full w-full rounded-md object-cover"
                alt="Listing Preview"
              />
              <br />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white transition-colors hover:bg-red-600"
              >
                x
              </button>
            </div>
          )}
          <button
            type="submit"
            className="rounded-md bg-[#3B8AC4] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#3B8AC4]"
          >
            Update Listing
          </button>
          <Link
            to="/"
            className="mt-2 text-gray-500 transition-colors hover:text-[#3B8AC4]"
          >
            &larr; Back to Home
          </Link>
        </form>
      </div>
    </div>
  );
};

export default EditListing;
