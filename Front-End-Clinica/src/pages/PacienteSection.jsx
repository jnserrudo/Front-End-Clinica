import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../Componentes/Header";
import { Button } from "@mui/material";
import { Form } from "../Componentes/Form";
import "../style.css";
export const PacienteSection = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <div>
      <Header />
      <div className="cont_btn_volver">
        <Button
          variant="contained"
          className="btn_volver"
          onClick={handleClick}
        >
          Volver
        </Button>
      </div>

      <Form entidad={"paciente"} />
    </div>
  );
};
