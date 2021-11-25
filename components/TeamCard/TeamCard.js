import style from "../../styles/TeamCard.module.scss";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const TeamCard = (props) => {
  const { black, personal } = props;
  const ClipRef = useRef(null);

  useEffect(() => {
    const clipRef = ClipRef.current;
    clipRef.onmousemove = function (e) {
      handleImgMask(e, true);
    };

    clipRef.onmouseleave = function (e) {
      handleImgMask(e, false);
    };
  }, []);

  const handleImgMask = (e, isOn) => {
    const clipRef = ClipRef.current;

    if (isOn == true) {
      clipRef.style.clipPath = `circle(22% at ${e.offsetX}px ${e.offsetY}px)`;
      clipRef.style.transition = "all 0ms ease-in-out";
    } else {
      clipRef.style.clipPath = `circle(10% at 0px 0px)`;
      clipRef.style.transition = "all 400ms ease-in-out";
    }
  };
  return (
    <motion.div
      className={style.card}
      style={{ backgroundImage: `url(${black})` }}
    >
      <img ref={ClipRef} src={personal} className={style.img} />
    </motion.div>
  );
};

export default TeamCard;
