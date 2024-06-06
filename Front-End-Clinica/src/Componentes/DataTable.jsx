import { DataGrid } from "@mui/x-data-grid";
import { Table } from "antd";
import React from "react";
import { useContext } from "react";
import PacientesContext from "../Contexts/PacienteContext";

export const DataTable = ({
  db,
  columns,
  handleAllSelected,
  handleOneSelected,
}) => {
  //aca se gestionara el funcionamiento de las tablas

  const {dbSearch}=useContext(PacientesContext)

  console.log("db datatable:", db);
  return (
    <Table
      className="tabla"
      columns={columns}
      /* pagination={{
          position: [top, bottom],
        }} */
      pagination={{ position: ["none", "bottomRight"], pageSize: 5 }}
      /* el pageSize determina la cantidad filas por tabla */
      dataSource={dbSearch.length>0?dbSearch:db}
    />
  );
};
