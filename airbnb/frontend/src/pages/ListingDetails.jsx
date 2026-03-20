import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ListingCard from "../components/ListingCard";

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

  console.log(owner);

  if (loading) return <h2>Loading...</h2>;
  if (!listing) return <h2>Listing not found</h2>;

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
      console.log("done"); // add toaster
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Link to="/">Back to Home</Link>
      <h1>{listing.title}</h1>

      {/* <img src={listing.image} alt={listing.title} /> */}

      <p>{listing.description}</p>

      <h3>${listing.price}</h3>

      <p>Hosted by: {listing.host?.name}</p>

      {owner && (
        <section>
          <h4>Owner Actions</h4>
          <Link to={`/listing/${listing._id}/edit`}>
            <button>Edit</button>
          </Link>

          <button onClick={deleteHandler}>Delete</button>
        </section>
      )}
    </div>
  );
};

export default ListingDetails;
