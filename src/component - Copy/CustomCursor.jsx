// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// const CustomCursor = () => {
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const updateMousePos = (e) => {
//       setMousePos({ x: e.clientX, y: e.clientY });
//     };

//     window.addEventListener("mousemove", updateMousePos);
//     return () => window.removeEventListener("mousemove", updateMousePos);
//   }, []);

//   return (
//     <motion.div
//       className="custom-cursor z-[100]"
//       animate={{ x: mousePos.x - 15, y: mousePos.y - 15 }}
//       transition={{ type: "tween", ease: "linear", duration: 0.1 }}
//     />
//   );
// };

// export default CustomCursor;


import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorSize, setCursorSize] = useState(20);
  const [cursorColor, setCursorColor] = useState("rgba(255, 165, 0, 0.7)"); // Orange for adventure theme

  useEffect(() => {
    const updateMousePos = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePos);
    return () => window.removeEventListener("mousemove", updateMousePos);
  }, []);

  // Handle hover effects
  useEffect(() => {
    const hoverElements = document.querySelectorAll("button, a, .interactive");

    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        setCursorSize(40); // Enlarged on hover
        setCursorColor("rgba(0, 150, 255, 0.7)"); // Blue on hover
      });

      el.addEventListener("mouseleave", () => {
        setCursorSize(20); // Default size
        setCursorColor("rgba(255, 165, 0, 0.7)"); // Back to orange
      });
    });

    return () => {
      hoverElements.forEach((el) => {
        el.removeEventListener("mouseenter", () => {});
        el.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);

  return (
    <motion.div
      className="custom-cursor z-[100]"
      animate={{
        x: mousePos.x - cursorSize / 2,
        y: mousePos.y - cursorSize / 2,
        width: cursorSize,
        height: cursorSize,
        backgroundColor: cursorColor,
      }}
      transition={{ type: "tween", ease: "easeOut", duration: 0.15 }}
    />
  );
};

export default CustomCursor;
