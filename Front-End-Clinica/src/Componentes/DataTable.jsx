import { DataGrid } from "@mui/x-data-grid";
import { Table } from "antd";
import React from "react";

export const DataTable = ({
  db,
  columns,
  handleAllSelected,
  handleOneSelected,
}) => {
  //aca se gestionara el funcionamiento de las tablas

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
      dataSource={db}
    />
  );
};
