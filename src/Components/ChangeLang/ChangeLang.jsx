import i18next from "i18next";
import React from "react";
import { Select, Space } from "antd";
import azFlag from "./assets/az-flag-01.png";
import enFlag from "./assets/Flag_of_the_United_Kingdom.png"

function ChangeLang() {
    const handleChange = (value) => {
    i18next.changeLanguage(value);
  };
  return (
    <div>
      <Select
        defaultValue={i18next.language}
        style={{ width: 67 }}
        onChange={handleChange}
         getPopupContainer={(trigger) => trigger.parentNode}
        options={[
          { value: "az", label:
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <img src={azFlag} alt="AZ" width="25" height="18" />
        </div> },
          { value: "en", label: 
          ( <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <img src={enFlag} alt="EN" width="23" height="18" />
        </div>) },
        ]}
      />
    </div>
  );
}

export default ChangeLang;
