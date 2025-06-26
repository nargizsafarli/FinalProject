// import React from 'react';
// import contact from './Contact.module.css';
// import { CiLocationOn } from "react-icons/ci";
// import { IoCallOutline } from "react-icons/io5";
// import { AiOutlineMail } from "react-icons/ai";

// function Contact() {
//   return (
//     <div className={contact.container}>
//       <div className={contact.infoBox}>
//         <h3>Store information</h3>
//         <div className={contact.infLeft}><p className={contact.icon}><CiLocationOn /></p> Bloomis Demo Store<br />507-Union Trade Center<br />France</div>
//         <hr />
//         <div className={contact.infLeft}><p className={contact.icon}><IoCallOutline /></p> Call us: <br /> (+91) 9876-543-210</div>
//         <hr />
//         <div className={contact.infLeft}><p className={contact.icon}><AiOutlineMail /></p> Email us: <br /> demo@example.com</div>
//       </div>

//       {/* Right Side - Contact Form */}
//       <form className={contact.formBox}>
//         <div className={contact.formGroup}>
//           <label className={contact.labels}>Name</label>
//           <input type='text' ></input>
//         </div>

//         <div className={contact.formGroup}>
//           <label className={contact.labels}>Email address</label>
//           <input type="email"  />
//         </div>

//         <div className={contact.formGroup}>
//           <label className={contact.labels}>Address</label>
//           <div className={contact.fileInputWrapper}>
//             <input type="text" />
//             <span>optional</span>
//           </div>
//         </div>

//         <div className={contact.formGroup}>
//           <label className={contact.labels}>Message</label>
//           <textarea rows="4"
//           //  placeholder="How can we help?" 

//            />
//         </div>

//         <div className={contact.checkboxWrapper}>
//           <input type="checkbox" />
//           <label className={contact.labelAgree}>I agree to the terms and conditions and the privacy policy</label>
//         </div>

//         <button type="submit" className={contact.sendBtn}>SEND</button>
//       </form>
//     </div>
//   );
// }

// export default Contact;
import React, { useState } from 'react';
import contact from './Contact.module.css';
import Swal from 'sweetalert2';
import { CiLocationOn } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { supabase } from '../../client';
import { useTranslation } from 'react-i18next';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    message: '',
    agree: false,
  });
  const {t}=useTranslation()

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!/^[a-zA-Z\s]{2,}$/.test(formData.name)) {
      newErrors.name = 'Enter a valid name (letters only)';
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    if (!formData.agree) {
      newErrors.agree = 'You must agree to continue';
    }
    return newErrors;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validate();
  setErrors(validationErrors);
  if (Object.keys(validationErrors).length > 0) return;

  // agree sahəsini çıxarırıq
  const { agree, ...dataToSend } = formData;

  const { error } = await supabase.from('contact').insert([dataToSend]);

  if (error) {
    Swal.fire('Error', 'Something went wrong', 'error');
  } else {
    Swal.fire('Success', 'Message sent successfully!', 'success');
    setFormData({
      name: '',
      email: '',
      address: '',
      message: '',
      agree: false,
    });
    setErrors({});
  }
};


  return (
    <div className={contact.container}>
      <div className={contact.infoBox}>
        <h3>{t("contact.inf")}</h3>
        <div className={contact.infLeft}><p className={contact.icon}><CiLocationOn /></p> {t("contact.inf1")}<br />{t("contact.inf2")}<br />{t("contact.inf3")}</div>
        <hr />
        <div className={contact.infLeft}><p className={contact.icon}><IoCallOutline /></p> {t("contact.inf4")} <br /> (+91) 9876-543-210</div>
        <hr />
        <div className={contact.infLeft}><p className={contact.icon}><AiOutlineMail /></p> {t("contact.inf5")} <br /> demo@example.com</div>
      </div>

      <form className={contact.formBox} onSubmit={handleSubmit}>
      <div className={contact.formGr}>
        <div className={contact.formGroup}>
          <label className={contact.labels}>{t("contact.name")}</label>
          <input
            type='text'
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
          
        </div>
        {errors.name && <small className={contact.error}>{errors.name}</small>}
        </div>
         <div className={contact.formGr}>
        <div className={contact.formGroup}>
          <label className={contact.labels}>{t("contact.email")}</label>
          <input
            type="email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
         
        </div>
         {errors.email && <small className={contact.error}>{errors.email}</small>}
        </div>

        <div className={contact.formGroup}>
          <label className={contact.labels}>{t("contact.adres")}</label>
          <div className={contact.fileInputWrapper}>
            <input
              type="text"
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
            />
            <span> {t("contact.optional")}</span>
          </div>
        </div>
        
         <div className={contact.formGr}>
        <div className={contact.formGroup}>
          <label className={contact.labels}> {t("contact.message")}</label>
          <textarea
            rows="4"
            value={formData.message}
            onChange={e => setFormData({ ...formData, message: e.target.value })}
          />  
        </div>
         {errors.message && <small className={contact.error}>{errors.message}</small>}
        </div>

        <div className={contact.checkboxWrapper}>
          <input
            type="checkbox"
            checked={formData.agree}
            onChange={e => setFormData({ ...formData, agree: e.target.checked })}
          />
          <label className={contact.labelAgree}>
             {t("contact.agree")}
          </label>
          {errors.agree && <small className={contact.error}>{errors.agree}</small>}
        </div>

        <button
          type="submit"
          className={contact.sendBtn}
          disabled={!formData.agree}
          style={{ opacity: formData.agree ? 1 : 0.6 }}
        >
          {t("contact.send")}
        </button>
      </form>
    </div>
  );
}

export default Contact;
