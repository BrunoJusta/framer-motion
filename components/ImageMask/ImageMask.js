import style from "../../styles/TeamCardMask.module.scss";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ImageMask = (props) => {
  const { black, personal } = props;
  const ClipRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    img.onmousemove = function (e) {
      handleImgMask(e, true);
    };

    img.onmouseleave = function (e) {
      handleImgMask(e, false);
    };
  }, []);

  const handleImgMask = (e, isOn) => {
    const clipRef = ClipRef.current;
    let xAxis = (500 / 2 - e.offsetX) / 20;
    let yAxis = (500 / 2 - e.offsetY) / 20;
    if (isOn == true) {
      clipRef.style.clipPath = `circle(25% at ${e.offsetX}px ${e.offsetY}px)`;
      clipRef.style.transition = "all 0ms ease-in-out";
      imgRef.current.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
      imgRef.current.style.transition = "all 100ms ease-in-out";
    } else {
      clipRef.style.clipPath = `circle(10% at 100% 20%)`;
      clipRef.style.transition = "all 400ms ease-in-out";
      imgRef.current.style.transform = `rotateY(${0}deg) rotateX(${0}deg)`;
      imgRef.current.style.transition = "all 400ms ease-in-out";
    }
  };
  return (
    <motion.div
      ref={imgRef}
      className={style.image}
      style={{ backgroundImage: `url(${black})` }}
      initial={{ y: 100 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeIn" }}
    >
      <img
        ref={ClipRef}
        src={personal}
        draggable="false"
        className={style.imageMask}
      />
    </motion.div>
  );
};

export default ImageMask;
