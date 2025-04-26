import React, { createContext, useEffect, useState } from "react";

import {
  getAllConsultas,
  getConsultaById,
  getConsultaByIdDetalle,
  getConsultaByNdocu,
  getConsultaByNdocuDetalle,
  insertConsulta,
  updateConsulta,
} from "../services/consulta-services";
import { EditOutlined, DragOutlined } from "@ant-design/icons";
import { getPacienteByNdocu } from "../services/pacientes-services";

const ConsultaContext = createContext();
export const ConsultaProvider = ({ children }) => {
  const [db, setDb] = useState([]);
  const [ndocuPaciente, setNdocuPaciente] = useState(0);
  const [dbSearchConsulta, setDbSearch] = useState([]);

  const [pacienteConsulta, setPacienteConsulta] = useState(null);

  const [apenPaciente, setApenPaciente] = useState("");

  const [idConsulta, setIdConsulta] = useState(0);

  const [consultaSelected, setConsultaSelected] = useState({});
  const [bandUpdated, setBandUpdated] = useState(false);

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

    /* if (!form?.diagnostico && !form?.diagnostico?.length == 0) {
        errors.diagnostico = "El diagnostico es requerida";
      }
   */
    if (!form?.tratamiento && !form?.tratamiento?.length == 0) {
      errors.tratamiento = "El tratamiento es requerido";
    }

    if (!form?.fecha) {
      errors.fecha = "La fecha es requerida";
    }

    if (!form?.motivo) {
      errors.motivo = "El motivo es requerido";
    }

    if (!form?.tipo) {
      errors.tipo = "El tipo de consulta es requerido";
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

  const handleUpdate = async (consulta) => {
    const actualizarConsulta = async (consulta) => {
      console.log("se esta por actualizar esta consulta: ", consulta);
      const update = await updateConsulta(consulta);
      console.log("update: ", update);
    };
    if (consulta?.id) {
      //activar loader
      setBandLoader(true);
      let resupdate = await actualizarConsulta(consulta);
      getallconsultas();

      console.log(resupdate);
      setBandLoader(false);
    }
  };

  const handleChangeInputInsert = (e) => {
    // console.log("name: ", e.target.name, " value: ", e.target.value);
    console.log("soy el valor de e: ", e);
    let newValue;
    if (!e?.target) {
      //estamos en el select de tipos
      newValue = {
        ...consultaToInsert,
        tipo: e,
      };
    } else {
      newValue = {
        ...consultaToInsert,
        [e.target.name]: e.target.value,
      };
    }
    console.log(newValue);

    //no puedo aplicar el formateo aca, porque estaria modificando el formato del input y no se puede
    //me daria un error, porque el input de tipo date acepta otro formato, por lo que el formateo lo deberia hacer a la hora de hacer el insert
    /* if(newValue?.fecha){
        newValue.fecha=formatDate(newValue?.fecha)
      } */

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

    setBandUpdated(true);
  };

  const handleChangeTipoConsulta = (newTipo) => {
    console.log(newTipo);
    let newValue = {
      ...consultaSelected,
      tipo: newTipo,
    };
    setConsultaSelected(newValue);

    setBandUpdated(true);
  };

  const handleEditConsulta = async (consulta) => {
    console.log("editando: ", consulta);

    setIdConsulta(consulta?.id);
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
      //let consulta = await getConsultaByIdDetalle(idConsulta);
      let consulta = await getConsultaById(idConsulta);
      console.log(consulta);
      //tenemos la consulta, la cual contiene el ..dni del paciente, con esto lo que haremos sera traer
      //del paciente mas datos, como el nombre
      let paciente = await getPacienteByNdocu(consulta.pacienteDni);

      console.log(paciente);

      setPacienteConsulta(paciente);
      setConsultaSelected(consulta);
    };
    if (idConsulta > 0) {
      console.log(idConsulta);
      getconsultabyid();
    }
  }, [idConsulta]);

  useEffect(() => {
    if (consultaSelected?.fecha) {
      console.log("se selecciono una consulta");
    }
  }, [consultaSelected]);

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
      let newConsulta = consultaToInsert;
      // newConsulta.fecha= formatDate(newConsulta.fecha)
      await addConsulta(newConsulta);
      handleCloseVentEmergenteConfConsulta();
      handleCloseVentEmergenteAddConsulta();
    }
  };
  // Función para convertir una fecha en formato "DD/MM/YYYY" a un objeto Date
  function parseDate(input) {
    return new Date(input); // Simplemente pasamos la fecha como está, ya que JavaScript entiende el formato ISO (YYYY-MM-DD) de forma nativa
  }

  const addConsulta = async (consulta) => {
    console.log(consulta, ndocuPaciente);
    consulta.pacienteDni = +ndocuPaciente;
    consulta.fecha = parseDate(consulta.fecha);
    let insert = await insertConsulta(consulta);
    console.log(insert);
    //pasamos la fecha al formato para que se vea bien en la tabla
    insert.fecha = formatDate(insert.fecha);

    setDb([insert, ...db]);

    return insert;
  };

  function formatDate(dateString) {
    // Crear un objeto Date a partir de la cadena de fecha
    const date = new Date(dateString);

    // Obtener día, mes y año
    let day = date.getDate() + 1;
    let month = date.getMonth() + 1;
    const year = date.getFullYear();

    // Verificar si el día excede el número de días en el mes actual
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day > daysInMonth) {
      // Si excede, establecer el día en 1 y sumar uno al mes
      day = 1;
      month += 1;
    }

    // Devolver la fecha en formato dd/mm/yyyy
    return `${day.toString().padStart(2, "0")}/${month
      .toString()
      .padStart(2, "0")}/${year}`;
  }

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

  let getallconsultas = async () => {
    let consultas = await getAllConsultas(ndocuPaciente);
    console.log(consultas);
    console.log(consultas.paciente);
    let paciente = consultas.paciente;
    let apen = consultas.apen;
    consultas = consultas.consultas.map((c) => {
      return {
        ...c,
        fecha: formatDate(c.fecha),
      };
    });

    setPacienteConsulta(paciente);

    setApenPaciente(apen);
    setDb(consultas);
  };

  useEffect(() => {
    if (ndocuPaciente) {
      getallconsultas();
    } else {
      setDb([]);
    }
  }, [ndocuPaciente]);

  useEffect(() => {
    console.log("pacienteConsulta: ", pacienteConsulta);
    if (pacienteConsulta && Object.values(pacienteConsulta).length > 0) {
    }
  }, [pacienteConsulta]);

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
    apenPaciente,
    bandUpdated,
    pacienteConsulta,
    dbSearchConsulta,
    handleSearch,
    setDbSearch,
    setBandUpdated,
    handleChangeTipoConsulta,
    formatDate,
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
    handleUpdate,
  };
  return (
    <ConsultaContext.Provider value={data}>{children}</ConsultaContext.Provider>
  );
};

export default ConsultaContext;
