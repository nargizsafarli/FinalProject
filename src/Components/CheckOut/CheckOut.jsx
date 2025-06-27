import React, { useState } from "react";
import check from "./CheckOut.module.css";
import { FaRegCalendarMinus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getPrices } from "../../Utils/getprice";
import PaymentModal from "../PaymentModal/PaymentModel";
import img from "./assets/trust_badge.png"
import { useTranslation } from "react-i18next";

function CheckOut() {
  const basketItems = useSelector((state) => state.basket.items);
const promoCode = useSelector((state) => state.basket.promoCode);
const discountPercent = useSelector((state) => state.basket.discountPercent);
const totalPrice = basketItems.reduce((sum, item) => {
  const { discount, original } = getPrices(item.product, item.size);
  const price = discount || original;
  return sum + price * item.quantity;
}, 0);

const discountAmount = (totalPrice * discountPercent) / 100;
const finalTotal = totalPrice - discountAmount;

  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    address: "",
    city: ""
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    const phoneRegex = /^\+?[0-9]{10,13}$/;

    if (!form.name.trim()) errs.name = "Ad boş ola bilməz.";
    if (!form.surname.trim()) errs.surname = "Soyad boş ola bilməz.";
    if (!phoneRegex.test(form.phone)) errs.phone = "Telefon nömrəsi düzgün deyil.";
    if (!form.address.trim()) errs.address = "Ünvan boş ola bilməz.";
    if (!form.city.trim()) errs.city = "Şəhər boş ola bilməz.";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };
    const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
        setShowModal(true);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const {t}=useTranslation()
  return (
    <div className={check.container}>
    <div className={check.conInf}>
        <div className={check.infItem}><FaRegCalendarMinus className={check.kalicon} /> {t("check.inf1")}</div>
        <div className={check.infItem}><FaRegCalendarMinus className={check.kalicon}/> {t("check.inf2")}</div>
    </div>
    <div className={check.down}>
    <div className={check.leftCon}>
  <h2> {t("check.bill")}</h2>
  <form onSubmit={handleSubmit} className={check.form}>
    <div className={check.fullWidth}>
      <label> {t("check.coun")} <span className={check.star}>*</span></label>
      <select name="country" className={check.selectInput}>
        <option value="bangladesh">{t("check.coun1")}</option>
        <option value="azerbaijan">{t("check.coun2")}</option>
        <option value="turkey">{t("check.coun3")}</option>
      </select>
    </div>

    <div className={check.rowTwo}>
      <div className={check.inputGroup}>
        <label>{t("check.name")}<span className={check.star}>*</span></label>
        <input type="text" name="name" value={form.name} onChange={handleChange} />
        {errors.name && <span className={check.error}>{errors.name}</span>}
      </div>

      <div className={check.inputGroup}>
        <label>{t("check.last")}<span className={check.star}>*</span></label>
        <input type="text" name="surname" value={form.surname} onChange={handleChange} />
        {errors.surname && <span className={check.error}>{errors.surname}</span>}
      </div>
    </div>

    <div className={check.fullWidth}>
      <label>{t("check.stret")}<span className={check.star}>*</span></label>
      <input type="text" name="address" value={form.address} placeholder="Street address" onChange={handleChange} />
       {errors.address && <span className={check.error}>{errors.address}</span>}
        <input type="text" name="apt" placeholder="Apartment, suite, unit etc. (optional)" style={{marginTop:"30px"}} />
     
    </div>

    <div className={check.fullWidth}>
      <label>{t("check.town")}<span className={check.star}>*</span></label>
      <input type="text" name="city" value={form.city} onChange={handleChange} />
      {errors.city && <span className={check.error}>{errors.city}</span>}
    </div>

    <div className={check.fullWidth}>
      <label>{t("check.phone")}<span className={check.star}>*</span></label>
      <input type="text" name="phone" value={form.phone} onChange={handleChange} />
      {errors.phone && <span className={check.error}>{errors.phone}</span>}
    </div>
    <div>
    <button type="submit" className={check.submitBtn}>{t("check.order")}</button>
        <PaymentModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  </form>
</div>


      <div className={check.rightCon}>
        <h2 className={check.yek}>{t("check.yek")}</h2>
        <hr className={check.divider}/>
        <div className={check.summary}>
          <div className={check.row}>
            <span className={check.pay} >{t("check.esas")}</span>
             <span>₼{totalPrice.toFixed(2)}</span>
          </div>
           {promoCode && (
      <div className={check.row}>
        <span className={check.pay}>{t("check.en")}({promoCode}):</span>
        <span>-₼{discountAmount.toFixed(2)}</span>
      </div>
    )}

          <hr className={check.divider} />
          <div className={check.totalRow}>
            <span>{t("check.tot")}</span>
             <span>₼{finalTotal.toFixed(2)}</span>
          </div>
          <p className={check.txt}>{t("check.p")}</p>
          <img src={img} className={check.img}/>
        </div>
      </div>
      </div>
    </div>
  );
}

export default CheckOut;
