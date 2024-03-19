import React from 'react'
import { SectionCard } from '../Componentes/SectionCard'
import { Header } from '../Componentes/Header'

export const Home = () => {
  return (
    <div>
        <Header/>
        <main className='main'>
            <SectionCard mje='Pacientes' />
            <SectionCard mje='Alergias' />
            <SectionCard mje='Consultorio' />
        </main>

    </div>
  )
}
