import { motion } from "framer-motion";

const Loader = () => {
  return (
    <>
      <motion.div
        style={{
          backgroundColor: "#000",
          width: "100vw",
          height: "100vh",
          position: "absolute",
          zIndex: "100",
        }}
        animate={{ x: [-2000, 0, 2600], opacity: [1, 1, 1, 0] }}
        transition={{ duration: 2, ease: "easeInOut" }}
      ></motion.div>
      <motion.div
        style={{
          backgroundColor: "#fff",
          width: "100vw",
          height: "100vh",
          position: "absolute",
          zIndex: "80",
          top: 0,
          left: 0,
        }}
        animate={{ x: [0, 0, 2600], opacity: [1, 1, 1, 0] }}
        transition={{ duration: 2, ease: "easeInOut" }}
      ></motion.div>
    </>
  );
};

export default Loader;
