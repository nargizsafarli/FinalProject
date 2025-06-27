import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './Faq.module.css';
import { fetchFaqs } from '../../redux/features/auth/faqSlice';
import { SpinnerDotted } from 'spinners-react';
import i18n from '../../i18n/i18next';

function Faq() {
  const dispatch = useDispatch();
  const { data: faqData, loading, error } = useSelector((state) => state.faq);
  const [activeIndices, setActiveIndices] = useState([]);
  const currentLang=i18n.language

  useEffect(() => {
    dispatch(fetchFaqs());
  }, [dispatch]);
   if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <SpinnerDotted size={70} thickness={100} speed={100} color="green" />
      </div>
    );}
    if (error) return <p>Xəta baş verdi: {error}</p>;

  const toggleFaq = (index) => {
    if (activeIndices.includes(index)) {
      setActiveIndices(activeIndices.filter((i) => i !== index));
    } else {
      setActiveIndices([...activeIndices, index]);
    }
  };


  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Tez-tez verilən suallar</h2>
      {faqData.map((item, index) => (
        <div key={item.id} className={styles.faqItem}>
          <button
            onClick={() => toggleFaq(index)}
            className={`${styles.question} ${activeIndices.includes(index) ? styles.active : ''}`}
          >
            {currentLang==="en" ? item.questionEn:item.questinAz}
            <span className={styles.icon}>{activeIndices.includes(index) ? '-' : '+'}</span>
          </button>
          {activeIndices.includes(index) && (
            <div className={styles.answer}>
             {currentLang==="en" ? item.answerEn:item.answerAz}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Faq;
