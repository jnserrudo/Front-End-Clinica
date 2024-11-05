import React, { useContext, useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import ConsultaContext from "../Contexts/ConsultaContext";
import { DataTable } from "./DataTable";
import { VentEmergenteEditConsulta } from "./VentEmergenteEditConsulta";

import { UserAddOutlined, SearchOutlined } from "@ant-design/icons";
import { VentEmergenteAddConsulta } from "./VentEmergenteAddConsulta";
import { useParams } from "react-router-dom";

import jsPDF from "jspdf";
import "jspdf-autotable";

import * as XLSX from "xlsx";

const generateExcel = (consultas, paciente) => {
  // Datos del paciente
  const pacienteData = [
    ["Nombre", paciente.nombre],
    ["Apellido", paciente.apellido],
    ["DNI", paciente.dni],
    ["Domicilio", paciente.domicilio],
    ["Obra Social", paciente.obraSocial],
    ["Plan", paciente.plan],
    ["Nro Afiliado", paciente.nroAfiliado],
    ["Celular", paciente.celular],
    ["Vacunas", paciente.vacunas],
    ["APP", paciente.app],
    ["AFP", paciente.afp ? paciente.afp : "No especificado"],
    ["Alergias", paciente.alergias],
  ];

  // Consultas médicas en formato para Excel
  const consultasData = consultas.map((consulta) => ({
    Tipo: consulta.tipo,
    Motivo: consulta.motivo,
    Evolución: consulta.evolucion,
    Diagnóstico: consulta.diagnostico,
    Tratamiento: consulta.tratamiento,
  }));

  // Crear hojas para el Excel
  const pacienteSheet = XLSX.utils.aoa_to_sheet(pacienteData);
  const consultasSheet = XLSX.utils.json_to_sheet(consultasData);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, pacienteSheet, "Datos Paciente");
  XLSX.utils.book_append_sheet(workbook, consultasSheet, "Consultas Médicas");

  // Generar el archivo
  XLSX.writeFile(
    workbook,
    `Historial_Clinico_${paciente.nombre}_${paciente.apellido}.xlsx`
  );
};


const generatePDF = (consultas, paciente) => {
  const doc = new jsPDF();
  
  // Información del paciente
  doc.setFontSize(12);
  doc.text("Historial Clínico del Paciente", 10, 10);
  doc.setFontSize(10);
  doc.text(`Nombre: ${paciente.nombre}`, 10, 20);
  doc.text(`Apellido: ${paciente.apellido}`, 10, 26);
  doc.text(`DNI: ${paciente.dni}`, 10, 32);
  doc.text(`Domicilio: ${paciente.domicilio}`, 10, 38);
  doc.text(`Obra Social: ${paciente.obraSocial}`, 10, 44);
  doc.text(`Plan: ${paciente.plan}`, 10, 50);
  doc.text(`Nro Afiliado: ${paciente.nroAfiliado}`, 10, 56);
  doc.text(`Celular: ${paciente.celular}`, 10, 62);
  doc.text(`Vacunas: ${paciente.vacunas}`, 10, 68);
  doc.text(`APP: ${paciente.app}`, 10, 74);
  doc.text(`AFP: ${paciente.afp ? paciente.afp : "No especificado"}`, 10, 80);
  doc.text(`Alergias: ${paciente.alergias}`, 10, 86);

  // Espacio antes de las consultas
  doc.setFontSize(12);
  doc.text("Consultas Médicas", 10, 96);
  doc.setFontSize(10);

  // Tabla con los datos de las consultas
  const tableData = consultas.map((consulta) => [
    consulta.tipo,
    consulta.motivo,
    consulta.evolucion,
    consulta.diagnostico,
    consulta.tratamiento,
  ]);

  doc.autoTable({
    head: [["Tipo", "Motivo", "Evolución", "Diagnóstico", "Tratamiento"]],
    body: tableData,
    startY: 100,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [22, 160, 133] }, // Color de la cabecera
  });

  doc.save(`Historial_Clinico_${paciente.nombre}_${paciente.apellido}.pdf`);
};

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
    setDbSearch,
  } = useContext(ConsultaContext);
  const [toBusq, setToBusq] = useState("");

  const { ndocu } = useParams();

  useEffect(() => {
    if (ndocu > 0) {
      setNdocuPaciente(ndocu);
    }
  }, [ndocu]);

  useEffect(() => {
    if (toBusq.length > 0) {
      handleSearch(toBusq);
    } else {
      setDbSearch([]);
    }
  }, [toBusq]);

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
        <Button
          variant="contained"
          color="primary"
          onClick={() => generatePDF(db, pacienteConsulta)}
        >
          Generar PDF
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => generateExcel(db, pacienteConsulta)}
        >
          Generar Excel
        </Button>

        <div className="cont_buscador">
          <TextField
            label="Buscar Consulta"
            onChange={(e) => setToBusq(e.target.value)}
            value={toBusq}
          />
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
          apenPaciente={apenPaciente}
        />
      ) : null}

      {db && !db?.message ? (
        <DataTable db={db} columns={columns} tabla={"consulta"} />
      ) : null}
    </div>
  );
};
