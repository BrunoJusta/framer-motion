import { useState, useEffect, useRef } from "react";
import { TeamCard } from "..";
import styles from "../../styles/Infinity.module.scss";

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
  const innerRef = useRef();
  const [slides, setSlides] = useState([]);
  const [count, setCount] = useState([]);
  const [slidesWidth, setSlidesWidth] = useState(null);
  const [prevent, setPrevent] = useState(false);

  useEffect(() => {
    const innerSlider = innerRef.current;
    const slidesRefChilds = [...innerSlider.children];
    setSlidesWidth(slidesRefChilds[0].getBoundingClientRect().width);
    let tempSlides = [];
    slidesRefChilds.forEach((s, index) => {
      tempSlides.push({
        element: s,
        posX: s.getBoundingClientRect().x,
      });
    });
    setSlides([...tempSlides]);
    setCount(tempSlides.length);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    const innerSlider = innerRef.current;

    if (!prevent && slides.length > 0) {
      setPrevent(true);
      let pressed = false;
      let startx;
      let x;

      slider.onmousedown = function (e) {
        pressed = true;
        startx = e.offsetX - innerSlider.offsetLeft;
        slider.style.cursor = "grabbing";
        // initialMousePos = e.offsetX;
      };

      slider.onmouseenter = function (e) {
        slider.style.cursor = "grab";
      };

      slider.onmouseup = function (e) {
        slider.style.cursor = "grab";
        let dir = e.movementX > 0 ? 1 : e.movementX < 0 ? -1 : 0;

        snap(dir);
        // slides.forEach((s, index) => {
        //   let slide = s.element;
        //   slide.firstChild.style.transition =
        //     "transform 200ms cubic-bezier(0,533.33,1,533.33);";
        //   slide.firstChild.style.transform = "skewX(0deg)";
        // });
      };

      slider.onmousemove = function (e) {
        if (!pressed) return;
        e.preventDefault();
        let dir = e.movementX > 0 ? 1 : e.movementX < 0 ? -1 : 0;
        // let dir = e.movementX;
        x = e.offsetX;
        innerSlider.style.left = `${x - startx}px`;
        checkBoundary(dir);
      };

      window.addEventListener("mouseup", () => {
        pressed = false;
      });

      slider.addEventListener(
        "touchstart",
        (e) => {
          pressed = true;
          startx = e.touches[0].clientX - innerSlider.offsetLeft;
          slider.style.cursor = "grabbing";
        },
        false
      );

      slider.addEventListener(
        "touchend",
        (e) => {
          let dir = e.movementX > 0 ? 1 : e.movementX < 0 ? -1 : 0;
          snap(dir);
        },
        false
      );

      slider.addEventListener(
        "touchmove",
        (e) => {
          if (!pressed) return;
          console.log("rei");
          e.preventDefault();
          // let dir = e.movementX > 0 ? 5 : e.movementX < 0 ? -5 : 0;
          x = e.touches[0].clientX;
          innerSlider.style.left = `${x - startx}px`;
          checkBoundaryMobile();
        },
        false
      );
    }
  }, [slides]);

  const snap = (dir) => {
    const innerSlider = innerRef.current;
    let innerLeft = innerSlider.style.left;
    let yikes = Number(innerLeft.substring(0, innerLeft.length - 2));
    console.log(dir);
    slides.forEach((s, index) => {
      let slide = s.element;
      let position = slide.getBoundingClientRect().x;
      let direction = Math.sign(position);
      if (position > 0 && position < 200) {
        if (index != 0) {
          console.log("must snap");
          innerSlider.style.left = `${yikes - 100}px`;
        }
      }
    });
  };

  const checkBoundary = (dir) => {
    const innerSlider = innerRef.current;
    slides.forEach((s, index) => {
      let slide = s.element;
      let position = slide.getBoundingClientRect().x;
      let direction = Math.sign(position);
      // slide.firstChild.style.transition =
      //   "transform 200ms cubic-bezier(0,533.33,1,533.33);";
      // slide.firstChild.style.transform = `skewX(${dir}deg)`;

      if (position < -slidesWidth + 10 && direction === -1) {
        slide.style.transform = `translateX(${slidesWidth * count}px)`;
        if (index === count - 1) {
          innerSlider.style.left = `${0}px`;
          slides.forEach((s) => {
            s.element.style.transform = `translateX(${0}px)`;
          });
        }
      }
      if (position > slidesWidth * (count - 1) && direction === 1) {
        slide.style.transform = `translateX(${-slidesWidth * count}px)`;
        if (index === 0) {
          innerSlider.style.left = `-${slidesWidth}px`;
          slides.forEach((s) => {
            s.element.style.transform = `translateX(${0}px)`;
          });
        }
      }
    });
  };

  const checkBoundaryMobile = () => {
    const innerSlider = innerRef.current;

    slides.forEach((s, index) => {
      let slide = s.element;
      let position = slide.getBoundingClientRect().x;
      let direction = Math.sign(position);

      if (position < -slidesWidth + 10 && direction === -1) {
        slide.style.transform = `translateX(${slidesWidth * count}px)`;
        if (index === count - 1) {
          innerSlider.style.left = `${0}px`;
          slides.forEach((s) => {
            s.element.style.transform = `translateX(${0}px)`;
          });
        }
      }
      if (position > slidesWidth * (count - 1) && direction === 1) {
        slide.style.transform = `translateX(${-slidesWidth * count}px)`;
        if (index === 0) {
          innerSlider.style.left = `-${slidesWidth}px`;
          slides.forEach((s) => {
            s.element.style.transform = `translateX(${0}px)`;
          });
        }
      }
    });
  };

  return (
    <div className={styles.infinitySlider} ref={sliderRef}>
      <div className={styles.inner} ref={innerRef}>
        {team.map((t, index) => {
          return (
            <div key={index}>
              <TeamCard
                black={t.img_black}
                name={t.name}
                role={t.role}
                key={index}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Infinity;
