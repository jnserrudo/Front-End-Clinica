import { Button } from '@mui/material'
import React from 'react'
import { Header } from '../Componentes/Header'
import { useNavigate } from 'react-router-dom';

export const ConsultorioSection = () => {
    const navigate = useNavigate();
    const handleClick=()=>{
      navigate('/')
  }

  return (
    <div>
        <Header/>
        ConsultorioSection

        <Button variant="contained" onClick={handleClick}  >
            Volver
        </Button>
    </div>
  )
}
