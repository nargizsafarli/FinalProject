import React from "react";
import detSec from "./DetailSec.module.css"
import { Link } from "react-router-dom";

function DetailBack() {
  return (
    <div className={detSec.container}>
      <p> <Link to={"/"} className={detSec.link}> HOME </Link> | PLANT </p>
    </div>
  );
}

export default DetailBack;
