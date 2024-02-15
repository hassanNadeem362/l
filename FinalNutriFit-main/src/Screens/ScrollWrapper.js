// ScrollWrapper.js
import React, { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";

const ScrollWrapper = ({ children }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true, // You can configure other options here
    });

    return () => {
      if (scroll) {
        scroll.destroy();
      }
    };
  }, []);

  return <div ref={scrollRef}>{children}</div>;
};

export default ScrollWrapper;
