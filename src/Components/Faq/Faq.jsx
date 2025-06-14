// import React, { useState } from 'react';
// import styles from './Faq.module.css';

// const faqData = [
//   {
//     question: "Bitkilər nə qədər suya ehtiyac duyur?",
//     answer: "Bu, bitkinin növünə və mühit şəraitinə görə dəyişir. Əksər ev bitkiləri torpaq quruduqda suvarılmalıdır.",
//   },
//   {
//     question: "Günəş işığı olmadan bitkiləri böyütmək olar?",
//     answer: "Bəzi bitkilər aşağı işıqda yaşaya bilər, amma ümumiyyətlə, bitkilər günəş işığını sevir.",
//   },
//   {
//     question: "Bitki yarpaqları saralırsa səbəbi nədir?",
//     answer: "Bu çox su, az su, işıq çatışmazlığı və ya xəstəlik səbəbindən ola bilər.",
//   },
//   {
//     question: "Bitkilərə gübrə nə zaman verilməlidir?",
//     answer: "Bahar və yay aylarında, aktiv böyümə dövründə gübrələmək daha uyğundur.",
//   },
// ];

// function Faq() {
//   const [activeIndex, setActiveIndex] = useState(null);

//   const toggleFaq = (index) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>Tez-tez verilən suallar</h2>
//       {faqData.map((item, index) => (
//         <div key={index} className={styles.faqItem}>
//           <button onClick={() => toggleFaq(index)} 
//            className={`${styles.question} ${activeIndex === index ? styles.active : ''}`}
//           >
//             {item.question}
//             <span className={styles.icon}>{activeIndex === index ? '-' : '+'}</span>
//           </button>
//           {activeIndex === index && (
//             <div className={styles.answer}>
//               {item.answer}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Faq;
import React, { useState } from 'react';
import styles from './Faq.module.css';

const faqData = [
  {
    question: "Bitkilər nə qədər suya ehtiyac duyur?",
    answer: "Bu, bitkinin növünə və mühit şəraitinə görə dəyişir. Əksər ev bitkiləri torpaq quruduqda suvarılmalıdır.",
  },
  {
    question: "Günəş işığı olmadan bitkiləri böyütmək olar?",
    answer: "Bəzi bitkilər aşağı işıqda yaşaya bilər, amma ümumiyyətlə, bitkilər günəş işığını sevir.",
  },
  {
    question: "Bitki yarpaqları saralırsa səbəbi nədir?",
    answer: "Bu çox su, az su, işıq çatışmazlığı və ya xəstəlik səbəbindən ola bilər.",
  },
  {
    question: "Bitkilərə gübrə nə zaman verilməlidir?",
    answer: "Bahar və yay aylarında, aktiv böyümə dövründə gübrələmək daha uyğundur.",
  },
];

function Faq() {
  const [activeIndices, setActiveIndices] = useState([]);

  const toggleFaq = (index) => {
    if (activeIndices.includes(index)) {
      // varsa, çıxart
      setActiveIndices(activeIndices.filter(i => i !== index));
    } else {
      // yoxdursa, əlavə et
      setActiveIndices([...activeIndices, index]);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Tez-tez verilən suallar</h2>
      {faqData.map((item, index) => (
        <div key={index} className={styles.faqItem}>
          <button
            onClick={() => toggleFaq(index)}
            className={`${styles.question} ${activeIndices.includes(index) ? styles.active : ''}`}
          >
            {item.question}
            <span className={styles.icon}>{activeIndices.includes(index) ? '-' : '+'}</span>
          </button>
          {activeIndices.includes(index) && (
            <div className={styles.answer}>
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Faq;
