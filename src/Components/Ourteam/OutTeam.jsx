import React, { useTransition } from 'react'
import team from "./Team.module.css"
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import person1 from "./assets/agent-1.jpg";
import person2 from "./assets/agent-2.jpg"
import person3 from "./assets/agent-3.jpg"
import person4 from "./assets/agent-4.jpg"
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { useTranslation } from 'react-i18next';


function OutTeam() {
    const {t}=useTranslation()
  return (
    <div className={team.container}>
    <div className={team.text}>
        <p className={team.teamTitle}>{t("about.team")}</p>
        <span className={team.titleDet}>{t("about.meet")}</span>
    </div>
    <div className={team.cardCon}>
        <div className={team.card}>
            <div className={team.personimg}>
             <div className={team.overLay}>
                <FaFacebookF className={team.icon}/>
                <FaTwitter className={team.icon}/>
                <FaLinkedinIn className={team.icon}/>
                <FaInstagram className={team.icon}/>
            </div>
                <img src={person2}/>
            </div>
            <div className={team.infor}>
           
                <div>
                    <p className={team.name}>Chris Patt</p>
                    <span className={team.inf}>{t("about.ad1")}</span>
                </div>
                <div className={team.contact}>
                    <div className={team.contactItem}><FaPhone /></div>
                    <div className={team.contactItem}><MdEmail /></div>
                </div>
            </div>
        </div>
         <div className={team.card}>
            <div className={team.personimg}>
             <div className={team.overLay}>
                <FaFacebookF className={team.icon}/>
                <FaTwitter className={team.icon}/>
                <FaLinkedinIn className={team.icon}/>
                <FaInstagram className={team.icon}/>
            </div>
                <img src={person3}/>
            </div>
            <div className={team.infor}>
           
                <div>
                    <p className={team.name}>Chris Patt</p>
                    <span className={team.inf}>{t("about.add2")}</span>
                </div>
                <div className={team.contact}>
                    <div className={team.contactItem}><FaPhone /></div>
                    <div className={team.contactItem}><MdEmail /></div>
                </div>
            </div>
        </div>
         <div className={team.card}>
            <div className={team.personimg}>
             <div className={team.overLay}>
                <FaFacebookF className={team.icon}/>
                <FaTwitter className={team.icon}/>
                <FaLinkedinIn className={team.icon}/>
                <FaInstagram className={team.icon}/>
            </div>
                <img src={person4}/>
            </div>
            <div className={team.infor}>
           
                <div>
                    <p className={team.name}>Chris Patt</p>
                    <span className={team.inf}>{t("about.add3")}</span>
                </div>
                <div className={team.contact}>
                    <div className={team.contactItem}><FaPhone /></div>
                    <div className={team.contactItem}><MdEmail /></div>
                </div>
            </div>
        </div>
        <div className={team.card}>
            <div className={team.personimg}>
             <div className={team.overLay}>
                <FaFacebookF className={team.icon}/>
                <FaTwitter className={team.icon}/>
                <FaLinkedinIn className={team.icon}/>
                <FaInstagram className={team.icon}/>
            </div>
                <img src={person1}/>
            </div>
            <div className={team.infor}>
           
                <div>
                    <p className={team.name}>Chris Patt</p>
                    <span className={team.inf}>{t("about.add2")}</span>
                </div>
                <div className={team.contact}>
                    <div className={team.contactItem}><FaPhone /></div>
                    <div className={team.contactItem}><MdEmail /></div>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default OutTeam