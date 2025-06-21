import React, { useState } from "react";
import check from "./CheckOut.module.css";
import { FaRegCalendarMinus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getPrices } from "../../Utils/getprice";
import PaymentModal from "../PaymentModal/PaymentModel";

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

  return (
    <div className={check.container}>
    <div className={check.conInf}>
        <div className={check.infItem}><FaRegCalendarMinus className={check.kalicon} /> Returning customer? Click here to login</div>
        <div className={check.infItem}><FaRegCalendarMinus className={check.kalicon}/> Have a coupon? Click here to enter your code</div>
    </div>
    <div className={check.down}>
    <div className={check.leftCon}>
  <h2>Billing Details</h2>
  <form onSubmit={handleSubmit} className={check.form}>
    <div className={check.fullWidth}>
      <label>Country <span className={check.star}>*</span></label>
      <select name="country" className={check.selectInput}>
        <option value="bangladesh">Bangladesh</option>
        <option value="azerbaijan">Azerbaijan</option>
        <option value="turkey">Turkey</option>
      </select>
    </div>

    <div className={check.rowTwo}>
      <div className={check.inputGroup}>
        <label>First Name <span className={check.star}>*</span></label>
        <input type="text" name="name" value={form.name} onChange={handleChange} />
        {errors.name && <span className={check.error}>{errors.name}</span>}
      </div>

      <div className={check.inputGroup}>
        <label>Last Name <span className={check.star}>*</span></label>
        <input type="text" name="surname" value={form.surname} onChange={handleChange} />
        {errors.surname && <span className={check.error}>{errors.surname}</span>}
      </div>
    </div>

    <div className={check.fullWidth}>
      <label>Street Address <span className={check.star}>*</span></label>
      <input type="text" name="address" value={form.address} placeholder="Street address" onChange={handleChange} />
       {errors.address && <span className={check.error}>{errors.address}</span>}
        <input type="text" name="apt" placeholder="Apartment, suite, unit etc. (optional)" style={{marginTop:"30px"}} />
     
    </div>

    <div className={check.fullWidth}>
      <label>Town / City <span className={check.star}>*</span></label>
      <input type="text" name="city" value={form.city} onChange={handleChange} />
      {errors.city && <span className={check.error}>{errors.city}</span>}
    </div>

    <div className={check.fullWidth}>
      <label>Phone <span className={check.star}>*</span></label>
      <input type="text" name="phone" value={form.phone} onChange={handleChange} />
      {errors.phone && <span className={check.error}>{errors.phone}</span>}
    </div>
    <div>
    <button type="submit" className={check.submitBtn}>Place Order</button>
        <PaymentModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  </form>
</div>


      <div className={check.rightCon}>
        <h2 className={check.yek}>YEKUN</h2>
        <hr className={check.divider}/>
        <div className={check.summary}>
          <div className={check.row}>
            <span className={check.pay} >Əsas qiymət:</span>
             <span>₼{totalPrice.toFixed(2)}</span>
          </div>
           {promoCode && (
      <div className={check.row}>
        <span className={check.pay}>Endirim ({promoCode}):</span>
        <span>-₼{discountAmount.toFixed(2)}</span>
      </div>
    )}

          <hr className={check.divider} />
          <div className={check.totalRow}>
            <span>Ümumi:</span>
             <span>₼{finalTotal.toFixed(2)}</span>
          </div>
          <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account</p>
        </div>
      </div>
      </div>
    </div>
  );
}

export default CheckOut;
