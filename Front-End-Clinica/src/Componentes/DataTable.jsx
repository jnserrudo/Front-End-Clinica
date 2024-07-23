import { DataGrid } from "@mui/x-data-grid";
import { Table } from "antd";
import React from "react";
import { useContext } from "react";
import PacientesContext from "../Contexts/PacienteContext";
import ConsultaContext from "../Contexts/ConsultaContext";

export const DataTable = ({
  db,
  columns,
  tabla,
  handleAllSelected,
  handleOneSelected,
}) => {
  //aca se gestionara el funcionamiento de las tablas

  const { dbSearch } = useContext(PacientesContext);
  const { dbSearchConsulta } = useContext(ConsultaContext);

  console.log("db datatable:", db, tabla, dbSearchConsulta, dbSearch);
  return (
    <Table
      className="tabla"
      loading={
        tabla == "paciente"
          ? dbSearch.length > 0
            ? false
            : db.length > 0
            ? false
            : true
          : dbSearchConsulta.length > 0
          ? false
          : db.length > 0
          ? false
          : true
      }
      columns={columns}
      /* pagination={{
          position: [top, bottom],
        }} */
      pagination={{ position: ["none", "bottomRight"], pageSize: 5 }}
      /* el pageSize determina la cantidad filas por tabla */
      dataSource={
        tabla == "paciente"
          ? dbSearch.length > 0
            ? dbSearch
            : db
          : dbSearchConsulta.length > 0
          ? dbSearchConsulta
          : db
      }
    />
  );
};
