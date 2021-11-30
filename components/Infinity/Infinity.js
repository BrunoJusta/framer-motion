import Head from "next/head";
import { motion, useAnimation } from "framer-motion";
import styles from "../../styles/Home.module.css";
import { useState, useEffect, useRef } from "react";
import useWindowSize from "../../hooks/Dimensions";
import { TeamCard, TeamCardMask } from "..";

const Infinity = (props) => {
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
  const sliderRef = useRef();
  const [slides, setSlides] = useState([]);

  const [slidesWidth, setSlidesWidth] = useState(null);
  const [count, setCount] = useState(null);
  const [limit, setLimit] = useState(0);

  const getTranslateX = (el) => {
    var matrix = new DOMMatrix(el.style.transform);
    return matrix.m41;
  };

  useEffect(() => {
    const slidesRefChilds = [...sliderRef.current.children];
    setSlidesWidth(slidesRefChilds[0].getBoundingClientRect().width + 50);

    let tempSlides = [];
    slidesRefChilds.forEach((s, index) => {
      tempSlides.push({
        element: s,
      });
    });
    setSlides(tempSlides);
  }, []);

  //   const handleDrag = () => {
  //     if (posx < -(slidesWidth + 100)) {
  //       console.log("yay");
  //       sliderRef.current.addEventListener("transitionend", function () {
  //         sliderRef.current.appendChild(sliderRef.current.firstElementChild);
  //         sliderRef.current.style.transition = "none";
  //         sliderRef.current.style.transform = "translateX(0)";
  //       });
  //     }
  //     // setInterval(() => {
  //     //   sliderRef.current.style.transform = "translateX(-10%)";
  //     // }, 3000);
  //     // sliderRef.current.addEventListener("transitionend", function () {
  //     //   sliderRef.current.appendChild(sliderRef.current.firstElementChild);
  //     //   sliderRef.current.style.transition = "none";
  //     //   sliderRef.current.style.transform = "translateX(0)";
  //     //   setTimeout(() => {
  //     //     sliderRef.current.style.transition = "all 600ms ease-in-out";
  //     //   });
  //     // });
  //   };

  useEffect(() => {
    setInterval(() => {
      sliderRef.current.style.transform = `translateX(${-slidesWidth - 100}px)`;
      const posx = getTranslateX(sliderRef.current);
      if (posx < -slidesWidth) {
        console.log("yay");
        sliderRef.current.addEventListener("transitionend", function () {
          sliderRef.current.appendChild(sliderRef.current.firstElementChild);
          sliderRef.current.style.transition = "none";
          sliderRef.current.style.transform = "translateX(0)";
          setTimeout(() => {
            sliderRef.current.style.transition = "all 600ms ease-in-out";
          });
        });
      }
    }, 3000);
  }, []);

  return (
    <div className="our-clients">
      <div className="container">
        <div
          //   drag="x"
          //   onDrag={() => handleDrag()}
          id="client-slider"
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
        </div>
      </div>
      {/* <motion.div
        id="wow"
        drag="x"
        dragConstraints={{
          right: 0,
          // left: -left,
        }}
        dragMomentum={false}
        initial={{ y: -900 }}
        animate={{
          y: 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 40 }}
        className={styles.slides}
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
      </motion.div> */}
    </div>
  );
};

export default Infinity;
