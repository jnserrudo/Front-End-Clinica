import { Button, TextField } from "@mui/material";
import { Select, Space } from "antd";
import React, { useContext, useEffect, useState } from "react";
import "../style.css";
import ConsultaContext from "../Contexts/ConsultaContext";
import { VentEmergConfirmacion } from "./VentEmergConfirmacion";
import { LoaderEmergente } from "./LoaderEmergente";
export const EditConsulta = ({ onCloseEdit, consulta }) => {
  console.log("edit consulta: ", consulta);

  const [bandEdit, setBandEdit] = useState(false);

  const [showVentEmergenteConfirmacion, setShowVentEmergenteConfirmacion] =
    useState(false);

  const {
    pacienteConsulta,
    handleChangeInput,
    bandLoader,
    bandUpdated,
    setBandUpdated,
    handleUpdate,
    handleChangeTipoConsulta,
  } = useContext(ConsultaContext);
  if (!consulta) {
    return null;
  }

  const handleCloseVentEmergente = () => {
    setShowVentEmergenteConfirmacion(false);
  };

  useEffect(() => {
    setBandUpdated(bandEdit);
  }, [bandEdit]);

  return (
    <div className="form_edit_paciente">
      {/* <h2>
          {paciente.nombre} {paciente.apellido}{" "}
        </h2>
   */}
   <Select
        style={{
          width: 220,
        }}
        disabled={!bandEdit}
        value={consulta?.tipo ? consulta?.tipo : "Tipo Consulta"}
        onChange={(e) => handleChangeTipoConsulta(e)}
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
          multiline
          rows={4}
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
          multiline
          rows={4}
        />
      </div>
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
          multiline
          rows={4}
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
          multiline
          rows={4}
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
          onClick={() => setShowVentEmergenteConfirmacion(true)}
        >
          Actualizar
        </Button>
      ) : null}

      <VentEmergConfirmacion
        onClosePadre={onCloseEdit}
        onClose={handleCloseVentEmergente}
        mje={
          "Esta seguro de actualizar la consulta de " +
          pacienteConsulta?.nombre?.toUpperCase() +
          ", " +
          pacienteConsulta?.apellido?.toUpperCase() +
          " ?"
        }
        handleSi={() => handleUpdate(consulta)}
        isOpen={showVentEmergenteConfirmacion}
      />
    </div>
  );
};
