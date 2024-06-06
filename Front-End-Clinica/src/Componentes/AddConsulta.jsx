import React, { useContext, useEffect, useState } from "react";
import "../style.css";
import { Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Select, Space } from "antd";

import ConsultaContext from "../Contexts/ConsultaContext";
import { VentEmergConfirmacion } from "./VentEmergConfirmacion";
export const AddConsulta = () => {
  const {
    consultaToInsert,
    handleChangeInputInsert,
    handleCloseConfInsert,
    bandInsert,
    handleChangeTipoConsulta,
    handleCloseVentEmergenteAddConsulta,
  } = useContext(ConsultaContext);

  const [showVentEmergenteConfirmacion, setShowVentEmergenteConfirmacion] =
    useState(false);
  const handleCloseVentEmergente = async () => {
    setShowVentEmergenteConfirmacion(false);
  };
  return (
    <div className="form_edit_paciente">
      <div className="cont_input_edit">
        <TextField
          className={`input_edit `}
          label="Diagnostico"
          name="diagnostico"
          variant="outlined"
          type="text"
          value={
            consultaToInsert.diagnostico ? consultaToInsert.diagnostico : ""
          }
          onChange={(e) => handleChangeInputInsert(e)}
          multiline
          rows={4}
        />
        <TextField
          className={`input_edit `}
          label="Tratamiento"
          name="tratamiento"
          variant="outlined"
          type="text"
          value={
            consultaToInsert.tratamiento ? consultaToInsert.tratamiento : ""
          }
          onChange={(e) => handleChangeInputInsert(e)}
          multiline
          rows={4}
        />
      </div>
      <div className="cont_input_edit">
        <TextField
          className={`input_edit`}
          label="Motivo"
          name="motivo"
          variant="outlined"
          type="text"
          value={consultaToInsert.motivo ? consultaToInsert.motivo : ""}
          onChange={(e) => handleChangeInputInsert(e)}
          multiline
          rows={4}
        />
        <TextField
          className={`input_edit `}
          label="Evolución"
          name="evolucion"
          variant="outlined"
          type="text"
          value={consultaToInsert?.evolucion ? consultaToInsert?.evolucion : ""}
          onChange={(e) => handleChangeInputInsert(e)}
          multiline
          rows={4}
        />
        
      </div>
      <div className="cont_input_edit">
      <TextField
          className={`input_edit `}
          name="fecha"
          variant="outlined"
          type="date"
          value={consultaToInsert?.fecha ? consultaToInsert?.fecha : ""}
          onChange={(e) => handleChangeInputInsert(e)}
          
        />
        <Select
        style={{
          width: 220,
        }}
        defaultValue={"Tipo Consulta"}
        onChange={(e) => handleChangeInputInsert(e)}
        options={[
          {
            value: "presencial",
            label: "Presencial",
          },
          {
            value: "virtual",
            label: "Virtual",
          },
          {
            value: "telefonica",
            label: "Telefonica",
          },
        ]}
      />

      </div>
      
      {bandInsert ? (
        <Button
          className="btn_accion_edit_paciente"
          color="success"
          variant="contained"
          style={{ margin: "1rem auto 0" }}
          onClick={() => setShowVentEmergenteConfirmacion(true)}
        >
          Agregar
        </Button>
      ) : null}

      <VentEmergConfirmacion
        onClosePadre={handleCloseVentEmergenteAddConsulta}
        onClose={handleCloseVentEmergente}
        mje={"Esta seguro de agregar esta consulta?"}
        handleSi={handleCloseConfInsert}
        isOpen={showVentEmergenteConfirmacion}
      />
    </div>
  );
};
