import style from "../../styles/TeamCardMask.module.scss";
import { motion } from "framer-motion";
import { ImageMask } from "..";

const TeamCardMask = (props) => {
  const { black, personal, name, role } = props;

  return (
    <motion.div
      className={style.card}
      initial={{ y: 200 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeIn" }}
    >
      <ImageMask black={black} personal={personal} />
      <div className={style.cardDetails}>
        <h1 className={style.cardName}>{name}</h1>
        <p className={style.cardDesc}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>
        <p className={style.cardRole}>{role}</p>
      </div>
    </motion.div>
  );
};

export default TeamCardMask;
