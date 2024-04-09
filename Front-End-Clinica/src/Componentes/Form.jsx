import React from 'react'
import { PacienteForm } from './PacienteForm'
import { AlergiaForm } from './AlergiaForm'
import { ConsultorioForm} from './ConsultorioForm'
import { ConsultaForm } from './ConsultaForm'

export const Form = ({entidad}) => {
  return (
    <div>
      
{entidad=='paciente'? <PacienteForm/> :null}
{entidad=='consulta'? <ConsultaForm/> :null}
{entidad=='alergia'? <AlergiaForm/> :null}
{entidad=='consultorio'? <ConsultorioForm/> :null}

    </div>
  )
}
