import React from 'react'
import { useNavigate } from "react-router-dom";
import { Header } from "../Componentes/Header";
import { Button } from "@mui/material";
import { Form } from "../Componentes/Form";
import "../style.css";
export const ConsultaSection = () => {
    const navigate = useNavigate();
    const handleClick = () => {
      navigate("/paciente");
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
  
        <Form entidad={"consulta"} />
      </div>
    );
}
