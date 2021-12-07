import { useEffect, useState, useRef } from "react";

const Slider = ({ children, width, height, marginRight }) => {
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
  const [currentItem, setCurrentItem] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [positions, setPositions] = useState([]);
  const [pos, setPos] = useState(0);
  const [itemTotalWidth, setItemTotalWidth] = useState(width + marginRight);
  const [touchStart, setTouchStart] = useState(0);

  const sliderRef = useRef();

  useEffect(() => {
    const initialOffset = -itemTotalWidth * children.length;
    setContainerStyle({ width: `${items.length * itemTotalWidth}px` });

    setPositions(() => {
      return items.map((item, index) => {
        return initialOffset + index * itemTotalWidth;
      });
    });
  }, [items]);

  useEffect(() => {
    console.log(positions);
  }, [positions]);

  const gotoItem = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    console.log(index);
    setContainerStyle({
      width: `${items.length * itemTotalWidth}px`,
      transform: `translateX(${index * -itemTotalWidth}px)`,
      transition: `transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)`,
    });
    setCurrentItem(index);
  };

  const snapToPos = (index) => {
    const temp = index + children.length;
    setPos(temp * -itemTotalWidth);
    setContainerStyle({
      width: `${items.length * itemTotalWidth}px`,
      transform: `translateX(${temp * -itemTotalWidth}px)`,
    });
    setCurrentItem(temp);
  };

  const snapToX = (x) => {
    setContainerStyle({
      width: `${items.length * itemTotalWidth}px`,
      transform: `translateX(${x}px)`,
    });
    setPos(x);
  };
  const swipeToX = (x, dir) => {
    setContainerStyle({
      width: `${items.length * itemTotalWidth}px`,
      transform: `translateX(${x + itemTotalWidth * dir}px)`,
      transition: `transform 300ms linear`,
    });
    setPos(x + itemTotalWidth * dir);
    setIsPressed(false);
  };

  const snapToClosest = () => {
    const tempPos = -(pos - -itemTotalWidth * children.length);

    let newPos = positions.reduce(function (prev, curr) {
      return Math.abs(curr - tempPos) < Math.abs(prev - tempPos) ? curr : prev;
    });
    positions.forEach((i, index) => {
      if (i === newPos) {
        gotoItem(index);
      }
    });
  };

  useEffect(() => {
    snapToPos(0);

    window.addEventListener("mouseup", () => {
      setIsPressed(false);
    });
  }, []);

  return (
    <div className="wrapper">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          className="btn"
          onClick={() => {
            gotoItem(currentItem + 1);
          }}
        >
          prev
        </div>
        <div
          className="btn"
          onClick={() => {
            gotoItem(currentItem - 1);
          }}
        >
          next
        </div>
      </div>
      <div className="overflow">
        <div
          className="container"
          ref={sliderRef}
          onMouseEnter={() => {
            sliderRef.current.style.cursor = "grab";
          }}
          onMouseUp={() => {
            sliderRef.current.style.cursor = "grab";
            snapToClosest();
            console.log(currentItem);

            if (currentItem == 1) {
              snapToPos(Math.ceil(children.length) + 1);
            }
            if (currentItem == children.length + Math.ceil(children.length)) {
              snapToPos(0);
            }
          }}
          onMouseLeave={() => {
            if (!isPressed) return;
            snapToClosest();
          }}
          onMouseDown={() => {
            setIsPressed(true);
            sliderRef.current.style.cursor = "grabbing";
          }}
          onMouseMove={(e) => {
            if (!isPressed) return;
            const mouseDelta = e.movementX;
            snapToX(pos + mouseDelta);
          }}
          onTouchStart={(e) => {
            setIsPressed(true);
            setTouchStart(e.changedTouches[0].screenX);
          }}
          onTouchMove={(e) => {
            if (!isPressed) return;
            console.log(e);
            console.log(e.detail.dir);
            // const mouseDelta = e.touches[0].clientX;
            if (e.changedTouches[0].screenX < touchStart) snapToX(pos - 1);
            if (e.changedTouches[0].screenX > touchStart) snapToX(pos + 1);
          }}
          onTouchEnd={(e) => {
            snapToClosest();
            console.log(currentItem);
            // if (e.changedTouches[0].screenX < touchStart) swipeToX(pos, -1);
            // if (e.changedTouches[0].screenX > touchStart) swipeToX(pos, 1);
            if (currentItem == 1) {
              snapToPos(Math.ceil(children.length) + 1);
              setIsPressed(false);
            }
            if (currentItem == children.length + Math.ceil(children.length)) {
              snapToPos(0);
              setIsPressed(false);
            }
          }}
          style={containerStyle}
          onTransitionEnd={() => {
            setIsTransitioning(false);
            if (currentItem == 1) {
              snapToPos(Math.ceil(children.length) + 1);
            }
            if (currentItem == children.length + Math.ceil(children.length)) {
              snapToPos(0);
            }
          }}
        >
          {items &&
            items.map((item, index) => {
              return (
                <div
                  key={index}
                  className="item"
                  style={{
                    width: width,
                    height: height,
                    marginRight: marginRight,
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
