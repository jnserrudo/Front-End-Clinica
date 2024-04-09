import React, { useContext, useEffect } from "react";
import { EditPaciente } from "./EditPaciente";

import { CloseOutlined } from "@ant-design/icons";
import { Space } from "antd";
import PacientesContext from "../Contexts/PacienteContext";
import { LoaderEmergente } from "./LoaderEmergente";
export const VentEmergenteConfPaciente = ({
  isOpen,
  onClose,
  handleInsert,
}) => {
  if (!isOpen) {
    return null;
  }
  const {handleCloseConfInsert,bandLoader}=useContext(PacientesContext)

  return (
    <div className="popup-container">
      <div className="popup-content">
        <div className="header_vent_emergente">
          <h2 className={`popup-title`}>Paciente</h2>
          <CloseOutlined className="icon_accion icons" onClick={onClose} />
        </div>
        <p className="popup-message">
          {" "}
          ¿Esta seguro de agregar este paciente?{" "}
        </p>
        <Space>
          <button className={`popup-close-btn`} onClick={onClose}>
            No
          </button>

          <button className={`popup-close-btn`} onClick={handleCloseConfInsert}>
            Si
          </button>
        </Space>
        {bandLoader?<LoaderEmergente />:null}
      </div>
    </div>
  );
};
