import React from 'react'
import { AddConsulta } from './AddConsulta';
import { CloseOutlined } from "@ant-design/icons";

export const VentEmergenteAddConsulta =({isOpen,onClose}) => {
    if (!isOpen) {
        return null;
      }

    

  return (
    <div className="popup-container">
      <div className="popup-content">
        <div className="header_vent_emergente">
        <h2 className={`popup-title`} >Consulta</h2> 
        <CloseOutlined  className='icon_accion icons' onClick={onClose} />
        </div>
        
        <AddConsulta />
        <button className={`popup-close-btn`} onClick={onClose}>Aceptar</button>
      </div>
    </div>
  )
}