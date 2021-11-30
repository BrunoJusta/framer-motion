import { useEffect, useRef, useState } from "react";

const ImageZoom = (props) => {
  const { url, w, h } = props;
  const [width, setWith] = useState(400);
  const [height, setHeight] = useState(500);

  const style = {
    backgroundPosition: "50% 50%",
    backgroundSize: width,
    backgroundRepeat: "no-repeat",
    position: "relative",
    width: width,
    height: height,
    overflow: "hidden",
    cursor: "zoom-in",
    backgroundImage: "url('./RIKA.jpeg')",
  };

  const imageRef = useRef();

  useEffect(() => {
    console.log(width);
    const image = imageRef.current;
    image.onmousemove = function (e) {
      handleImgPos(e);
    };
    image.onmouseleave = function (e) {
      handleReset(e);
    };
    image.onwheel = function (e) {
      handleImgZoom(e);
    };
  }, []);

  const handleImgZoom = (e) => {
    e.preventDefault();

    let image = e.currentTarget;
    let bgSize = image.style.backgroundSize;
    let current;
    bgSize == ""
      ? (current = width)
      : (current = Number(bgSize.substring(0, bgSize.length - 2)));

    e.deltaY < 0
      ? (image.style.backgroundSize = `${current + 20}px`)
      : current >= 510
      ? (image.style.backgroundSize = `${current - 20}px`)
      : "";
  };

  const handleReset = (e) => {
    let image = e.currentTarget;
    image.style.backgroundSize = `${width}px`;
  };

  const handleImgPos = (e) => {
    var image = e.currentTarget;
    let bgSize = image.style.backgroundSize;
    let current;
    bgSize == ""
      ? (current = width)
      : (current = Number(bgSize.substring(0, bgSize.length - 2)));
    let x = (e.offsetX / image.offsetWidth) * 100;
    let y = (e.offsetY / image.offsetHeight) * 100;
    current != width ? (image.style.transformOrigin = `${x} ${y}`) : "";

    current != width
      ? (image.style.backgroundPosition = x + "% " + y + "%")
      : "";
  };

  return <div style={style} ref={imageRef}></div>;
};

export default ImageZoom;
