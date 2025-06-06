import React from 'react'
import auth from "./AuthHeader.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

function AuthHeader({title,subtitle}) {
  return (
    <div className={auth.container}>
        <h1 className={auth.tit}>{title}</h1>
        <p>
            <span>Home <FontAwesomeIcon icon={faAngleRight} className={auth.icon} /> </span>
            {subtitle}
        </p>
    </div>
  )
}

export default AuthHeader