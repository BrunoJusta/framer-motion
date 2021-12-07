import Head from "next/head";
import { animate, motion, useAnimation } from "framer-motion";
import styles from "../styles/Home.module.css";
import Slider from "../components/Slider";
import { useState, useEffect, useRef } from "react";
import {
  CardSlider,
  ImageZoom,
  Infinity,
  Loader,
  ScrollSnap,
  TeamCard,
  TeamGrid,
} from "../components";
import useWindowSize from "../hooks/Dimensions";
export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const control = useAnimation();
  const windowSize = useWindowSize();
  const mainref = useRef();

  const handleClick = () => {
    console.log(slides);
    slides.forEach((s, index) => {
      const previousX = getTranslateX(s.element);
      console.log(s.element.getBoundingClientRect().width);
      console.log(previousX);
      if (s.x <= 200) {
        s.element.style.transform = `translate3d(1600px ,0px, 0px)`;
      }
    });
  };

  const settings = {
    width: 350,
    height: 360,
    marginRight: 10,
  };

  return (
    <div className="page">
      <Slider {...settings}>
        <div className="item" style={{ ...settings }}>
          <TeamCard
            black={"./black_justa.jpg"}
            name={"Bruno Justa"}
            role={"Front-end Developer"}
          />
        </div>
        <div className="item" style={{ ...settings }}>
          <TeamCard
            black={"./black_justa.jpg"}
            name={"Bruno Justa"}
            role={"Front-end Developer"}
          />
        </div>
        <div className="item" style={{ ...settings }}>
          <TeamCard
            black={"./black_justa.jpg"}
            name={"Bruno Justa"}
            role={"Front-end Developer"}
          />
        </div>
        <div className="item" style={{ ...settings }}>
          <TeamCard
            black={"./black_justa.jpg"}
            name={"Bruno Justa"}
            role={"Front-end Developer"}
          />
        </div>
        <div className="item" style={{ ...settings }}>
          <TeamCard
            black={"./black_justa.jpg"}
            name={"Bruno Justa"}
            role={"Front-end Developer"}
          />
        </div>
        <div className="item" style={{ ...settings }}>
          <TeamCard
            black={"./black_justa.jpg"}
            name={"Bruno Justa"}
            role={"Front-end Developer"}
          />
        </div>
      </Slider>
    </div>
  );
}
