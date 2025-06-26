import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { Modal, Input, Button } from "antd";
import styles from "./PaymentModal.module.css";
import { useNavigate } from "react-router-dom";
import i18n from "../../i18n/i18next";

const PaymentModal = ({ open, onClose }) => {
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: "",
  });
  const navigate=useNavigate()
const currentLang=i18n.language
  const handleInputChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  const handleFocus = (e) => {
    setCardData({ ...cardData, focus: e.target.name });
  };

  const handlePay = () => {
   navigate(`/${currentLang}/thank`)
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
      title="Kart Məlumatları"
      centered
    >
      <div className={styles.wrapper}>
        <div className={styles.cardPreview}>
          <Cards
            number={cardData.number}
            name={cardData.name}
            expiry={cardData.expiry}
            cvc={cardData.cvc}
            focused={cardData.focus}
          />
        </div>

        <div className={styles.form}>
          <Input
            name="number"
            placeholder="Card Number"
            value={cardData.number}
            onChange={handleInputChange}
            onFocus={handleFocus}
            className={styles.input}
          />
          <Input
            name="name"
            placeholder="Name on Card"
            value={cardData.name}
            onChange={handleInputChange}
            onFocus={handleFocus}
            className={styles.input}
          />
          <Input
            name="expiry"
            placeholder="MM/YY"
            value={cardData.expiry}
            onChange={handleInputChange}
            onFocus={handleFocus}
            className={styles.input}
          />
          <Input
            name="cvc"
            placeholder="CVC"
            value={cardData.cvc}
            onChange={handleInputChange}
            onFocus={handleFocus}
            className={styles.input}
          />
          <Button type="primary" block onClick={handlePay}>
            Təsdiqlə
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentModal;
