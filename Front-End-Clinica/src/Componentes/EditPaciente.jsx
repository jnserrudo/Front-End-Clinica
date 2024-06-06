import { Button, TextField } from "@mui/material";
import { Space } from "antd";
import React, { useContext, useEffect, useState } from "react";
import "../style.css";
import PacientesContext from "../Contexts/PacienteContext";
import { VentEmergenteVacunas } from "./VentEmergenteVacunas";
import { VentEmergenteAPP } from "./VentEmergenteAPP";
import { VentEmergenteAFP } from "./VentEmergenteAFP";
import ConsultaContext from "../Contexts/ConsultaContext";
import { useNavigate } from "react-router-dom";
import { VentEmergenteAlergias } from "./VentEmergenteAlergias";
import { VentEmergConfirmacion } from "./VentEmergConfirmacion";
export const EditPaciente = ({ paciente,onCloseEdit }) => {
  console.log("edit paciente: ", paciente);

  const navigate = useNavigate();
  const handleShowConsulta = (ndocu) => {
    navigate("/paciente/" + ndocu);
  };

  const [bandEdit, setBandEdit] = useState(false);
  const [bandUpdated, setBandUpdated] = useState(false);
  const [showVentEmergenteConfirmacion, setShowVentEmergenteConfirmacion] =
    useState(false);

  const [showVentEmergenteVacunas, setShowVentEmergenteVacunas] =
    useState(false);
  const [showVentEmergenteAFP, setShowVentEmergenteAFP] = useState(false);
  const [showVentEmergenteAPP, setShowVentEmergenteAPP] = useState(false);
  const [showVentEmergenteAlergias, setShowVentEmergenteAlergias] =
    useState(false);

  const handleCloseVentEmergenteVacunas = () => {
    setShowVentEmergenteVacunas(false);
  };
  const handleCloseVentEmergenteAFP = () => {
    setShowVentEmergenteAFP(false);
  };
  const handleCloseVentEmergenteAPP = () => {
    setShowVentEmergenteAPP(false);
  };
  const handleCloseVentEmergenteAlergias = () => {
    setShowVentEmergenteAlergias(false);
  };
  const handleCloseVentEmergente = () => {
    setShowVentEmergenteConfirmacion(false);
  };

  const { handleChangeInput,handleUpdate } = useContext(PacientesContext);
  if (!paciente) {
    return null;
  }

  console.log("viendo al paciente: ",paciente)
  useEffect(() => {
    setBandUpdated(bandEdit);
  }, [bandEdit]);

  return (
    <div className="form_edit_paciente">
      {/* <h2>
        {paciente.nombre} {paciente.apellido}{" "}
      </h2>
 */}
      <div className="cont_input_edit">
        <TextField
          className={`input_edit ${!bandEdit ? "input_disabled" : ""}`}
          label="Nombre"
          name="nombre"
          variant="outlined"
          type="text"
          disabled={!bandEdit}
          value={paciente.nombre ? paciente.nombre : ""}
          onChange={(e) => handleChangeInput(e)}
        />
        <TextField
          className={`input_edit ${!bandEdit ? "input_disabled" : ""}`}
          label="Apellido"
          name="apellido"
          variant="outlined"
          type="text"
          disabled={!bandEdit}
          value={paciente.apellido ? paciente.apellido : ""}
          onChange={(e) => handleChangeInput(e)}
        />
      </div>
      <div className="cont_input_edit">
        <TextField
          className={`input_edit ${!bandEdit ? "input_disabled" : ""}`}
          label="DNI"
          name="ndocu"
          variant="outlined"
          type="number"
          disabled={!bandEdit}
          value={ paciente?.dni ? +paciente?.dni : 0 }
          onChange={(e) => handleChangeInput(e)}
        />
        <TextField
          className={`input_edit ${!bandEdit ? "input_disabled" : ""}`}
          label="Obra Social"
          name="obraSocial"
          variant="outlined"
          type="text"
          disabled={!bandEdit}
          value={paciente?.obraSocial ? paciente?.obraSocial : ""}
          onChange={(e) => handleChangeInput(e)}
        />
      </div>
      <div>
        <TextField
          className={`input_edit ${!bandEdit ? "input_disabled" : ""}`}
          label="Plan"
          name="plan"
          variant="outlined"
          type="text"
          disabled={!bandEdit}
          value={paciente.plan ? paciente.plan : ""}
          onChange={(e) => handleChangeInput(e)}
        />
        <TextField
          className={`input_edit ${!bandEdit ? "input_disabled" : ""}`}
          label="Domicilio"
          name="domicilio"
          variant="outlined"
          type="text"
          disabled={!bandEdit}
          value={paciente.domicilio ? paciente.domicilio : ""}
          onChange={(e) => handleChangeInput(e)}
        />
      </div>
      <div className="cont_input_edit">
        <TextField
          className={`input_edit ${!bandEdit ? "input_disabled" : ""}`}
          label="N° Afiliado"
          name="nroAfiliado"
          variant="outlined"
          type="text"
          disabled={!bandEdit}
          value={paciente.nroAfiliado ? +paciente.nroAfiliado : 0}
          onChange={(e) => handleChangeInput(e)}
        />
        <TextField
          className={`input_edit ${!bandEdit ? "input_disabled" : ""}`}
          label="Celular"
          name="celular"
          variant="outlined"
          type="number"
          disabled={!bandEdit}
          value={paciente.celular ? paciente.celular : ""}
          onChange={(e) => handleChangeInput(e)}
        />
      </div>
      <div className="cont_input_edit">
        <Button
          variant="contained"
          color="secondary"
          size="large"
          className="input_edit"
          onClick={() => setShowVentEmergenteVacunas(true)}
        >
          Vacunas
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          className="input_edit"
          onClick={() => setShowVentEmergenteAFP(true)}
        >
          AFP
        </Button>
      </div>
      <div className="cont_input_edit">
        <Button
          variant="contained"
          color="secondary"
          size="large"
          className="input_edit"
          onClick={() => setShowVentEmergenteAPP(true)}
        >
          APP
        </Button>
        <Button
          className="input_edit"
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => setShowVentEmergenteAlergias(true)}
        >
          Alergias
        </Button>
      </div>
      <div className="cont_btns_acciones_paciente">
        <Button
          className="btn_accion_edit_paciente"
          variant="contained"
          onClick={() => handleShowConsulta(paciente.dni)}
        >
          Consultas
        </Button>

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

      <VentEmergenteVacunas
        isOpen={showVentEmergenteVacunas}
        paciente={paciente}
        bandEdit={bandEdit}
        onClose={handleCloseVentEmergenteVacunas}
      />
      <VentEmergenteAFP
        isOpen={showVentEmergenteAFP}
        paciente={paciente}
        bandEdit={bandEdit}
        onClose={handleCloseVentEmergenteAFP}
      />
      <VentEmergenteAPP
        isOpen={showVentEmergenteAPP}
        paciente={paciente}
        bandEdit={bandEdit}
        onClose={handleCloseVentEmergenteAPP}
      />
      <VentEmergenteAlergias
        isOpen={showVentEmergenteAlergias}
        bandEdit={bandEdit}
        paciente={paciente}
        onClose={handleCloseVentEmergenteAlergias}
      />

      <VentEmergConfirmacion
        onClosePadre={onCloseEdit}
        onClose={handleCloseVentEmergente}
        mje={
          "Esta seguro de actualizar los datos del paciente " +
         /*  paciente?.nombre?.toUpperCase() +
          ", " +
          paciente?.apellido?.toUpperCase() + */
          " ?"
        }
        handleSi={() => handleUpdate(paciente)}
        isOpen={showVentEmergenteConfirmacion}
      />
    </div>
  );
};

/* 
<TextField
                className="input_carga plan_anioc_edicion_input"
                id="outlined-basic"
                label="Año de Cursado"
                variant="outlined"
                name="añoc"
                type="number"
                onChange={(e) => {
                  handleChange(e);
                  setCurso({
                    ...curso,
                    añoc: e.target.value,
                  });
                }}
                onBlur={() => handleBlurElementosForm("añoc")}
                value={curso.añoc ? curso.añoc : ""}
              />
*/
