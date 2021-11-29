import { motion } from "framer-motion";
import useWindowSize from "../../hooks/Dimensions";
import { useState, useEffect } from "react";

const Loader = (props) => {
  const { size } = props;
  const [height, setHeight] = useState(null);
  useEffect(() => {
    if (size) {
      setHeight(size.current.getBoundingClientRect().height);
      console.log("wow");
    }
  });
  const windowSize = useWindowSize();
  return (
    <>
      <motion.div
        style={{
          backgroundColor: "#000",
          width: "100%",
          height: `${height}px`,
          position: "absolute",
          zIndex: "100",
        }}
        animate={{
          x: [-2000, 0, 2600],
          opacity: [1, 1, 1, 0],
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
      ></motion.div>
      <motion.div
        style={{
          backgroundColor: "#fff",
          width: "100%",
          height: `${height}px`,
          position: "absolute",
          zIndex: "80",
          top: 0,
          left: 0,
        }}
        animate={{
          x: [0, 0, 2600],
          opacity: [1, 1, 1, 0],
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
      ></motion.div>
    </>
  );
};

export default Loader;
