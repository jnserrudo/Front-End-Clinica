import { VentEmergenteVacunas } from "./VentEmergenteVacunas";
import { VentEmergenteAPP } from "./VentEmergenteAPP";
import { VentEmergenteAFP } from "./VentEmergenteAFP";
import { VentEmergenteConfPaciente } from "./VentEmegenteConfPaciente";
import React, { useContext, useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import "../style.css";
import PacientesContext from "../Contexts/PacienteContext";
import { VentEmergenteAlergias } from "./VentEmergenteAlergias";

export const AddPaciente = () => {
  const {
    pacienteToInsert,
    handleChangeInputInsert,
    addPaciente,
    bandInsert,
    handleInsert,
    showVentEmergenteConfPaciente, 
    setShowVentEmergenteConfPaciente,
    handleCloseVentEmergenteConfPaciente
  } = useContext(PacientesContext);

  const [showVentEmergenteVacunas, setShowVentEmergenteVacunas] =
    useState(false);
  const [showVentEmergenteAFP, setShowVentEmergenteAFP] = useState(false);
  const [showVentEmergenteAPP, setShowVentEmergenteAPP] = useState(false);
  const [showVentEmergenteAlergias, setShowVentEmergenteAlergias] = useState(false);



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
  return (
    <div className="form_edit_paciente">
      {/* <h2>
        {paciente.nombre} {paciente.apellido}{" "}
      </h2>
 */}
      <div className="cont_input_edit">
        <TextField
          className={`input_edit`}
          label="Nombre"
          name="nombre"
          variant="outlined"
          type="text"
          value={pacienteToInsert?.nombre ? pacienteToInsert.nombre : ""}
          onChange={(e) => handleChangeInputInsert(e)}
        />
        <TextField
          className={`input_edit`}
          label="Apellido"
          name="apellido"
          variant="outlined"
          type="text"
          value={pacienteToInsert?.apellido ? pacienteToInsert.apellido : ""}
          onChange={(e) => handleChangeInputInsert(e)}
        />
      </div>
      <div className="cont_input_edit">
        <TextField
          className={`input_edit `}
          label="DNI"
          name="dni"
          variant="outlined"
          type="number"
          value={pacienteToInsert?.dni ? pacienteToInsert.dni : 0}
          onChange={(e) => handleChangeInputInsert(e)}
        />
        <TextField
          className={`input_edit `}
          label="Obra Social"
          name="obraSocial"
          variant="outlined"
          type="text"
          value={pacienteToInsert?.obraSocial ? pacienteToInsert?.obraSocial : ""}
          onChange={(e) => handleChangeInputInsert(e)}
        />
      </div>
      <div className="cont_input_edit">
        <TextField
          className={`input_edit`}
          label="Plan"
          name="plan"
          variant="outlined"
          type="text"
          value={pacienteToInsert?.plan ? pacienteToInsert.plan : ""}
          onChange={(e) => handleChangeInputInsert(e)}
        />
        <TextField
          className={`input_edit`}
          label="Domicilio"
          name="domicilio"
          variant="outlined"
          type="text"
          value={pacienteToInsert?.domicilio ? pacienteToInsert.domicilio : ""}
          onChange={(e) => handleChangeInputInsert(e)}
        />
      </div>
      <div className="cont_input_edit">
        <TextField
          className={`input_edit`}
          label="N° Afiliado"
          name="nroAfiliado"
          variant="outlined"
          type="number"
          value={pacienteToInsert?.nroAfiliado ? +pacienteToInsert.nroAfiliado : 0}
          onChange={(e) => handleChangeInputInsert(e)}
        />
        <TextField
          className={`input_edit`}
          label="Celular"
          name="celular"
          variant="outlined"
          type="number"
          value={pacienteToInsert?.celular ? pacienteToInsert.celular : ""}
          onChange={(e) => handleChangeInputInsert(e)}
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
          onClick={()=>setShowVentEmergenteAlergias(true)}
        >
          Alergias
        </Button>
      </div>

      {bandInsert ? (
        <Button
          className="btn_accion_edit_paciente"
          color="success"
          variant="contained"
          style={{ margin: "1rem auto 0" }}
          onClick={() => setShowVentEmergenteConfPaciente(true)}
        >
          Agregar Paciente
        </Button>
      ) : null}

      <VentEmergenteConfPaciente
        isOpen={showVentEmergenteConfPaciente}
        onClose={handleCloseVentEmergenteConfPaciente}
        handleInsert={handleInsert}
      />
      <VentEmergenteVacunas
        isOpen={showVentEmergenteVacunas}
        paciente={pacienteToInsert}
        onClose={handleCloseVentEmergenteVacunas}
        isInsert={true}
      />
      <VentEmergenteAFP
        isOpen={showVentEmergenteAFP}
        paciente={pacienteToInsert}
        onClose={handleCloseVentEmergenteAFP}
        isInsert={true}
      />
      <VentEmergenteAPP
        isOpen={showVentEmergenteAPP}
        paciente={pacienteToInsert}
        onClose={handleCloseVentEmergenteAPP}
        isInsert={true}
      />
      <VentEmergenteAlergias
      isOpen={showVentEmergenteAlergias}
      paciente={pacienteToInsert}
      onClose={handleCloseVentEmergenteAlergias}
      isInsert={true}
      />
    </div>
  );
};
