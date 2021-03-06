import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Loader = (props) => {
  const { size } = props;
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const [show, setShow] = useState(true);
  const [isAnimatig, setIsAnimating] = useState(null);

  useEffect(() => {
    setHeight(size.current.getBoundingClientRect().height + 200);
    setWidth(size.current.getBoundingClientRect().width + 200);

    setIsAnimating(true);
    setTimeout(() => {
      setShow(false);
      setIsAnimating(false);
    }, 2100);
  }, []);

  const loaderVariants = {
    moveBlack: {
      x: [-2000, 0, width],
      transition: { duration: 2, ease: "easeInOut" },
    },
    moveWhite: {
      x: [0, 0, width],
      transition: { duration: 2, ease: "easeInOut" },
    },
  };

  return (
    <div>
      {show ? (
        <motion.div
          style={{
            backgroundColor: "#202020",
            width: "100%",
            height: `100%`,
            position: "fixed",
            top: "0",
            left: "0",
            zIndex: "100",
          }}
          variants={loaderVariants}
          animate={isAnimatig ? "moveBlack" : ""}
        ></motion.div>
      ) : (
        ""
      )}
      {show ? (
        <motion.div
          style={{
            backgroundColor: "#fafafa",
            width: "100%",
            height: `100%`,
            position: "fixed",
            top: "0",
            left: "0",
            zIndex: "80",
          }}
          variants={loaderVariants}
          animate={isAnimatig ? "moveWhite" : ""}
        ></motion.div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Loader;
