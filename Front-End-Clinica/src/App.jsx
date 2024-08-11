import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import "./style.css";
import { PacienteSection } from "./pages/PacienteSection";
import { AlergiaSection } from "./pages/AlergiaSection";
import { ConsultorioSection } from "./pages/ConsultorioSection";
import { PacientesProvider } from "./Contexts/PacienteContext";
import { ConsultaSection } from "./Componentes/ConsultaSection";
import { ConsultaProvider } from "./Contexts/ConsultaContext";

function App() {
  return (
    <>
      <PacientesProvider>
        <ConsultaProvider>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/paciente" element={<PacienteSection />}></Route>
              <Route
                path="/paciente/:ndocu"
                element={<ConsultaSection />}
              ></Route>
              <Route path="/alergia" element={<AlergiaSection />}></Route>
              <Route
                path="/consultorio"
                element={<ConsultorioSection />}
              ></Route>
              <Route path="/*" element={<></>}></Route>
            </Routes>
          </HashRouter>
        </ConsultaProvider>
      </PacientesProvider>
    </>
  );
}

export default App;
