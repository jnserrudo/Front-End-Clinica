// VentEmergenteChangeDni.js
import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, CircularProgress } from '@mui/material';

// Estilos básicos para la modal (puedes personalizarlos)
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const VentEmergenteChangeDni = ({ isOpen, onClose, currentDni, onSubmit, isLoading }) => {
  const [newDni, setNewDni] = useState('');
  const [error, setError] = useState('');

  // Limpiar el campo y error cuando se abre la modal o cambia el DNI actual
  useEffect(() => {
    if (isOpen) {
      setNewDni('');
      setError('');
    }
  }, [isOpen, currentDni]);

  const handleSubmit = () => {
    // Validación simple
    if (!newDni || !/^\d+$/.test(newDni) || parseInt(newDni, 10) <= 0) {
      setError('Por favor, ingresa un DNI nuevo válido (solo números positivos).');
      return;
    }
    if (String(newDni) === String(currentDni)) {
       setError('El nuevo DNI no puede ser igual al actual.');
       return;
    }
    setError(''); // Limpia error si pasa validación
    onSubmit(newDni); // Llama a la función del contexto para procesar el cambio
  };

  const handleInputChange = (e) => {
      setNewDni(e.target.value);
      if (error) { // Limpiar error al escribir
          setError('');
      }
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-change-dni-title"
      aria-describedby="modal-change-dni-description"
    >
      <Box sx={style}>
        <Typography id="modal-change-dni-title" variant="h6" component="h2">
          Cambiar DNI del Paciente
        </Typography>
        <TextField
          label="DNI Actual"
          value={currentDni || ''} // Muestra el DNI actual
          fullWidth
          margin="normal"
          disabled // No editable
          InputLabelProps={{ // Asegura que el label no se superponga si el valor es null/undefined
              shrink: true,
          }}
        />
        <TextField
          label="Nuevo DNI"
          value={newDni}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
          error={!!error} // Muestra el estado de error
          helperText={error} // Muestra el mensaje de error
          InputLabelProps={{
              shrink: true,
          }}
          inputProps={{
             inputMode: 'numeric', // Sugiere teclado numérico en móviles
             pattern: '[0-9]*' // Patrón HTML5 para números
          }}
        />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onClose} sx={{ mr: 1 }} disabled={isLoading}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : 'Confirmar Cambio'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};