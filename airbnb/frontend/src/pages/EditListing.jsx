import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ListingCard from "../components/ListingCard";

const EditListing = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    if (listing) {
      setFormData({
        title: listing.title || "",
        description: listing.description || "",
        price: listing.price || "",
      });
    }
  }, [listing]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getListing = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/listings/${id}`);
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

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const owner =
    listing && listing.host && user ? listing.host._id === user.id : false;

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/listings/${id}`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      alert("Listing updated successfully");
      navigate(`/listing/${id}`);
    } catch (err) {
      alert("Error updating listing");
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (!listing) return <h2>Listing not found</h2>;

  if (!owner) return <h2>You are not authorized to edit this listing</h2>;

  return (
    <div>
      <br />
      <Link to="/">Back to Home</Link>
      <br />
      <ListingCard listing={listing} />
      <br />
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="title"
          placeholder="Enter Title"
          onChange={inputHandler}
          value={formData.title}
        />
        <textarea
          name="description"
          placeholder="Enter Description"
          onChange={inputHandler}
          value={formData.description}
        />
        <input
          type="number"
          name="price"
          placeholder="Enter Price"
          onChange={inputHandler}
          value={formData.price}
        />
        <button type="submit">Update Listing</button>
      </form>
    </div>
  );
};

export default EditListing;
