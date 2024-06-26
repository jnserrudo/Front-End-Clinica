import React, { useContext } from "react";
import { CloseOutlined } from "@ant-design/icons";
import PacientesContext from "../Contexts/PacienteContext";
import { TextField } from "@mui/material";

export const VentEmergenteAPP = ({
  isOpen,
  onClose,
  paciente,
  isInsert = false,
  bandEdit=true

}) => {
  const { handleChangeInput,handleChangeInputInsert } = useContext(PacientesContext);
  if (!isOpen) {
    return null;
  }
  console.log(paciente);

  return (
    <div className="popup-container">
      <div className="popup-content">
        <div className="header_vent_emergente">
          <h2 className={`popup-title`}>APP</h2>
          <CloseOutlined className="icon_accion icons" onClick={onClose} />
        </div>
        <TextField
          className={`input_edit ${!bandEdit ? "input_disabled" : ""}`}
          label="APP"
          name="app"
          variant="outlined"
          type="text"
          multiline
          rows={4}
          value={paciente.app ? paciente.app : ""}
          disabled={!bandEdit}

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
