import { useEffect } from "react";
import style from "../../styles/SideBar.module.scss";
import { motion, useAnimation } from "framer-motion";

const SideBar = (props) => {
  const { open, setOpen } = props;

  return (
    <motion.div
      className={style.main}
      animate={
        !open
          ? {
              x: "-100%",
              transition: { type: "spring", stiffness: 100, damping: 20 },
            }
          : {
              x: 0,
              transition: { type: "spring", stiffness: 100, damping: 20 },
            }
      }
    >
      <button
        onClick={() => {
          setOpen(false);
          console.log(open);
        }}
      >
        X
      </button>
    </motion.div>
  );
};

export default SideBar;
