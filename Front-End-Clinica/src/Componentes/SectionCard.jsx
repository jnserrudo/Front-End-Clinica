import React from "react";

import "../style.css";

import { BugOutlined, MedicineBoxOutlined, TeamOutlined } from '@ant-design/icons';;

export const SectionCard = ({ mje }) => {
  return (
    <div>
      <div className="section-card">
        <p>{mje}</p>
        {/*<img src={`../../public/vite.svg`} alt="" /> */}
        <TeamOutlined />
        <MedicineBoxOutlined />
        <BugOutlined />
      </div>
    </div>
  );
};
