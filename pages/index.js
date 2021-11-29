import Head from "next/head";
import { animate, motion, useAnimation } from "framer-motion";
import styles from "../styles/Home.module.css";
import { useState, useEffect, useRef } from "react";
import { CardSlider, Loader, TeamGrid } from "../components";
import useWindowSize from "../hooks/Dimensions";
export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const control = useAnimation();
  const windowSize = useWindowSize();
  const mainref = useRef();

  const handleClick = () => {
    console.log(slides);
    slides.forEach((s, index) => {
      const previousX = getTranslateX(s.element);
      console.log(s.element.getBoundingClientRect().width);
      console.log(previousX);
      if (s.x <= 200) {
        s.element.style.transform = `translate3d(1600px ,0px, 0px)`;
      }
    });
  };

  return (
    <div className={styles.container} ref={mainref}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Loader size={mainref} /> */}
      <main className={styles.main}>
        <motion.h1 className={styles.title}>Willbe Collective</motion.h1>
        {/* 
        <button
          onClick={() => {
            // setIsOpen(true);
            handleClick();
            console.log(isOpen);
          }}
        >
          Abrir
        </button> */}

        <TeamGrid />
        {/* <CardSlider /> */}
        {/* <button
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Abrir
        </button> */}

        {/* <SideBar open={isOpen} setOpen={setIsOpen} /> */}
      </main>
    </div>
  );
}
