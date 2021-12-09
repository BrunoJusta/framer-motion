import style from "../../styles/TeamCard.module.scss";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const TeamCard = (props) => {
  const { black, name, role } = props;

  const tiltRef = useRef(null);

  useEffect(() => {
    const tilt = tiltRef.current;
    // tilt.onmousemove = function (e) {
    //   handleTilt(e, true);
    // };

    // tilt.onmouseleave = function (e) {
    //   handleTilt(e, false);
    // };
  }, []);

  const handleTilt = (e, isOn) => {
    const tilt = tiltRef.current;
    let xAxis = (500 / 2 - e.offsetX) / 20;
    let yAxis = (500 / 2 - e.offsetY) / 20;
    if (isOn == true) {
      tilt.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
      // tilt.style.transition = "all 50ms ease-in-out";
    } else {
      tilt.style.transform = `rotateY(${0}deg) rotateX(${0}deg)`;
      // tilt.style.transition = "all 400ms ease-in-out";
    }
  };

  return (
    <div className={style.card}>
      <img
        src={black}
        className={style.cardImage}
        ref={tiltRef}
        draggable="false"
      />
      <div className={style.cardDetails}>
        <h1 className={style.cardName}>{name}</h1>
        <p className={style.cardRole}>{role}</p>
      </div>
    </div>
  );
};

export default TeamCard;
