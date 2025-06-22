import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './Faq.module.css';
import { fetchFaqs } from '../../redux/features/auth/faqSlice';

function Faq() {
  const dispatch = useDispatch();
  const { data: faqData, loading, error } = useSelector((state) => state.faq);
  const [activeIndices, setActiveIndices] = useState([]);

  useEffect(() => {
    dispatch(fetchFaqs());
  }, [dispatch]);

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

      {loading && <p>Yüklənir...</p>}
      {error && <p className={styles.error}>Xəta: {error}</p>}

      {faqData.map((item, index) => (
        <div key={item.id} className={styles.faqItem}>
          <button
            onClick={() => toggleFaq(index)}
            className={`${styles.question} ${activeIndices.includes(index) ? styles.active : ''}`}
          >
            {item.questionEn}
            <span className={styles.icon}>{activeIndices.includes(index) ? '-' : '+'}</span>
          </button>
          {activeIndices.includes(index) && (
            <div className={styles.answer}>
              {item.answerEn}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Faq;
