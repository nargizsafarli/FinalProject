import React from 'react'
import button from "./Button.module.css"
import { useTranslation } from 'react-i18next'
import i18n from '../../../i18n/i18next'
import { useNavigate } from 'react-router-dom'

function Button() {
  const {t}=useTranslation()
  const currentLang=i18n.language
  const navigate=useNavigate()
  return (
    <div className={button.button} onClick={()=>navigate(`/${currentLang}/shop`)}>{t("btn.shop")}</div>
  )
}

export default Button