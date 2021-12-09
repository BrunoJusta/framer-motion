import useWindowSize from "./hooks/WindowSize";
import style from "./styles/Slider.module.scss";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Slider = ({
  children,
  width,
  height,
  margin,
  useControls,
  isTouchable,
  isDraggable,
  isFull,
}) => {
  const windowSize = useWindowSize();
  const sliderRef = useRef();
  const wrapperRef = useRef();
  const tempChildrens = [...children].map((item) => {
    return { content: item.props.children, item };
  });
  const [items, setItems] = useState(
    [...tempChildrens, ...tempChildrens, ...tempChildrens].map(
      (item, index) => {
        return { ...item, index };
      }
    )
  );

  const [containerStyle, setContainerStyle] = useState({});
  const [positions, setPositions] = useState([]);
  const [currentItem, setCurrentItem] = useState(0);
  const [currentPos, setCurrentPos] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [itemTotalWidth, setItemTotalWidth] = useState(width + margin);
  const [itemsLength, setItemsLength] = useState(children.length * 3);
  const [childrenLength, setChildrenLength] = useState(children.length);
  const [wrapperWidth, setWrapperWidth] = useState(children.length);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    snapToPos(0);
    {
      isDraggable
        ? window.addEventListener("mouseup", () => {
            setIsPressed(false);
          })
        : "";
    }
  }, []);

  useEffect(() => {
    // if (isFull) {
    //   let tempWrapperWidth = wrapperRef.current.getBoundingClientRect().width;
    //   const initialOffset = -tempWrapperWidth * childrenLength;
    //   setContainerStyle({
    //     width: `${itemsLength * tempWrapperWidth}px`,
    //   });
    //   setPositions(() => {
    //     return items.map((item, index) => {
    //       return initialOffset + index * tempWrapperWidth;
    //     });
    //   });
    //   setItemTotalWidth(tempWrapperWidth);
    //   setWrapperWidth(tempWrapperWidth);
    // } else {
    const initialOffset = -itemTotalWidth * childrenLength;
    setContainerStyle({ width: `${itemsLength * itemTotalWidth}px` });
    setPositions(() => {
      return items.map((item, index) => {
        return initialOffset + index * itemTotalWidth;
      });
    });
    // }
  }, [items]);

  // Desktop Drag Events //
  const onMouseMove = (e) => {
    if (!isPressed) return;
    const mouseDelta = e.movementX;
    snapToX(currentPos + mouseDelta);
  };
  const onMouseUp = () => {
    sliderRef.current.style.cursor = "grab";
    snapToClosest();
  };
  const onMouseDown = () => {
    setIsPressed(true);
    sliderRef.current.style.cursor = "grabbing";
  };
  const onMouseEnter = () => {
    sliderRef.current.style.cursor = "grab";
  };
  const onMouseLeave = () => {
    if (!isPressed) return;
    snapToClosest();
  };

  // Mobile Touch Events //
  const onTouchStart = (e) => {
    setIsPressed(true);
    setTouchStart(e.changedTouches[0].screenX);
  };
  const onTouchEnd = (e) => {
    snapToClosest();
    if (e.changedTouches[0].screenX < touchStart) swipeToX(currentPos, -1);
    if (e.changedTouches[0].screenX > touchStart) swipeToX(currentPos, 1);
    if (currentItem == 1) {
      snapToPos(childrenLength + 1);
    }
    if (currentItem >= childrenLength + childrenLength - 1) {
      snapToPos(0);
    }
  };

  // Buttons Controls Events //
  const moveLeft = () => {
    console.log(currentItem);
    gotoItem(currentItem + 1);
  };
  const moveRight = () => {
    gotoItem(currentItem - 1);
  };

  // Handle Position Functions //
  const gotoItem = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setContainerStyle({
      width: `${itemsLength * itemTotalWidth}px`,
      transform: `translateX(${index * -itemTotalWidth}px)`,
      transition: wrapperWidth
        ? `transform 300ms linear`
        : `transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)`,
    });
    setCurrentItem(index);
    setCurrentPos(index * -itemTotalWidth);
  };

  const snapToPos = (index) => {
    const temp = index + childrenLength;
    setCurrentPos(temp * -itemTotalWidth);
    setContainerStyle({
      width: `${itemsLength * itemTotalWidth}px`,
      transform: `translateX(${temp * -itemTotalWidth}px)`,
    });
    setCurrentItem(temp);
  };

  const snapToX = (x) => {
    setContainerStyle({
      width: `${itemsLength * itemTotalWidth}px`,
      transform: `translateX(${x}px)`,
    });
    setCurrentPos(x);
  };

  const swipeToX = (x, dir) => {
    setContainerStyle({
      width: `${itemsLength * itemTotalWidth}px`,
      transform: `translateX(${x + itemTotalWidth * dir}px)`,
      transition: `transform 300ms linear`,
    });
    setCurrentPos(x + itemTotalWidth * dir);
    setIsPressed(false);
  };

  const snapToClosest = () => {
    const tempPos = -(currentPos - -itemTotalWidth * childrenLength);
    let newPos = positions.reduce(function (prev, curr) {
      return Math.abs(curr - tempPos) < Math.abs(prev - tempPos) ? curr : prev;
    });

    positions.forEach((i, index) => {
      if (i === newPos) {
        gotoItem(index);
      }
    });
  };

  // Handle Position after Transition //
  const onTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentItem <= 1) {
      snapToPos(childrenLength + 1);
    }
    if (currentItem >= childrenLength + childrenLength) {
      snapToPos(0 + (currentItem - childrenLength * 2));
    }
  };

  return (
    <div className={style.wrapper} ref={wrapperRef}>
      {useControls && useControls ? (
        <div className={style.btnWrapper}>
          <div
            className={style.btn}
            onClick={() => {
              moveLeft();
            }}
          >
            <FiChevronLeft />
          </div>
          <div
            className={style.btn}
            onClick={() => {
              moveRight();
            }}
          >
            <FiChevronRight />
          </div>
        </div>
      ) : (
        ""
      )}
      <div className={style.overflow}>
        <div
          className={style.container}
          ref={sliderRef}
          onMouseEnter={() => {
            if (!isDraggable) return;
            onMouseEnter();
          }}
          onMouseUp={() => {
            if (!isDraggable) return;
            onMouseUp();
          }}
          onMouseLeave={() => {
            if (!isDraggable) return;
            onMouseLeave();
          }}
          onMouseDown={() => {
            if (!isDraggable) return;
            onMouseDown();
          }}
          onMouseMove={(e) => {
            if (!isDraggable) return;
            onMouseMove(e);
          }}
          onTouchStart={(e) => {
            if (!isTouchable) return;
            onTouchStart(e);
          }}
          onTouchEnd={(e) => {
            if (!isTouchable) return;
            onTouchEnd(e);
          }}
          onTransitionEnd={() => {
            onTransitionEnd();
          }}
          style={containerStyle}
        >
          {items &&
            items.map((item, index) => {
              return windowSize.width < 669 ? (
                <motion.div
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.1}
                  dragSnapToOrigin={true}
                  key={index}
                  className={style.item}
                  style={{
                    width: isFull ? wrapperWidth : width,
                    height: height ? height : "auto",
                    marginRight: isFull ? 0 : margin,
                    marginLeft: isFull ? 0 : margin,
                  }}
                >
                  {item.content}
                </motion.div>
              ) : (
                <div
                  key={index}
                  className={style.item}
                  style={{
                    width: isFull ? wrapperWidth : width,
                    height: height ? height : "auto",
                    marginRight: isFull ? 0 : margin,
                    marginLeft: isFull ? 0 : margin,
                  }}
                >
                  {item.content}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Slider;
