import React, { createContext, useEffect, useState } from "react";
import {
  getAllPacientes,
  getPacienteByNdocu,
  insertPaciente,
  updatePaciente,
  changeDniPaciente
} from "../services/pacientes-services";
import { Space, Tag } from "antd";
import { EditOutlined, DragOutlined, IdcardOutlined } from "@ant-design/icons";
import toast, { Toaster } from "react-hot-toast";

const PacientesContext = createContext();
export const PacientesProvider = ({ children }) => {
  const [db, setDb] = useState([]);
  const [dbSearch, setDbSearch] = useState([]);
  const [ndocuPaciente, setNdocuPaciente] = useState(0);
  const [pacienteSelected, setPacienteSelected] = useState({});

  const [showVentEmergenteEditPaciente, setShowVentEmergenteEditPaciente] =
    useState(false);
  const [showVentEmergenteAddPaciente, setShowVentEmergenteAddPaciente] =
    useState(false);
  const [pacienteToInsert, setPacienteToInsert] = useState({});
  const [bandInsert, setBandInsert] = useState(false);

  const [showVentEmergenteConfPaciente, setShowVentEmergenteConfPaciente] =
    useState(false);

  const [bandLoader, setBandLoader] = useState(false);

  // --- Inicio: Nuevos estados y handlers para Cambiar DNI ---
  const [showVentEmergenteChangeDni, setShowVentEmergenteChangeDni] =
    useState(false);
  const [pacienteParaCambiarDni, setPacienteParaCambiarDni] = useState(null); // Guarda el paciente seleccionado para esta acción

  const handleOpenVentEmergenteChangeDni = (paciente) => {
    console.log("Abriendo modal para cambiar DNI de:", paciente);
    setPacienteParaCambiarDni(paciente); // Guarda el paciente completo o al menos el DNI actual
    setShowVentEmergenteChangeDni(true);
  };

  const handleCloseVentEmergenteChangeDni = () => {
    setShowVentEmergenteChangeDni(false);
    setPacienteParaCambiarDni(null); // Limpia al cerrar
  };

  const handleConfirmChangeDni = async (nuevoDni) => {
    if (!pacienteParaCambiarDni || !nuevoDni) {
      console.error("Faltan datos para cambiar el DNI");
      // Opcional: Mostrar error al usuario en la modal
      return;
    }
    // Validación extra: Asegurarse que el nuevo DNI sea diferente y válido
    const dniActual = pacienteParaCambiarDni.dni;
    if (String(nuevoDni) === String(dniActual)) {
      alert("El nuevo DNI debe ser diferente al actual."); // O mostrar en la modal
      return;
    }
    if (!/^\d+$/.test(nuevoDni) || parseInt(nuevoDni, 10) <= 0) {
      alert("El nuevo DNI debe ser un número positivo."); // O mostrar en la modal
      return;
    }

    console.log(`Intentando cambiar DNI de ${dniActual} a ${nuevoDni}`);
    setBandLoader(true); // Muestra un loader

    try {
      const response = await changeDniPaciente(dniActual, nuevoDni);
      console.log("Respuesta del backend al cambiar DNI:", response); // Mantén este log
    
      // --- INICIO: Lógica de éxito/error CORREGIDA ---
      // Verifica si la respuesta NO tiene la propiedad 'err' Y si tiene 'success: true' (si el backend la envía)
      // O, de forma más simple por ahora, considera éxito si NO hay 'err'.
      if (response && !response.err) { // <-- CAMBIO PRINCIPAL AQUÍ: buscar 'err'
        // Asumimos que si no hay 'err', fue éxito.
        // Puedes hacer esta condición más estricta si tu backend *siempre* devuelve { success: true } en caso de éxito.
        // Ejemplo más estricto: if (response && response.success === true) { ... }
    
        toast.success(`DNI cambiado exitosamente de ${dniActual} a ${nuevoDni}.`); // Mensaje de éxito
    
        handleCloseVentEmergenteChangeDni();
        getallpacientes();
    
      } else {
        // Si hay una propiedad 'err' O la respuesta no es lo esperado, es un error.
        console.error("Error detectado desde backend:", response?.err || response?.message || response);
    
        // Intenta mostrar un mensaje útil. Si err es un objeto, intenta acceder a su message.
        let errorMessage = "Error desconocido desde el backend.";
        if (response?.err) {
            // Si err es un objeto con message (como un error estándar)
            if (typeof response.err === 'object' && response.err !== null && response.err.message) {
                 errorMessage = response.err.message;
            } else {
                 // Si err es otra cosa (quizás un string o un objeto vacío)
                 errorMessage = `Error reportado por backend (ver consola).`;
            }
        } else if (response?.message) {
            // Si usa la estructura { message: '...' } para errores
            errorMessage = response.message;
        }
    
        alert(`Error al cambiar DNI: ${errorMessage}`);
        // NO cierres la modal aquí.
      }
      // --- FIN: Lógica de éxito/error CORREGIDA ---
    } catch (error) {
      // Error en la comunicación o excepción lanzada desde el servicio
      console.error("Error durante la llamada para cambiar el DNI:", error);
      // Muestra un mensaje de error genérico o específico si puedes parsear 'error'
      alert(
        `Error al intentar cambiar el DNI: ${
          error.message || "Error de conexión o del servidor"
        }.`
      );
      // NO cierres la modal aquí tampoco.
    } finally {
      setBandLoader(false); // Oculta el loader, tanto en éxito como en error
    }
    // --- Fin llamada al backend ---
  };
  // --- Fin: Nuevos estados y handlers para Cambiar DNI ---

  const validationsForm = (form) => {
    //lo ideal seria que el objeto error permanezca vacio
    let errors = {};

    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    let regexComments = /^.{1,255}$/;
    let regexNums = /^([0-9])*$/;

    // en esta validacion aparecen los 4 mensajes al mismo tiempo, se debera pensar la manera en la cual simplemente aparezca por el input que se esta viendo, tambien creo que la validacion se deberia hacer cuando se envie el formulario
    console.log(form);

    if (!form?.dni && form?.dni <= 0) {
      errors.lugar = "El documento es requerido";
    }
    if (!form?.nombre && !form?.nombre?.length == 0) {
      errors.nombre = "El nombre es requerido";
    }

    if (!form?.apellido && !form?.apellido?.length == 0) {
      errors.apellido = "El apellido es requerido";
    }

    if (!form?.obraSocial && !form?.obraSocial?.length == 0) {
      errors.obraSocial = "La obra social es requerida";
    }

    if (!form?.plan && !form?.plan?.length == 0) {
      errors.plan = "El plan es requerido";
    }

    if (!form?.domicilio) {
      errors.domicilio = "El domicilio es requerido";
    }

    if (!form?.celular) {
      errors.celular = "El telefono es requerido";
    }
    if (!form?.nroAfiliado && !form?.nroAfiliado <= 0) {
      errors.celular = "El telefono es requerido";
    }
    /* 
    if (!form?.vacunas) {
      errors.vacunas = "Las vacunas son requeridas";
    }

    if (!form?.afp) {
      errors.afp = "Las afp son requeridas";
    }

    if (!form?.app) {
      errors.app = "Las app son requeridas";
    } */
    /* if (!form?.alergias) {
      errors.alergias = "Las alergias son requeridas";
    } */

    return errors;
  };

  const handleSearch = (busq) => {
    console.log(busq);
    console.log(db);
    let coincidencias = [];
    for (let pac of db) {
      console.log(pac);
      for (let x of Object.values(pac)) {
        if (x) {
          //evitamos los nulos
          if (typeof x == "number") {
            x = x.toString();
          }
          console.log("soy x: ", x);
          if (x.toLowerCase().includes(busq.toLowerCase())) {
            console.log(x);
            coincidencias.push(pac);
            break;
          }
        }
      }
    }

    setDbSearch(coincidencias);
    console.log("coincidencias: ", coincidencias);
  };

  const handleCloseVentEmergenteEditPaciente = () => {
    setShowVentEmergenteEditPaciente(false);
  };

  const handleCloseVentEmergenteAddPaciente = () => {
    setShowVentEmergenteAddPaciente(false);
  };

  const handleCloseVentEmergenteConfPaciente = () => {
    setShowVentEmergenteConfPaciente(false);
  };

  const handleCloseConfInsert = async () => {
    //se confirmo que se agregara el paciente
    setBandLoader(true);
    await handleInsert();

    setPacienteToInsert({});
    setBandInsert(false);
    setBandLoader(false);
    //de alguna manera actualizar la tabla para que se pueda ver al nuevo paciente
  };

  const handleChangeInputInsert = (e) => {
    console.log("name: ", e.target.name, " value: ", e.target.value);

    let newValue = {
      ...pacienteToInsert,
      [e.target.name]: e.target.value,
    };
    console.log(newValue);
    setPacienteToInsert(newValue);
  };

  const handleChangeInput = (e) => {
    console.log("name: ", e.target.name, " value: ", e.target.value);

    let newValue = {
      ...pacienteSelected,
      [e.target.name]: e.target.value,
    };
    console.log(newValue);
    setPacienteSelected(newValue);
  };

  /* const columns=[
    { field: "ndocu", headerName: "DNI", width: 150 },
    { field: "nombre", headerName: "Nombre", width: 180 },
    { field: "apellido", headerName: "Apellido", width: 350 },
  ];
 */

  const handleEditPacient = (paciente) => {
    console.log("editando: ", paciente);
    setNdocuPaciente(paciente.dni);
    setShowVentEmergenteEditPaciente(true);
  };

  const handleUpdate = async (paciente) => {
    const actualizarPaciente = async (paciente) => {
      console.log("se esta por actualizar este paciente: ", paciente);

      if (paciente.fechaNacimiento) {
        paciente.fechaNacimiento = parseDate(paciente.fechaNacimiento);
      }

      const update = await updatePaciente(paciente);
      console.log("update: ", update);
    };

    //activar loader
    setBandLoader(true);
    let resupdate = await actualizarPaciente(paciente);
    getallpacientes();

    console.log(resupdate);
    setBandLoader(false);
  };

  const handleSeePacient = (paciente) => {
    console.log("viendo: ", paciente);
  };

  useEffect(() => {
    const getpacientebyndocu = async () => {
      let paciente = await getPacienteByNdocu(ndocuPaciente);
      setPacienteSelected(paciente);
    };
    if (ndocuPaciente > 0) {
      getpacientebyndocu();
    }
  }, [ndocuPaciente]);

  const columns = [
    {
      title: "DNI",
      dataIndex: "dni",
      render: (text) => <a>{text}</a>,
      align: "center",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      align: "center",
    },
    {
      title: "Apellido",
      dataIndex: "apellido",
      align: "center",
    },

    {
      title: "Acciones",
      key: "acciones",
      align: "center",
      render: (_, record) => (
        <Space size="middle" className="cont_acciones">
          {" "}
          {/* Usar Space para espaciado */}
          {/* Icono para Editar Paciente (el que ya tenías) */}
          <DragOutlined
            className="icon_accion icon_editar" // Añade clases específicas si necesitas estilos
            onClick={() => handleEditPacient(record)}
            title="Editar Paciente" // Tooltip para accesibilidad
          />
          {/* Icono NUEVO para Cambiar DNI */}
          <IdcardOutlined
            className="icon_accion icon_cambiar_dni" // Añade clases específicas
            onClick={() => handleOpenVentEmergenteChangeDni(record)}
            title="Cambiar DNI" // Tooltip para accesibilidad
          />
        </Space>
      ),
    },
  ];

  const handleInsert = async () => {
    if (bandInsert) {
      //validar para insert
      console.log(" se esta por insertar el paciente: ", pacienteToInsert);
      await addPaciente(pacienteToInsert);
      handleCloseVentEmergenteConfPaciente();
      handleCloseVentEmergenteAddPaciente();
    }
  };

  // Función para convertir una fecha en formato "DD/MM/YYYY" a un objeto Date
  function parseDate(input) {
    return new Date(input); // Simplemente pasamos la fecha como está, ya que JavaScript entiende el formato ISO (YYYY-MM-DD) de forma nativa
  }
  const addPaciente = async (paciente) => {
    let insert = await insertPaciente(
      paciente.nombre,
      paciente.apellido,
      +paciente.dni,
      paciente.obraSocial,
      paciente.plan,
      paciente.domicilio,
      +paciente.nroAfiliado,
      +paciente.celular,
      paciente.vacunas,
      paciente.afp,
      paciente.app,
      paciente.alergias,

      paciente.fechaNacimiento ? parseDate(paciente.fechaNacimiento) : null, // Si no hay fecha, dejamos null para evitar errores
      paciente.nombrePrimerTutor,
      paciente.dniPrimerTutor,
      paciente.nombreSegundoTutor,
      paciente.dniSegundoTutor
    );
    console.log(insert);
    //esto es solo de prueba para que se visualize momentaneamente el paciente agregado
    if (!insert?.message) setDb([paciente, ...db]); //se realiza esto para evitar que se muestre al supuesto paciente agregado si hay un error

    return insert;
  };

  let getallpacientes = async () => {
    let pacientes = await getAllPacientes();

    console.log(pacientes);
    setDb(pacientes);
  };
  useEffect(() => {
    getallpacientes();
  }, []);

  useEffect(() => {
    let errores = validationsForm(pacienteToInsert);
    console.log(errores);
    console.log(Object.keys(errores).length);
    if (Object.keys(errores).length == 0) {
      setBandInsert(true);
    }
    //setBandInsert()
  }, [pacienteToInsert]);

  let data = {
    db: db,
    columns: columns,
    pacienteSelected: pacienteSelected,
    showVentEmergenteEditPaciente: showVentEmergenteEditPaciente,
    setShowVentEmergenteEditPaciente: showVentEmergenteEditPaciente,
    pacienteToInsert,
    bandInsert,
    showVentEmergenteAddPaciente,
    showVentEmergenteConfPaciente,
    bandLoader,
    dbSearch,
    setDbSearch,
    handleSearch,
    handleCloseConfInsert,
    setShowVentEmergenteConfPaciente,
    handleCloseVentEmergenteConfPaciente,
    handleCloseVentEmergenteAddPaciente,
    setShowVentEmergenteAddPaciente,
    validationsForm,
    setBandInsert,
    handleChangeInputInsert,
    handleEditPacient: handleEditPacient,
    handleSeePacient: handleSeePacient,
    handleCloseVentEmergenteEditPaciente: handleCloseVentEmergenteEditPaciente,
    handleChangeInput,
    addPaciente,
    handleInsert,
    handleUpdate,

    // --- Nuevas propiedades expuestas para Cambiar DNI ---
    showVentEmergenteChangeDni,
    handleCloseVentEmergenteChangeDni,
    handleOpenVentEmergenteChangeDni, // Necesaria para el onClick del icono
    handleConfirmChangeDni, // Necesaria para el onSubmit de la nueva modal
    pacienteParaCambiarDni, // Necesaria para mostrar el DNI actual en la modal
  };
  return (
    <PacientesContext.Provider value={data}>
      {" "}
      {children}{" "}
    </PacientesContext.Provider>
  );
};
export default PacientesContext;
