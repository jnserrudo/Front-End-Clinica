import React, { useContext, useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import ConsultaContext from "../Contexts/ConsultaContext";
import { DataTable } from "./DataTable";
import { VentEmergenteEditConsulta } from "./VentEmergenteEditConsulta";

import { UserAddOutlined, SearchOutlined } from "@ant-design/icons";
import { VentEmergenteAddConsulta } from "./VentEmergenteAddConsulta";
import { useParams } from "react-router-dom";

export const ConsultaForm = () => {
  const {
    db,
    pacienteConsulta,
    setNdocuPaciente,
    columns,
    consultaSelected,
    showVentEmergenteEditConsulta,
    handleCloseVentEmergenteEditConsulta,
    showVentEmergenteAddConsulta,
    setShowVentEmergenteAddConsulta,
    handleCloseVentEmergenteAddConsulta,
    apenPaciente,
    handleSearch,
    setDbSearch
  } = useContext(ConsultaContext);
  const [toBusq, setToBusq] = useState("")

  const { ndocu } = useParams();

  useEffect(() => {
    if (ndocu > 0) {
      setNdocuPaciente(ndocu);
    }
  }, [ndocu]);

  useEffect(()=>{
    if(toBusq.length>0){
      handleSearch(toBusq)
    }else{
      setDbSearch([])
    }
  },[toBusq])

  return (
    <div className="paciente_form">
      <h2>CONSULTAS</h2>
      <h3>{apenPaciente}</h3>
      <div className="cont_actions_form">
        <Button
          className="btn_agregar_paciente"
          color="success"
          variant="contained"
          onClick={() => setShowVentEmergenteAddConsulta(true)}
        >
          Agregar Consulta <UserAddOutlined className="icons" />
        </Button>
        <div className="cont_buscador">
          <TextField label="Buscar Consulta"  onChange={(e)=>setToBusq(e.target.value)} value={toBusq}  />
          <Button>
            <SearchOutlined className="icons icon_buscador" />
          </Button>
        </div>
      </div>

      <VentEmergenteAddConsulta
        isOpen={showVentEmergenteAddConsulta}
        onClose={handleCloseVentEmergenteAddConsulta}
      />
      {consultaSelected ? (
        <VentEmergenteEditConsulta
          isOpen={showVentEmergenteEditConsulta}
          consultaSelected={consultaSelected}
          onClose={handleCloseVentEmergenteEditConsulta}
          apenPaciente={apenPaciente }
        />
      ) : null}

      {db&&!db?.message ? <DataTable db={db} columns={columns} tabla={'consulta'} /> : null}
    </div>
  );
};
