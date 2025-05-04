import { Button, TextField, CircularProgress, Box } from "@mui/material"; // Añade CircularProgress y Box si usas bandLoader
import React, { useContext, useState } from "react";
import { DataTable } from "./DataTable";
import PacientesContext from "../Contexts/PacienteContext";
import { VentEmergenteEditPaciente } from "./VentEmergenteEditPaciente";

import { VentEmergenteChangeDni } from "./VentEmergenteChangeDni";

import { UserAddOutlined, SearchOutlined } from "@ant-design/icons";
import { VentEmergenteAddPaciente } from "./VentEmergenteAddPaciente";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

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
    handleSearch,
    setDbSearch,
    showVentEmergenteChangeDni,
    handleCloseVentEmergenteChangeDni,
    handleConfirmChangeDni,
    pacienteParaCambiarDni,
    bandLoader, // Para mostrar feedback de carga
  } = useContext(PacientesContext);

  const [toBusq, setToBusq] = useState("");

  useEffect(() => {
    if (toBusq.length > 0) {
      handleSearch(toBusq);
    } else {
      setDbSearch([]);
    }
  }, [toBusq]);

  return (
    <div className="paciente_form">
      <h2>PACIENTES</h2>

      <div className="cont_actions_form">
        <Button
          className="btn_agregar_paciente"
          color="success"
          variant="contained"
          onClick={() => setShowVentEmergenteAddPaciente(true)}
        >
          Agregar Paciente <UserAddOutlined className="icons" />
        </Button>
        <div className="cont_buscador">
          <TextField
            label="Buscar Paciente"
            onChange={(e) => setToBusq(e.target.value)}
            value={toBusq}
          />
          {/* <Button  onClick={()=>{
            if(toBusq.length>0){
              handleSearch(toBusq)
            }
            }}>
            <SearchOutlined className="icons icon_buscador"  />
          </Button> */}
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
      <Toaster position="top-center" reverseOrder={false} />
      {/* --- Renderiza la nueva modal --- */}
      <VentEmergenteChangeDni
        isOpen={showVentEmergenteChangeDni}
        onClose={handleCloseVentEmergenteChangeDni}
        currentDni={pacienteParaCambiarDni?.dni} // Pasa el DNI actual del paciente seleccionado
        onSubmit={handleConfirmChangeDni} // Pasa la función que manejará el envío
        isLoading={bandLoader} // Pasa el estado de carga para feedback visual
      />

      {/* Muestra loader global si bandLoader es true */}
      {bandLoader && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {db && !db?.message ? (
        <DataTable db={db} columns={columns} tabla={"paciente"} />
      ) : null}
    </div>
  );
};
