import { entorno } from "./confing";

export const getAllPacientes = async () => {
  console.log("antes del fetch get all pacientes");
  const res = await fetch(`${entorno}/pacientes`);
  const data = await res.json();
  return data;
};

export const getPacienteByNdocu = async (dni) => {
  console.log("se trae al paciente con dni: ", dni);
  const res = await fetch(`${entorno}/pacientes/${dni}`);
  const data = await res.json();
  return data;
};

export const updatePaciente = async (paciente) => {
  const res = await fetch(`${entorno}/pacientes/${paciente.dni}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paciente),
  });
  const data = await res.json();
  return data;
};

export const insertPaciente = async (
  nombre,
  apellido,
  dni,
  obraSocial,
  plan,
  domicilio,
  nroAfiliado,
  celular,
  vacunas,
  afp,
  app,
  alergias,
  
  fechaNacimiento,
  nombrePrimerTutor,
  dniPrimerTutor,
  nombreSegundoTutor,
  dniSegundoTutor
) => {
  const res = await fetch(`${entorno}/pacientes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre,
      apellido,
      dni,
      obraSocial,
      plan,
      domicilio,
      nroAfiliado,
      celular,
      vacunas,
      afp,
      app,
      alergias,

      fechaNacimiento,
      nombrePrimerTutor,
      dniPrimerTutor,
      nombreSegundoTutor,
      dniSegundoTutor,
    }),
  });
  const data = await res.json();
  return data;
};



// --- Nueva función para llamar al endpoint de cambio de DNI ---
export const changeDniPaciente = async (dniActual, nuevoDni) => {
  console.log(`Llamando al backend para cambiar DNI: ${dniActual} -> ${nuevoDni}`);
  // Asegúrate que la URL y el método (PUT, PATCH) coincidan con tu API backend
  const res = await fetch(`${entorno}/pacientes/update/dni`, { // O la ruta que definas
    method: "PUT", // O 'PATCH'
    headers: {
      "Content-Type": "application/json",
    },
    // El backend decidirá cómo quiere recibir los datos
    body: JSON.stringify({
        currentDni: dniActual,
        newDni: nuevoDni,
     }),
    // O podrías enviarlo como:
    // body: JSON.stringify({ nuevoDni }), // Si el DNI actual va en la URL: /pacientes/${dniActual}/change-dni
  });
  // Devuelve la respuesta para manejar éxito/error en el contexto
  const data = await res.json();
  console.log("Respuesta del backend al cambiar DNI:", data); // Mantén este log
  if (!res.ok) {
      // Si la API devuelve errores con status code != 2xx, lánzalos para el catch
      throw new Error(data.message || `Error ${res.status}: ${res.statusText}`);
  }
  return data;
};