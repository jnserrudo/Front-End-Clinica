import React, { useContext } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { TextField } from "@mui/material";
import PacientesContext from "../Contexts/PacienteContext";

export const VentEmergenteVacunas = ({
  isOpen,
  onClose,
  paciente,
  isInsert = false,
}) => {
  const { handleChangeInput, handleChangeInputInsert } =
    useContext(PacientesContext);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup-container">
      <div className="popup-content">
        <div className="header_vent_emergente">
          <h2 className={`popup-title`}>VACUNAS</h2>
          <CloseOutlined className="icon_accion icons" onClick={onClose} />
        </div>

        <TextField
          className="input_edit"
          label="Vacunas"
          name="vacunas"
          variant="outlined"
          type="text"
          value={paciente.vacunas ? paciente.vacunas : ""}
          onChange={(e) =>
            isInsert ? handleChangeInputInsert(e) : handleChangeInput(e)
          }
        />
        <button className={`popup-close-btn`} onClick={onClose}>
          Aceptar
        </button>
      </div>
    </div>
  );
};
