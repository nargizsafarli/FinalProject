// import React, { useEffect, useState } from 'react'
// import visib from "./ScrollTop.module.css"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAnglesUp } from '@fortawesome/free-solid-svg-icons';

// function ScrollTop() {
//      const [visible, setVisible] = useState(false);
//        const toggleVisibility = () => {
//     setVisible(window.scrollY > 200); // 200px-dən sonra görsənsin
//   };
//     const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth"
//     });
//   };

//    useEffect(() => {
//     window.addEventListener("scroll", toggleVisibility);
//     return () => window.removeEventListener("scroll", toggleVisibility);
//   }, []);

//   return (
//     <div>
//       {visible && (
//         <div className={`${visib.scroll} ${visible ? visib.show :  ""}`} onClick={scrollToTop}>
//          <FontAwesomeIcon icon={faAnglesUp} />
//         </div>
//       )}
//     </div>
//   )
// }

// export default ScrollTop
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import visib from "./ScrollTop.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesUp } from '@fortawesome/free-solid-svg-icons';

function ScrollTop() {
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation(); // bu əlavə olunur

  // scroll düyməsinin görünməsi üçün
  const toggleVisibility = () => {
    setVisible(window.scrollY > 200);
  };

  // düyməyə klik ediləndə səhifəni yuxarı aparır
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // scroll zamanı düymənin görünməsi
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // səhifə dəyişəndə avtomatik yuxarı qalxsın
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto"
    });
  }, [pathname]); // pathname dəyişəndə işə düşəcək

  return (
    <div>
      {visible && (
        <div className={`${visib.scroll} ${visible ? visib.show : ""}`} onClick={scrollToTop}>
          <FontAwesomeIcon icon={faAnglesUp} />
        </div>
      )}
    </div>
  );
}

export default ScrollTop;
