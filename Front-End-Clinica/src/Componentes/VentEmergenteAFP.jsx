import React, { useContext } from "react";
import { CloseOutlined } from "@ant-design/icons";
import PacientesContext from "../Contexts/PacienteContext";
import { TextField } from "@mui/material";

export const VentEmergenteAFP = ({
  isOpen,
  onClose,
  paciente,
  isInsert = false,
}) => {
  const { handleChangeInput ,handleChangeInputInsert} = useContext(PacientesContext);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup-container">
      <div className="popup-content">
        <div className="header_vent_emergente">
          <h2 className={`popup-title`}>AFP</h2>
          <CloseOutlined className="icon_accion icons" onClick={onClose} />
        </div>
        <TextField
          className="input_edit"
          label="AFP"
          name="afp"
          variant="outlined"
          type="text"
          value={paciente.afp ? paciente.afp : ""}
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
