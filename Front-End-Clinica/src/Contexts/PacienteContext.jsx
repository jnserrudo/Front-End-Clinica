import React, { createContext, useEffect, useState } from "react";
import {
  getAllPacientes,
  getPacienteByNdocu,
  insertPaciente,
  updatePaciente,
} from "../services/pacientes-services";
import { Space, Tag } from "antd";
import { EditOutlined, DragOutlined } from "@ant-design/icons";
const PacientesContext = createContext();
export const PacientesProvider = ({ children }) => {
  const [db, setDb] = useState([]);
  const [dbSearch, setDbSearch] = useState([])
  const [ndocuPaciente, setNdocuPaciente] = useState(0);
  const [pacienteSelected, setPacienteSelected] = useState({});

  const [showVentEmergenteEditPaciente, setShowVentEmergenteEditPaciente] =
    useState(false);
    const [showVentEmergenteAddPaciente, setShowVentEmergenteAddPaciente] =
    useState(false);
  const [pacienteToInsert, setPacienteToInsert] = useState({});
  const [bandInsert, setBandInsert] = useState(false);

  const [showVentEmergenteConfPaciente, setShowVentEmergenteConfPaciente] = useState(false);

  const [bandLoader, setBandLoader] = useState(false)

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
    if (!form?.nroAfiliado&&!form?.nroAfiliado<=0) {
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

  const handleSearch=(busq)=>{
    console.log(busq)
    console.log(db)
    let coincidencias=[]
    for(let pac of db){
      for(let x of Object.values(pac) ){
        if(x.toString().toLowerCase().includes(busq.toLowerCase())){
          console.log(x)
          coincidencias.push(pac)
          break;
        }
      }
    }

    setDbSearch(coincidencias)
    console.log("coincidencias: ",coincidencias)
  }


  const handleCloseVentEmergenteEditPaciente = () => {
    setShowVentEmergenteEditPaciente(false);
  };

  const handleCloseVentEmergenteAddPaciente = () => {
    setShowVentEmergenteAddPaciente(false);
  };

  const handleCloseVentEmergenteConfPaciente = () => {
    setShowVentEmergenteConfPaciente(false);
  };

  const handleCloseConfInsert=async()=>{
    //se confirmo que se agregara el paciente
    setBandLoader(true)
    await handleInsert()
   
    setPacienteToInsert({})
    setBandInsert(false)
    setBandLoader(false)
    //de alguna manera actualizar la tabla para que se pueda ver al nuevo paciente
  
  }

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

  const handleUpdate=async(paciente)=>{
      
    const actualizarPaciente=async(paciente)=>{
      console.log("se esta por actualizar este paciente: ",paciente)
      const update=await updatePaciente(paciente)
      console.log("update: ",update)
    }
    
      //activar loader
      setBandLoader(true);
      let resupdate=await  actualizarPaciente(paciente)
      getallpacientes();

      console.log(resupdate)
      setBandLoader(false);
    

  }

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
        <div className="cont_acciones">
          {/* <EditOutlined
            className="icon_accion"
            onClick={(e) => handleEditPacient(record)}
          /> */}
          <DragOutlined
            className="icon_accion"
            onClick={(e) => handleEditPacient(record)}
          />
        </div>
      ),
    },
  ];

  const handleInsert = async() => {
    if (bandInsert) {
      //validar para insert
      console.log(" se esta por insertar el paciente: ", pacienteToInsert)
      await addPaciente(pacienteToInsert);
      handleCloseVentEmergenteConfPaciente()
      handleCloseVentEmergenteAddPaciente()
    }
  };
  const addPaciente = async (paciente) => {
    let insert = await insertPaciente(
      paciente.dni,
      paciente.obraSocial,
      paciente.plan,
      paciente.domicilio,
      paciente.nroAfiliado,
      paciente.telefono,
      paciente.vacunas,
      paciente.afp,
      paciente.app,
      paciente.alergias
    );
    console.log(insert);
      //esto es solo de prueba para que se visualize momentaneamente el paciente agregado
      setDb([paciente,...db])

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
    handleUpdate
  };
  return (
    <PacientesContext.Provider value={data}>
      {" "}
      {children}{" "}
    </PacientesContext.Provider>
  );
};
export default PacientesContext;
