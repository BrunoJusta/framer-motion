import Head from "next/head";
import { motion, useAnimation } from "framer-motion";
import styles from "../../styles/Home.module.css";
import { useState, useEffect, useRef } from "react";
import useWindowSize from "../../hooks/Dimensions";
import { TeamCard, TeamCardMask } from "..";

const CardSlider = (props) => {
  const team = [
    {
      id: 0,
      name: "Delfim Carvalhosa",
      img_black: "./black_delfas.jpg",
      img_personal: "./personal_delfas.jpg",
      role: "Co-founder & Business Manager ",
    },
    {
      id: 1,
      name: "Ricardo Magalhães",
      img_black: "./black_rika.jpg",
      img_personal: "./personal_rika.jpg",
      role: "Co-founder & CO-CEO / CTO ",
    },
    {
      id: 2,
      name: "Ricardo Carvalho",
      img_black: "./black_carvalho.jpg",
      img_personal: "./personal_carvalho.jpg",
      role: "Lead Developer",
    },
    {
      id: 3,
      name: "Bruno Justa",
      img_black: "./black_justa.jpg",
      img_personal: "./personal_justa.jpg",
      role: "Front-end Developer",
    },
    {
      id: 4,
      name: "Nuno Gomes",
      img_black: "./black_aves.jpg",
      img_personal: "./personal_aves.jpg",
      role: "Web Developer",
    },
    {
      id: 5,
      name: "Diogo Monteiro",
      img_black: "./black_diogo.jpg",
      img_personal: "./personal_diogo.jpg",
      role: "UI Designer",
    },
  ];
  const ClipRef = useRef(null);

  const control = useAnimation();
  const windowSize = useWindowSize();
  const [slides, setSlides] = useState([]);

  const [slidesWidth, setSlidesWidth] = useState(null);
  const [left, setLeft] = useState(null);
  const [count, setCount] = useState(null);

  const sliderRef = useRef(null);
  const slidesRef = useRef(null);

  const getTranslateX = (el) => {
    var matrix = new DOMMatrix(el.style.transform);
    return matrix.m41;
  };

  useEffect(() => {
    console.log("mudou");
    const slidesRefChilds = [...sliderRef.current.children];
    // setSlidesWidth(slidesRefChilds[0].getBoundingClientRect().width + 50);
    setSlidesWidth(slidesRefChilds[0].getBoundingClientRect().width + 50);

    setLeft(slidesWidth * 4);
    let tempSlides = [];
    slidesRefChilds.forEach((s, index) => {
      tempSlides.push({
        element: s,
      });
    });
    setSlides(tempSlides);
    setCount(1);
    console.log(getTranslateX(sliderRef.current));
    // sliderRef.current.style.transform = `translateX(${200}px) !important`;

    // setSlidesWidth((slidesRefChilds[0].getBoundingClientRect().width + 50) * 6);
    // let tempSlides = [];
    // slidesRefChilds.forEach((s, index) => {
    //   const posX = s.getBoundingClientRect().width + 50;
    //   tempSlides.push({
    //     x: posX,
    //     element: s,
    //   });
    // });
    // setSlides(tempSlides);
  }, [windowSize]);

  const handleDrag = () => {
    if (sliderRef.current) {
      const posx = getTranslateX(sliderRef.current);
      console.log("slider posX: " + posx);
      console.log("limite " + (-slidesWidth - 50) * count);
      console.log("count: " + count);
      slides.forEach((s, index) => {
        if (posx < -slidesWidth * (index + 1 + count) * count) {
          s.element.style.transform = `translateX(${
            slidesWidth * 6 * count
          }px)`;

          if (index === 5) {
            let newCount = count + 1;
            setCount(newCount);
          }
        }
      });
    }
  };
  return (
    <div className={styles.slider}>
      <motion.div
        id="wow"
        drag="x"
        // onDrag={() => handleDrag()}
        // onDragEnd={() => handleDrag()}
        dragConstraints={{
          right: 100,
          left: -left,
        }}
        // dragMomentum={false}
        initial={{ y: -900 }}
        animate={{
          y: 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 40 }}
        className={styles.slides}
        ref={sliderRef}
      >
        {team.map((t, index) => {
          return (
            <TeamCard
              black={t.img_black}
              name={t.name}
              role={t.role}
              key={index}
            />
          );
        })}
      </motion.div>
    </div>
  );
};

export default CardSlider;
