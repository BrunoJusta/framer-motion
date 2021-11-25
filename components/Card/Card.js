import style from "../../styles/TeamCard.module.scss";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TeamCard } from "..";

const Card = (props) => {
  const { black, personal, name } = props;

  return (
    <motion.div className={style.super}>
      <TeamCard black={black} personal={personal} />
      <div className={style.border}>
        <h1 className={style.titleCard}>{name}</h1>
        <p className={style.p}>Front-end Developer</p>
      </div>
    </motion.div>
  );
};

export default Card;
