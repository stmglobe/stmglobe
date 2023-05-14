import Logo from "components/Logo";
import ImageSlider from "react-simple-image-slider";
import "../styles/home.css";
import { useEffect, useState } from "react";
import logo from "../images/Text-logo-removebg-preview.png";

export default function Home() {
  const images = [
    {
      url: "https://firebasestorage.googleapis.com/v0/b/stmglobe-2bfdd.appspot.com/o/images%2Fhome%2F1.jpg?alt=media",
    },
    {
      url: "https://firebasestorage.googleapis.com/v0/b/stmglobe-2bfdd.appspot.com/o/images%2Fhome%2F2.jpg?alt=media",
    },
    {
      url: "https://firebasestorage.googleapis.com/v0/b/stmglobe-2bfdd.appspot.com/o/images%2Fhome%2F3.jpg?alt=media",
    },
    {
      url: "https://firebasestorage.googleapis.com/v0/b/stmglobe-2bfdd.appspot.com/o/images%2Fhome%2F4.jpg?alt=media",
    },
    {
      url: "https://firebasestorage.googleapis.com/v0/b/stmglobe-2bfdd.appspot.com/o/images%2Fhome%2F5.jpg?alt=media",
    },
  ];

  const [sliderDimensions, setSliderDimensions] = useState({});

  useEffect(() => {
    const parentElem = document.querySelector(".image-slider");
    if (parentElem) {
      setSliderDimensions({
        width: parentElem.parentElement.offsetWidth,
        height: parentElem.parentElement.offsetWidth * 0.6,
      });
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const parentElem = document.querySelector(".image-slider");
      if (parentElem) {
        setSliderDimensions({
          width: parentElem.parentElement.offsetWidth,
          height: parentElem.parentElement.offsetWidth * 0.6,
        });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="home">
      <div className="logo-container">
        <Logo size="140px" id="main-logo" color="#1a4324" />
        <img src={logo} alt="St. Mary's Globe" id="main-text-logo" />
        <div className="logo-border"></div>
        <span className="logo-description">
          St. Mary's International Community
        </span>
      </div>
      <div className="image-slider">
        {sliderDimensions.width && (
          <ImageSlider
            width={`${sliderDimensions.width}px`}
            height={`${sliderDimensions.height}px`}
            images={images}
            autoPlay={false}
            showBullets={true}
            showNavs={true}
            navStyle={2}
            navSize={65}
            bgColor="transparent"
          />
        )}
      </div>
    </main>
  );
}
