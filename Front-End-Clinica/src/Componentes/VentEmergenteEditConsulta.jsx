import React from 'react'
import {CloseOutlined} from '@ant-design/icons';
import { EditConsulta } from './EditConsulta';

export const VentEmergenteEditConsulta = ({isOpen,onClose,consultaSelected,apenPaciente}) => {
    if (!isOpen) {
        return null;
      }

    

  return (
    <div className="popup-container">
      <div className="popup-content">
        <div className="header_vent_emergente">
        <h2 className={`popup-title`} >Consulta {apenPaciente}</h2> 
        <CloseOutlined  className='icon_accion icons' onClick={onClose} />
        </div>
        
        {consultaSelected?<EditConsulta onCloseEdit={onClose} consulta={consultaSelected}/>:null}  
        
        <button className={`popup-close-btn`} onClick={onClose}>Aceptar</button>
      </div>
    </div>
  )
}
