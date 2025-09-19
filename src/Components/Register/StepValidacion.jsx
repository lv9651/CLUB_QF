import React from 'react';
import { Stack, TextField, MenuItem, Button } from '@mui/material';

const StepValidacion = ({ formData, handleChange, handleValidar }) => (
  <Stack spacing={2}>
    <TextField
      select
      name="tipoDocumento"
      label="Tipo de Documento"
      value={formData.tipoDocumento}
      onChange={handleChange}
      fullWidth
      required
    >
      <MenuItem value="DNI">DNI</MenuItem>
      <MenuItem value="CE">Carnet de Extranjería</MenuItem>
    </TextField>

    <TextField
      name="numeroDocumento"
      label="Número de Documento"
      value={formData.numeroDocumento}
      onChange={handleChange}
      fullWidth
      required
    />

    <TextField
      name="ultimaFechaCompra"
      label="Última Fecha de Compra"
      type="date"
      InputLabelProps={{ shrink: true }}
      value={formData.ultimaFechaCompra}
      onChange={handleChange}
      fullWidth
      required
    />

    <TextField
      name="ultimoMontoCompra"
      label="Monto Última Compra"
      type="number"
      value={formData.ultimoMontoCompra}
      onChange={handleChange}
      fullWidth
      required
    />

    <Button
      variant="contained"
      fullWidth
      onClick={handleValidar}
      sx={{ backgroundColor: '#0CB08C', '&:hover': { backgroundColor: '#2C7873' } }}
    >
      Validar Datos
    </Button>
  </Stack>
);

export default StepValidacion;