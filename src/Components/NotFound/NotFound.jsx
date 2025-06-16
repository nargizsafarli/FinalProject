import React from "react";
import found from "./notFound.module.css";
import notFound from "./assets/404-min.png";

function NotFound() {
  return (
    <div className={found.container}>
      <img src={notFound} />
      <p className={found.text}>OPPS! PAGE NOT BE FOUND</p>
      <span className={found.spanText}>
        Sorry but the page you are looking for does not exist, have been
        removed, name changed or is temporarily unavailable.
      </span>
    </div>
  );
}

export default NotFound;
