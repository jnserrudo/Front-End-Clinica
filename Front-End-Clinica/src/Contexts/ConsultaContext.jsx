import React, { createContext, useEffect, useState } from "react";

import { getAllConsultas,getConsultaByIdDetalle,getConsultaByNdocu,getConsultaByNdocuDetalle,insertConsulta } from "../services/consulta-services";
import { EditOutlined, DragOutlined } from "@ant-design/icons";

const ConsultaContext=createContext()
export const ConsultaProvider = ({children}) => {
    const [db, setDb] = useState([]);
    const [ndocuPaciente, setNdocuPaciente] = useState(0);
    const [idConsulta, setIdConsulta] = useState(0);
    
    const [consultaSelected, setConsultaSelected] = useState({});
  
    const [showVentEmergenteEditConsulta, setShowVentEmergenteEditConsulta] =
      useState(false);
    const [showVentEmergenteAddConsulta, setShowVentEmergenteAddConsulta] =
      useState(false);
    const [consultaToInsert, setConsultaToInsert] = useState({});
    const [bandInsert, setBandInsert] = useState(false);
  
    const [showVentEmergenteConfConsulta, setShowVentEmergenteConfConsulta] =
      useState(false);
  
    const [bandLoader, setBandLoader] = useState(false);
  
    const validationsForm = (form) => {
      //lo ideal seria que el objeto error permanezca vacio
      let errors = {};
  
      let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
      let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
      let regexComments = /^.{1,255}$/;
      let regexNums = /^([0-9])*$/;
  
      // en esta validacion aparecen los 4 mensajes al mismo tiempo, se debera pensar la manera en la cual simplemente aparezca por el input que se esta viendo, tambien creo que la validacion se deberia hacer cuando se envie el formulario
      console.log(form);
  
      if (!form?.diagnostico && !form?.diagnostico?.length == 0) {
        errors.diagnostico = "El diagnostico es requerida";
      }
  
      if (!form?.tratamiento && !form?.tratamiento?.length == 0) {
        errors.tratamiento = "El tratamiento es requerido";
      }
  
      if (!form?.motivo) {
        errors.motivo = "El motivo es requerido";
      }
  
      if (!form?.evolucion) {
        errors.evolucion = "La evolucion es requerido";
      }
  
      return errors;
    };
  
    const handleCloseVentEmergenteEditConsulta = () => {
      setShowVentEmergenteEditConsulta(false);
    };
  
    const handleCloseVentEmergenteAddConsulta = () => {
      setShowVentEmergenteAddConsulta(false);
    };
  
    const handleCloseVentEmergenteConfConsulta = () => {
      setShowVentEmergenteConfConsulta(false);
    };
  
    const handleCloseConfInsert = async () => {
      //se confirmo que se agregara el Consulta
      setBandLoader(true);
      await handleInsert();
  
      setConsultaToInsert({});
      setBandInsert(false);
      setBandLoader(false);
      //de alguna manera actualizar la tabla para que se pueda ver al nuevo Consulta
    };
  
    const handleChangeInputInsert = (e) => {
      console.log("name: ", e.target.name, " value: ", e.target.value);
  
      let newValue = {
        ...consultaToInsert,
        [e.target.name]: e.target.value,
      };
      console.log(newValue);
      setConsultaToInsert(newValue);
    };
  
    const handleChangeInput = (e) => {
      console.log("name: ", e.target.name, " value: ", e.target.value);
  
      let newValue = {
        ...consultaSelected,
        [e.target.name]: e.target.value,
      };
      console.log(newValue);
      setConsultaSelected(newValue);
    };
  
    /* const columns=[
      { field: "ndocu", headerName: "DNI", width: 150 },
      { field: "nombre", headerName: "Nombre", width: 180 },
      { field: "apellido", headerName: "Apellido", width: 350 },
    ];
   */
  
    const handleEditConsulta = (consulta) => {
      console.log("editando: ", consulta);
      //setNdocuPaciente(consulta.ndocu); seria al pedo poner con el dni porque son las consultas de una misma persona, siempre tendria el mismo documento, asi que pondremos el id de la consulta
      setIdConsulta(consulta.id)
      setShowVentEmergenteEditConsulta(true);
    };
  
  
    /* useEffect(() => {
      const getconsultabyndocu = async () => {
        let consulta = await getConsultaByNdocuDetalle(ndocuPaciente);
        console.log(consulta)
        setConsultaSelected(consulta);
      };
      if (ndocuPaciente > 0) {
        getconsultabyndocu();
      }
    }, [ndocuPaciente]); */
    useEffect(() => {
      const getconsultabyid = async () => {
        let consulta = await getConsultaByIdDetalle(idConsulta);
        console.log(consulta)
        setConsultaSelected(consulta);
      };
      if (idConsulta > 0) {
        console.log(idConsulta)
        getconsultabyid();
      }
    }, [idConsulta]);
  
    useEffect(()=>{
      if(consultaSelected?.fecha){
        console.log("se selecciono una consulta")
      }
    },[consultaSelected])

    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        render: (text) => <a>{text}</a>,
        align: "center",
      },
      {
        title: "Fecha",
        dataIndex: "fecha",
        align: "center",
      },
      {
        title: "Motivo",
        dataIndex: "motivo",
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
              onClick={(e) => handleEditConsulta(record)}
            />
          </div>
        ),
      },
    ];

    
  
    const handleInsert = async () => {
      if (bandInsert) {
        //validar para insert
        console.log(" se esta por insertar el Consulta: ", consultaToInsert);
        await addConsulta(consultaToInsert);
        handleCloseVentEmergenteConfConsulta();
        handleCloseVentEmergenteAddConsulta();
      }
    };
    const addConsulta = async (consulta) => {
      let insert = await insertConsulta();
      console.log(insert);
      //esto es solo de prueba para que se visualize momentaneamente el paciente agregado
      setDb([consulta, ...db]);
  
      return insert;
    };

    function formatDate(dateString) {
      // Crear un objeto Date a partir de la cadena de fecha
      const date = new Date(dateString);
      
      // Obtener día, mes y año
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
    
      // Devolver la fecha en formato dd/mm/yyyy
      return `${day}/${month}/${year}`;
    }
  
    useEffect(() => {

      let getallconsultas = async () => {
        let consultas = await getAllConsultas(ndocuPaciente);
        
        consultas=consultas.recursos.consultas.map((c)=>{
          return {
            ...c,
            fecha:formatDate(c.fecha)
          }
        })

        setDb(consultas);
      };
  
      if(ndocuPaciente){
          getallconsultas();
      }else{
        setDb([])
      }
      
    }, [ndocuPaciente]);
  
    useEffect(() => {
      let errores = validationsForm(consultaToInsert);
      console.log(errores);
      console.log(Object.keys(errores).length);
      if (Object.keys(errores).length == 0) {
        setBandInsert(true);
      }
      //setBandInsert()
    }, [consultaToInsert]);
  
    let data = {
      db: db,
      columns: columns,
      consultaSelected: consultaSelected,
      showVentEmergenteEditConsulta: showVentEmergenteEditConsulta,
      setShowVentEmergenteEditConsulta: showVentEmergenteEditConsulta,
      consultaToInsert,
      bandInsert,
      showVentEmergenteAddConsulta,
      showVentEmergenteConfConsulta,
      bandLoader,
      setNdocuPaciente,
      handleCloseConfInsert,
      setShowVentEmergenteConfConsulta,
      handleCloseVentEmergenteConfConsulta,
      handleCloseVentEmergenteAddConsulta,
      setShowVentEmergenteAddConsulta,
      validationsForm,
      setBandInsert,
      handleChangeInputInsert,
      handleCloseVentEmergenteEditConsulta: handleCloseVentEmergenteEditConsulta,
      handleChangeInput,
      addConsulta,
      handleInsert,
    };
  return (
    <ConsultaContext.Provider  value={data} >
        {children}
    </ConsultaContext.Provider>
    )
}

export default ConsultaContext