import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { Modal, Input, Button } from "antd";
import styles from "./PaymentModal.module.css";
import { useNavigate } from "react-router-dom";
import i18n from "../../i18n/i18next";
import { useDispatch } from "react-redux";
import { clearBasket } from "../../redux/features/auth/basketSlice";

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
  const dispatch=useDispatch();

  const handlePay = () => {
     localStorage.setItem("thankAccess", "true");
   navigate(`/${currentLang}/thank`)
    dispatch(clearBasket())
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
      title={
          <span
            style={{ fontSize: "20px", fontWeight: "bold", color: "green" }}
          >
            Add New Item
          </span>
        }
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
            required
            onFocus={handleFocus}
            className={styles.input}
          />
          <Input
            name="name"
            placeholder="Name on Card"
            value={cardData.name}
            onChange={handleInputChange}
            onFocus={handleFocus}
            required
            className={styles.input}
          />
          <div className={styles.inputDiv}>
          <Input
            name="expiry"
            placeholder="MM/YY"
            required
            value={cardData.expiry}
            onChange={handleInputChange}
            onFocus={handleFocus}
            className={styles.input}
          />
          <Input
            name="cvc"
            placeholder="CVC"
            value={cardData.cvc}
            required
            onChange={handleInputChange}
            onFocus={handleFocus}
            className={styles.input}
          />
          </div>
          <button type="primary" className={styles.bbtn} block onClick={handlePay}>
            Təsdiqlə
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentModal;
