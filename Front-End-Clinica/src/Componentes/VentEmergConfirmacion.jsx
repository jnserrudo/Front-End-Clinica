import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button } from "@mui/material";
import { Space } from "antd";
import { useContext } from "react";
import ConsultaContext from "../Contexts/ConsultaContext";
import { LoaderEmergente } from "./LoaderEmergente";

export const VentEmergConfirmacion = ({ onClosePadre, mje, isOpen, onClose, handleSi }) => {
  const {bandLoader} = useContext(ConsultaContext)
    if (!isOpen) {
    return null;
  }
  return (
    <div className="popup-container">
      <div className="popup-content">
        <div className="header_vent_emergente">
          <h2 className={`popup-title`}>Confirmación</h2>
          <CloseOutlined className="icon_accion icons" onClick={onClose} />
        </div>

        <p> {mje} </p>
        <Space>
          <Button onClick={async()=>{
            //aca definimos lo que pasara cuando se confirme la operacion
            //como asi tambien cerramos las ventanas emergente, de esta manera podemos reusar este componente en varios casos
            await handleSi()
            onClose()
            onClosePadre()
            }}>Si</Button>
          <Button onClick={onClose}>No</Button>
        </Space>
        {bandLoader? <LoaderEmergente />:null}  

       
      </div>
    </div>
  );
};
