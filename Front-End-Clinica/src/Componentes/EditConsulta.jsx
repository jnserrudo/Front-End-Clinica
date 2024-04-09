import { Button, TextField } from "@mui/material";
import { Space } from "antd";
import React, { useContext, useState } from "react";
import "../style.css";
import ConsultaContext from "../Contexts/ConsultaContext";
export const EditConsulta = ({consulta}) => {
    console.log("edit consulta: ", consulta);    
  
    const [bandEdit, setBandEdit] = useState(false);
    const [bandUpdated, setBandUpdated] = useState(false);
  
    const { handleChangeInput } = useContext(ConsultaContext);
    if (!consulta) {
      return null;
    }
    return (
      <div className="form_edit_paciente">
        {/* <h2>
          {paciente.nombre} {paciente.apellido}{" "}
        </h2>
   */}
        <div className="cont_input_edit">
          <TextField
            className={`input_edit ${!bandEdit ? "input_disabled" : ""}`}
            label="Diagnostico"
            name="diagnostico"
            variant="outlined"
            type="text"
            disabled={!bandEdit}
            value={consulta.diagnostico ? consulta.diagnostico : ""}
            onChange={(e) => handleChangeInput(e)}
          />
          <TextField
            className={`input_edit ${!bandEdit ? "input_disabled" : ""}`}
            label="Tratamiento"
            name="tratamiento"
            variant="outlined"
            type="text"
            disabled={!bandEdit}
            value={consulta.tratamiento ? consulta.tratamiento : ""}
            onChange={(e) => handleChangeInput(e)}
          />
        </div>
        <div className="cont_input_edit">
          <TextField
            className={`input_edit ${!bandEdit ? "input_disabled" : ""}`}
            label="Motivo"
            name="motivo"
            variant="outlined"
            type="text"
            disabled={!bandEdit}
            value={consulta.motivo ? consulta.motivo : ""}
            onChange={(e) => handleChangeInput(e)}
          />
          <TextField
            className={`input_edit ${!bandEdit ? "input_disabled" : ""}`}
            label="Evolución"
            name="evolucion"
            variant="outlined"
            type="text"
            disabled={!bandEdit}
            value={consulta?.evolucion ? consulta?.evolucion : ""}
            onChange={(e) => handleChangeInput(e)}
          />
        </div>
        
        
        <div className="cont_btns_acciones_paciente">
          
  
          {!bandEdit ? (
            <Button
              className="btn_accion_edit_paciente"
              variant="outlined"
              onClick={() => setBandEdit(true)}
            >
              Editar
            </Button>
          ) : (
            <Button
              className="btn_accion_edit_paciente"
              variant="contained"
              color="info"
              onClick={() => setBandEdit(false)}
            >
              Cancelar
            </Button>
          )}
        </div>
  
        {bandUpdated ? (
          <Button
            className="btn_accion_edit_paciente"
            color="success"
            variant="contained"
            style={{ margin: "1rem auto 0" }}
          >
            Actualizar
          </Button>
        ) : null}
  
        
      </div>
    );
}
