import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [listings, setListings] = useState([]);

  const getListings = async () => {
    try {
      const data = await axios.get(`http://localhost:5000/api/listings`);
      setListings(data.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getListings();
  }, []);

  console.log(listings);

  return (
    <div>
      <h1>AirBnB Listings</h1>

      <div className="listing-container">
        {listings.map((listing) => (
          <div key={listing._id}>
            <h3>{listing.title}</h3>
            <p>{listing.description}</p>
            <p>${listing.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
