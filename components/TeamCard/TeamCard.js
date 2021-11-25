import style from "../../styles/TeamCard.module.scss";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const TeamCard = (props) => {
  const { black, personal } = props;
  const ClipRef = useRef(null);
  console.log(black, personal);

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
      clipRef.style.clipPath = `circle(20% at ${e.offsetX}px ${e.offsetY}px)`;
      clipRef.style.transition = "all 0ms ease-in-out";
    } else {
      clipRef.style.clipPath = `circle(5% at 0px 50%)`;
      clipRef.style.transition = "all 400ms ease-in-out";
    }
  };
  return (
    <motion.div
      className={style.main}
      style={{ backgroundImage: `url(${black})` }}
    >
      <motion.div
        className={style.card}
        style={{ backgroundImage: `url(${black})` }}
      >
        <img ref={ClipRef} src={personal} className={style.img} />
      </motion.div>
    </motion.div>
  );
};

export default TeamCard;
