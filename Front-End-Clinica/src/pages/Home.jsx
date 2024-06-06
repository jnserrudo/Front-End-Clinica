import React from "react";
import { SectionCard } from "../Componentes/SectionCard";
import { Header } from "../Componentes/Header";
import { Link } from "react-router-dom";
import "../ventanaEmergente.css";

export const Home = () => {
  return (
    <div>
      <Header />
      <main className="main">
        <Link to={"/paciente"}>
          <SectionCard mje="Pacientes" tipo="paciente" />
        </Link>
        {/* <Link to={"/alergia"} >
          <SectionCard mje="Alergias" tipo="alergia" />
        </Link>
        <Link to={"/consultorio"} >
          <SectionCard mje="Consultorio" tipo="consultorio" />
        </Link> */}
      </main>
    </div>
  );
};
