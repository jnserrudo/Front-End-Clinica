
import { entorno } from "./confing";

export const getAllConsultas = async (ndocu) => {
  console.log(ndocu)
  const res = await fetch(`${entorno}/consultas/${ndocu}`);
  const data = await res.json();
  return data;
};

export const getConsultaById = async (id) => {
  const res = await fetch(`${entorno}/consultas/detalle/${id}`);
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


export const updateConsulta = async (
  consulta
) => {
  console.log(consulta)
const res = await fetch(`${entorno}/consultas/${consulta.id}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(consulta),
});
const data = await res.json();
return data;
};

export const insertConsulta = async (
    consulta
) => {
  const res = await fetch(`${entorno}/consultas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(consulta),
  });
  const data = await res.json();
  return data;
};
