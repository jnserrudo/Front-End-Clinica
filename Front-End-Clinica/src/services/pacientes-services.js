import { entorno } from "./confing";

export const getAllPacientes = async () => {
  const res = await fetch(`${entorno}/pacientes`);
  const data = await res.json();
  return data;
};

export const getPacienteByNdocu = async (ndocu) => {
  const res = await fetch(`${entorno}/pacientes/${ndocu}`);
  const data = await res.json();
  return data;
};

export const insertPaciente = async (
  ndocu,
  obraSocial,
  plan,
  domicilio,
  nroAfiliado,
  telefono,
  vacunas,
  afp,
  app,
  alergias
) => {
  const res = await fetch(`${entorno}/pacientes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ndocu,
      obraSocial,
      plan,
      domicilio,
      nroAfiliado,
      telefono,
      vacunas,
      afp,
      app,
      alergias,
    }),
  });
  const data = await res.json();
  return data;
};
