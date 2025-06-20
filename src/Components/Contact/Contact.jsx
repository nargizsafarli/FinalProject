import React from 'react';
import contact from './Contact.module.css';
import { CiLocationOn } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";

function Contact() {
  return (
    <div className={contact.container}>
      <div className={contact.infoBox}>
        <h3>Store information</h3>
        <div className={contact.infLeft}><p className={contact.icon}><CiLocationOn /></p> Bloomis Demo Store<br />507-Union Trade Center<br />France</div>
        <hr />
        <div className={contact.infLeft}><p className={contact.icon}><IoCallOutline /></p> Call us: <br /> (+91) 9876-543-210</div>
        <hr />
        <div className={contact.infLeft}><p className={contact.icon}><AiOutlineMail /></p> Email us: <br /> demo@example.com</div>
      </div>

      {/* Right Side - Contact Form */}
      <form className={contact.formBox}>
        <div className={contact.formGroup}>
          <label className={contact.labels}>Subject</label>
          <select>
            <option>Customer service</option>
            <option>Technical support</option>
            <option>Other</option>
          </select>
        </div>

        <div className={contact.formGroup}>
          <label className={contact.labels}>Email address</label>
          <input type="email" placeholder="your@email.com" />
        </div>

        <div className={contact.formGroup}>
          <label className={contact.labels}>Attachment</label>
          <div className={contact.fileInputWrapper}>
            <input type="file" />
            <span>optional</span>
          </div>
        </div>

        <div className={contact.formGroup}>
          <label className={contact.labels}>Message</label>
          <textarea rows="4" placeholder="How can we help?" />
        </div>

        <div className={contact.checkboxWrapper}>
          <input type="checkbox" />
          <label className={contact.labelAgree}>I agree to the terms and conditions and the privacy policy</label>
        </div>

        <button type="submit" className={contact.sendBtn}>SEND</button>
      </form>
    </div>
  );
}

export default Contact;
