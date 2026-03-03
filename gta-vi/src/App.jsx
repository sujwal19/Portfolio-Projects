import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useState } from "react";
import "remixicon/fonts/remixicon.css";

const App = () => {
  const [showContent, setShowContent] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "power4.easeInOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  });

  useGSAP(() => {
    if (!showContent) return;

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-1",
      ease: "Expo.easeInOut",
    });

    gsap.to(".sky", {
      scale: 1.2,
      rotate: 0,
      duration: 2,
      delay: "-0.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".bg", {
      scale: 1.2,
      rotate: 0,
      duration: 2,
      delay: "-0.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".character", {
      scale: 0.8,
      x: "-50%",
      bottom: "-45%",
      rotate: 0,
      duration: 2,
      delay: "-0.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".text", {
      scale: 1,
      rotate: 0,
      x: "-50%",
      duration: 2,
      delay: "-0.8",
      ease: "Expo.easeInOut",
    });

    const main = document.querySelector(".main");
    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;

      gsap.to(".text-inner", {
        x: xMove * 1.5,
      });

      gsap.to(".sky", {
        x: xMove,
      });
      //
      gsap.to(".bg", {
        x: xMove * 1.5,
      });
      //
    });
  }, [showContent]);

  return (
    <>
      <div className="svg fixed top-0 left-0 z-20 flex h-full w-screen items-center justify-center overflow-hidden bg-black">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
      {showContent && (
        <div className="main w-full scale-[1.2] -rotate-10">
          <div className="landing relative h-screen w-full overflow-hidden bg-black">
            <div className="navbar absolute top-0 left-0 z-10 w-full px-10 py-10">
              <div className="logo flex justify-between">
                <h3 className="text-3xl leading-none text-white">Rockstar</h3>
                <div className="lines flex flex-col gap-2">
                  <div className="lines h-1.5 w-12 bg-white"></div>
                  <div className="lines h-1.5 w-8 bg-white"></div>
                  <div className="lines h-1.5 w-4 bg-white"></div>
                </div>
              </div>
            </div>
            <div className="imagesdiv relative h-screen w-full overflow-hidden">
              <img
                className="sky absolute top-0 left-0 h-full w-full scale-[1.5] -rotate-20 object-cover"
                src="./sky.png"
                alt=""
              />
              <img
                className="bg absolute top-0 left-0 h-full w-full scale-[1.7] -rotate-3 object-cover"
                src="./bg.png"
                alt=""
              />
              <div className="text absolute top-5 left-1/2 flex -translate-x-1/2 scale-[1.4] -rotate-10 flex-col gap-2 text-white">
                <div className="text-inner">
                  <h1 className="-ml-30 text-[8rem] leading-none">grand</h1>
                  <h1 className="ml-20 text-[8rem] leading-none">theft</h1>
                  <h1 className="-ml-30 text-[8rem] leading-none">auto</h1>
                </div>
              </div>
              <img
                className="character absolute -bottom-[150%] left-1/2 -translate-x-1/2 scale-[2] -rotate-20"
                src="./girlbg.png"
                alt=""
              />
            </div>
            <div className="btmbar absolute bottom-0 left-0 w-full bg-linear-to-t from-gray-900 to-transparent px-10 py-10 text-white">
              <div className="flex items-center gap-4">
                <i className="ri-arrow-down-line text-4xl"></i>
                <h3 className="font-[sans-serif] text-sm">Scroll Down</h3>
              </div>
              <img
                className="absolute top-1/2 left-1/2 h-14 -translate-x-[50%] -translate-y-[50%]"
                src="./ps5.png"
                alt=""
              />
            </div>
          </div>
          <div className="flex h-screen w-full items-center justify-center bg-black px-10">
            <div className="cntnr flex h-[80%] w-full overflow-hidden text-white">
              <div className="limg relative h-full w-1/2">
                <img
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  src="./imag.png"
                  alt=""
                />
              </div>
              <div className="rg w-[43%] py-5">
                <h1 className="text-[5rem] leading-none">Still Running,</h1>
                <h1 className="text-[5rem] leading-none">Not Hunting</h1>
                <p className="mt-10 w-[90%] font-[Sans-serif] text-[1.05rem]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                  sit et laboriosam adipisci officiis tempore, cupiditate
                  deserunt nesciunt, eius quaerat accusamus, eum reiciendis.
                </p>
                <p className="mt-3 w-[90%] font-[Sans-serif] text-[1.05rem]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. In,
                  sint voluptates assumenda dolores aperiam labore recusandae
                  dicta qui laborum tempore consequatur.
                </p>
                <p className="mt-7 w-[90%] font-[Sans-serif] text-[1.05rem]">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Culpa, non tempora, id consequatur quas vel iste vero officia,
                  tempore hic veniam.
                </p>
                <button className="mt-10 bg-yellow-500 px-9 py-5 text-2xl text-black">
                  Download Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
