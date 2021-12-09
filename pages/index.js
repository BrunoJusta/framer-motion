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

  return (
    <div className="page">
      <h1 className="title">willbe Slider</h1>
      <Slider
        width={450}
        height={600}
        margin={0}
        useControls={true}
        isTouchable={true}
        isDraggable={true}
        isFull={false}
      >
        <div>
          <div class="card">
            <div class="bg"></div>
            <div class="img"></div>
            <div class="text ricatxt">Ricardo, Co-Founder & CTO</div>
          </div>
        </div>
        <div>
          <div class="card">
            <div class="bg"></div>
            <div class="img delfas"></div>
            <div class="text delfastxt">Delfim, Co-Founder & CCO</div>
          </div>
        </div>
        <div>
          <div class="card">
            <div class="bg"></div>
            <div class="img"></div>
            <div class="text ricatxt">Ricardo, Co-Founder & CTO</div>
          </div>
        </div>
        <div>
          <div class="card">
            <div class="bg"></div>
            <div class="img delfas"></div>
            <div class="text delfastxt">Delfim, Co-Founder & CCO</div>
          </div>
        </div>
        <div>
          <div class="card">
            <div class="bg"></div>
            <div class="img"></div>
            <div class="text ricatxt">Ricardo, Co-Founder & CTO</div>
          </div>
        </div>
        <div>
          <div class="card">
            <div class="bg"></div>
            <div class="img delfas"></div>
            <div class="text delfastxt">Delfim, Co-Founder & CCO</div>
          </div>
        </div>
      </Slider>
    </div>
  );
}
