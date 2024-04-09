import React from "react";

import "../style.css";

import { BugOutlined, MedicineBoxOutlined, TeamOutlined } from '@ant-design/icons';

export const SectionCard = ({ mje,tipo }) => {
  return (
    <div>
      <div className="section-card">
        <p>{mje}</p>
        {/*<img src={`../../public/vite.svg`} alt="" /> */}
        {tipo=='paciente'?<TeamOutlined width={50} height={5000} className="icons" />:null}
        {tipo=='alergia'?<MedicineBoxOutlined  className="icons" />:null}
        {tipo=='consultorio'?<BugOutlined className="icons" />:null}
        
        
        
      </div>
    </div>
  );
};
