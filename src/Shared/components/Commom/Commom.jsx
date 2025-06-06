import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import commom from "./Commom.module.css";
import React from "react";

function Commom({ title, subtitle }) {
  return (
    <div>
      <div className={commom.container}>
        <h1 className={commom.tit}>{title}</h1>
        <p>
          <span>
            Home <FontAwesomeIcon icon={faAngleRight} className={commom.icon} />{" "}
          </span>
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export default Commom;
