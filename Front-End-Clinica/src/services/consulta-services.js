import { entorno } from "./confing";

export const getAllConsultas = async (ndocu) => {
  const res = await fetch(`${entorno}/consultas/${ndocu}`);
  const data = await res.json();
  return data;
};

export const getConsultaById = async (id) => {
  const res = await fetch(`${entorno}/consultas/${id}`);
  const data = await res.json();
  return data;
};

export const getConsultaByNdocu = async (ndocu) => {
  console.log("antes del fetch")
  const res = await fetch(`${entorno}/consultas/${ndocu}`);
  const data = await res.json();
  console.log("despues del fetch",data)
  return data;
};
export const getConsultaByNdocuDetalle = async (ndocu) => {
  console.log("antes del fetch")
  const res = await fetch(`${entorno}/consultas/detalle/${ndocu}`);
  const data = await res.json();
  console.log("despues del fetch",data)
  return data;
};

export const getConsultaByIdDetalle = async (id) => {
  console.log("antes del fetch")
  const res = await fetch(`${entorno}/consultas/detalle/${id}`);
  const data = await res.json();
  console.log("despues del fetch",data)
  return data;
};

export const insertConsulta = async (
    ndocu,
    fecha,
    motivo,
    diagnostico,
    tratamiento,
    evolucion
) => {
  const res = await fetch(`${entorno}/consultas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ndocu,
      fecha,
      motivo,
      diagnostico,
      tratamiento,
      evolucion
      
    }),
  });
  const data = await res.json();
  return data;
};
