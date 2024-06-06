import { Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { DataTable } from "./DataTable";
import PacientesContext from "../Contexts/PacienteContext";
import { VentEmergenteEditPaciente } from "./VentEmergenteEditPaciente";

import { UserAddOutlined, SearchOutlined } from "@ant-design/icons";
import { VentEmergenteAddPaciente } from "./VentEmergenteAddPaciente";
import { useEffect } from "react";

export const PacienteForm = () => {
  //usaremos el contexto del paciente
  const {
    db,
    columns,
    pacienteSelected,
    showVentEmergenteEditPaciente,
    handleCloseVentEmergenteEditPaciente,
    showVentEmergenteAddPaciente,
    setShowVentEmergenteAddPaciente,
    handleCloseVentEmergenteAddPaciente,
    handleSearch
  } = useContext(PacientesContext);

  const [toBusq, setToBusq] = useState("")

  useEffect(()=>{
    if(toBusq.length>0){
      handleSearch(toBusq)
    }
  },[toBusq])

  return (
    <div className="paciente_form">
      <h2>PACIENTES</h2>

      <div className="cont_actions_form">
        <Button  className="btn_agregar_paciente" color="success" variant="contained" onClick={()=>setShowVentEmergenteAddPaciente(true)} >
          Agregar Paciente <UserAddOutlined className="icons" />
        </Button>
        <div className="cont_buscador">
          <TextField label="Buscar Paciente" onChange={(e)=>setToBusq(e.target.value)} value={toBusq} />
          <Button  onClick={()=>{
            if(toBusq.length>0){
              handleSearch(toBusq)
            }
            }}>
            <SearchOutlined className="icons icon_buscador"  />
          </Button>
        </div>
      </div>

      <VentEmergenteAddPaciente
        isOpen={showVentEmergenteAddPaciente}
        onClose={handleCloseVentEmergenteAddPaciente}
      />
      <VentEmergenteEditPaciente
        isOpen={showVentEmergenteEditPaciente}
        pacienteSelected={pacienteSelected}
        onClose={handleCloseVentEmergenteEditPaciente}
      />

      {db ? <DataTable db={db} columns={columns} /> : null}
    </div>
  );
};
