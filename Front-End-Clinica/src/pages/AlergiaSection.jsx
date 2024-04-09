import React from 'react'
import { Header } from '../Componentes/Header'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';

export const AlergiaSection = () => {
    const navigate = useNavigate();

    const handleClick=()=>{
        navigate('/')
    }
  return (
    <div>
        <Header/>
        AlergiaSection
        <Button variant='contained' onClick={handleClick} >
            Volver
        </Button>
        </div>
  )
}
