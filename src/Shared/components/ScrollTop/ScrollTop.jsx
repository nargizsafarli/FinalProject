import React, { useEffect, useState } from 'react'
import visib from "./ScrollTop.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesUp } from '@fortawesome/free-solid-svg-icons';

function ScrollTop() {
     const [visible, setVisible] = useState(false);
       const toggleVisibility = () => {
    setVisible(window.scrollY > 200); // 200px-dən sonra görsənsin
  };
    const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

   useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div>
      {visible && (
        <div className={`${visib.scroll} ${visible ? visib.show :  ""}`} onClick={scrollToTop}>
         <FontAwesomeIcon icon={faAnglesUp} />
        </div>
      )}
    </div>
  )
}

export default ScrollTop