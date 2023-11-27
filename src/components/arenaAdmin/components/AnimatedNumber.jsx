// import React, { useState, useEffect } from "react";

// const AnimatedNumber = ({ value, duration = 1000, delay = 0 }) => {
//   const [count, setCount] = useState(0);
//   const currentValue = value || 0;

//   useEffect(() => {
//     let start = performance.now();
//     const intervalId = setInterval(() => {
//       const elapsed = performance.now() - start;
//       if (elapsed > duration) {
//         clearInterval(intervalId);
//         setCount(currentValue);
//       } else {
//         setCount((currentValue * elapsed) / duration);
//       }
//     }, 16);

//     return () => clearInterval(intervalId);
//   }, [value, duration, delay]);

//   console.log(count);

//   return <div>{count.toFixed(0)}</div>;
// };

// export default AnimatedNumber;

import React, { useState, useEffect } from "react";

const AnimatedNumber = ({ value, duration = 1000, delay = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const end = start + duration;

    const updateCount = () => {
      const now = performance.now();
      const elapsed = Math.min(now - start, duration);
      const progress = elapsed / duration;
      const currentValue = Math.round(value * progress);
      setCount(currentValue);
      if (now < end) {
        requestAnimationFrame(updateCount);
      }
    };

    if (delay > 0) {
      const timeoutId = setTimeout(
        () => requestAnimationFrame(updateCount),
        delay
      );
      return () => clearTimeout(timeoutId);
    }

    requestAnimationFrame(updateCount);
    return () => {};
  }, [value, duration, delay]);

  return <div>{count}</div>;
};

export default AnimatedNumber;
