import React from 'react'
import { AddConsulta } from './AddConsulta';
import { CloseOutlined } from "@ant-design/icons";

export const VentEmergenteAddConsulta =({isOpen,onClose, paciente}) => {
  console.log(paciente)
    if (!isOpen) {
        return null;
      }

    const apen=(paciente)=> {
      return `${paciente.apellido.charAt(0).toUpperCase() + paciente.apellido.slice(1)}  , ${paciente.nombre.charAt(0).toUpperCase() + paciente.nombre.slice(1)}`
    }
    // Función para calcular la edad a partir de la fecha de nacimiento
    const calcularEdad = (fechaNacimiento) => {
      if (!fechaNacimiento) return "Edad desconocida"; // Manejo de casos donde no haya fecha
      const fechaNac = new Date(fechaNacimiento);
      const hoy = new Date();
      let edad = hoy.getFullYear() - fechaNac.getFullYear();
      const mes = hoy.getMonth() - fechaNac.getMonth();

      if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
          edad--; // Restar un año si aún no ha pasado el cumpleaños
      }
      return edad;
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <div className="header_vent_emergente">
        <h2 className={`popup-title`} >{/* Consulta */}</h2> 
        <h3>  Paciente: {apen(paciente)}  {paciente.fechaNacimiento && ` - ${calcularEdad(paciente.fechaNacimiento)} años`} </h3>
        
        <CloseOutlined  className='icon_accion icons' onClick={onClose} />
        </div>
        
        <AddConsulta />
       {/*  <button className={`popup-close-btn`} onClick={onClose}>Aceptar</button> */}
      </div>
    </div>
  )
}