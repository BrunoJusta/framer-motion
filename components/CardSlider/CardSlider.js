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
  const [limit, setLimit] = useState(0);

  const sliderRef = useRef(null);
  const slidesRef = useRef(null);

  const getTranslateX = (el) => {
    var matrix = new DOMMatrix(el.style.transform);
    return matrix.m41;
  };

  useEffect(() => {
    const slidesRefChilds = [...sliderRef.current.children];
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
  }, [windowSize]);

  const handleDrag = () => {
    if (sliderRef.current) {
      const posx = getTranslateX(sliderRef.current);

      slides.forEach((s, index) => {
        console.log("POSX" + posx);
        console.log("width" + slidesWidth * 6);
        console.log("s" + getTranslateX(s.element));
        console.log("limit" + limit);

        if (posx < -(slidesWidth * (index + 1) + -limit)) {
          console.log(getTranslateX(slides[index].element));

          if (index === 0) {
            s.element.style.transform = `translateX(${
              getTranslateX(slides[5].element) + slidesWidth * 6
            }px)`;
          } else {
            s.element.style.transform = `translateX(${getTranslateX(
              slides[index - 1].element
            )}px)`;
          }

          if (index === 5) {
            let newCount = count + 1;
            setCount(newCount);
            setLimit(posx);
          }
        }

        // if (posx + slidesWidth * 6 > slidesWidth * 6 + limit) {
        //   console.log("WOW-O-WOW");

        //   if (index === 5) {
        //     s.element.style.transform = `translateX(${
        //       getTranslateX(slides[0].element) - slidesWidth
        //     }px)`;
        //   } else {
        //     s.element.style.transform = `translateX(${
        //       getTranslateX(slides[index + 1].element) - slidesWidth
        //     }px)`;
        //   }
        //   setLimit(posx + slidesWidth * 6);

        //   if (index === 0) {
        //     let newCount = count + 1;
        //     setCount(newCount);
        //   }
        // }
      });
    }
  };
  return (
    <div className={styles.slider}>
      <motion.div
        id="wow"
        drag="x"
        onDrag={() => handleDrag()}
        onDragEnd={() => handleDrag()}
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

// import Head from "next/head";
// import { motion, useAnimation } from "framer-motion";
// import styles from "../../styles/Slider.module.scss";
// import { useState, useEffect, useRef } from "react";
// import useWindowSize from "../../hooks/Dimensions";
// import { TeamCard, TeamCardMask } from "..";

// const CardSlider = (props) => {
//   const team = [
//     {
//       id: 0,
//       name: "Delfim Carvalhosa",
//       img_black: "./black_delfas.jpg",
//       img_personal: "./personal_delfas.jpg",
//       role: "Co-founder & Business Manager ",
//     },
//     {
//       id: 1,
//       name: "Ricardo Magalhães",
//       img_black: "./black_rika.jpg",
//       img_personal: "./personal_rika.jpg",
//       role: "Co-founder & CO-CEO / CTO ",
//     },
//     {
//       id: 2,
//       name: "Ricardo Carvalho",
//       img_black: "./black_carvalho.jpg",
//       img_personal: "./personal_carvalho.jpg",
//       role: "Lead Developer",
//     },
//     {
//       id: 3,
//       name: "Bruno Justa",
//       img_black: "./black_justa.jpg",
//       img_personal: "./personal_justa.jpg",
//       role: "Front-end Developer",
//     },
//     {
//       id: 4,
//       name: "Nuno Gomes",
//       img_black: "./black_aves.jpg",
//       img_personal: "./personal_aves.jpg",
//       role: "Web Developer",
//     },
//     {
//       id: 5,
//       name: "Diogo Monteiro",
//       img_black: "./black_diogo.jpg",
//       img_personal: "./personal_diogo.jpg",
//       role: "UI Designer",
//     },
//   ];

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.items}>
//         {team.map((t, index) => {
//           return (
//             <div className={styles.item}>
//               <TeamCard
//                 black={t.img_black}
//                 name={t.name}
//                 role={t.role}
//                 key={index}
//               />
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default CardSlider;
