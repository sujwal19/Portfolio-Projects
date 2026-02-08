import { FaLongArrowAltRight } from "react-icons/fa";

const Home = () => {
  return (
    <main className="hero-section main">
      <div className="container grid grid-two-cols">
        <div className="hero-content">
          <h1 className="heading-xl">
            Explore the World, One Country at a time.
          </h1>
          <p className="paragraph">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit deserunt illum ducimus, sed nam consequuntur ex.
            Saepe, quas.
          </p>
          <button className="btn btn-dark btn-inline bg-white-box">
            Start Exploring <FaLongArrowAltRight />
          </button>
        </div>
        <div className="hero-image">
          <img
            src="/public/images/world.png"
            alt="world-img"
            className="banner-image"
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
