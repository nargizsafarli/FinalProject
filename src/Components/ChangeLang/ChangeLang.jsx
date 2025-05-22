import i18next from "i18next";
import React from "react";
import { Select, Space } from "antd";

function ChangeLang() {
    const handleChange = (value) => {
    i18next.changeLanguage(value);
  };
  return (
    <div>
      <Select
        defaultValue={i18next.language}
        style={{ width: 80 }}
        onChange={handleChange}
         getPopupContainer={(trigger) => trigger.parentNode}
        options={[
          { value: "az", label: "Aze" },
          { value: "en", label: "Eng" },
        ]}
      />
    </div>
  );
}

export default ChangeLang;
