import { useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const server = "http://localhost:5000/api/listings";

const AddListing = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  const fileInputRef = useRef(null);

  const fileHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const removeFile = () => {
    setPreview(null);
    setFormData((prev) => ({ ...prev, image: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You must be logged in to add listing");
        return;
      }

      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);

      if (formData.image) {
        data.append("image", formData.image);
      }

      const res = await axios.post(server, data, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Listing Added!");
      setFormData({ title: "", description: "", price: "", image: "" });
      setPreview(null);
      navigate(`listing/${res.data.data._id}`);
    } catch (err) {
      toast.success("Error Adding Listing!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-5">
      <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-[#FF6B6B]">
          Add New Listing
        </h1>
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            placeholder="Enter Title"
            onChange={inputHandler}
            value={formData.title}
            className="rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#4ECDC4] focus:outline-none"
          />
          <textarea
            name="description"
            placeholder="Enter Description"
            onChange={inputHandler}
            value={formData.description}
            className="h-24 resize-none rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#4ECDC4] focus:outline-none"
          />
          <input
            type="number"
            name="price"
            placeholder="Enter Price"
            onChange={inputHandler}
            value={formData.price}
            className="rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#4ECDC4] focus:outline-none"
          />
          <input
            type="file"
            onChange={fileHandler}
            ref={fileInputRef}
            name="image"
            accept="image/*"
            className="rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#4ECDC4] focus:outline-none"
          />
          <button className="rounded-md bg-[#FF6B6B] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#e55b5b]">
            Add Listing
          </button>
          {preview && (
            <div className="relative mt-4 flex justify-center">
              <img
                src={preview}
                className="h-48 w-full rounded-md object-cover"
                alt={formData.title || "preview"}
              />
              <button
                type="button"
                onClick={removeFile}
                className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded bg-red-500 text-sm font-bold text-white transition-colors hover:bg-red-600"
              >
                ×
              </button>
            </div>
          )}
        </form>

        <div className="mt-4 text-center">
          <Link
            to="/"
            className="text-gray-500 transition-colors hover:text-[#4ECDC4]"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddListing;
