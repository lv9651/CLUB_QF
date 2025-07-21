import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
  Paper,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    dni: '',
    correo: '',
    celular: '',
    suscrito: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    navigate('/panel');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #E0F7FA, #ffffff)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            borderRadius: 4,
            p: { xs: 4, sm: 5 },
            backgroundColor: '#ffffff',
          }}
        >
          <Stack spacing={3} alignItems="center" mb={2}>
            <Box
              component="img"
              src="/logo-osc.png"
              alt="QF Club Logo"
              sx={{ height: 60 }}
            />
            <Typography
              variant="h5"
              fontWeight="bold"
              color="#2C7873"
              textAlign="center"
            >
              Regístrate en QF Club
            </Typography>
            <Typography variant="body2" color="textSecondary" textAlign="center">
              Ingresa tus datos para obtener tu cupón de bienvenida.
            </Typography>
          </Stack>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                name="nombre"
                label="Nombres completos"
                value={formData.nombre}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                name="dni"
                label="DNI"
                value={formData.dni}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                name="correo"
                label="Correo electrónico"
                type="email"
                value={formData.correo}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                name="celular"
                label="Celular"
                value={formData.celular}
                onChange={handleChange}
                fullWidth
                required
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.suscrito}
                    onChange={handleChange}
                    name="suscrito"
                    sx={{ color: '#2C7873' }}
                  />
                }
                label="Deseo suscribirme y recibir el cupón de bienvenida"
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: '#0CB08C',
                  '&:hover': { backgroundColor: '#2C7873' },
                  fontWeight: 'bold',
                  py: 1.5,
                  fontSize: '1rem',
                  borderRadius: 2,
                }}
              >
                Registrarme
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;