import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí puedes validar o llamar a una API real
    navigate('/panel'); // Redirige al Dashboard después del login
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
          <Stack spacing={3} alignItems="center" mb={3}>
            <Box
              component="img"
              src="/logo-osc.png"
              alt="Logo QF Club"
              sx={{ height: 60 }}
            />
            <Typography
              variant="h5"
              fontWeight="bold"
              color="#2C7873"
              textAlign="center"
            >
              Iniciar sesión
            </Typography>
            <Typography variant="body2" color="textSecondary" textAlign="center">
              Ingresa tus datos para acceder a tu cuenta.
            </Typography>
          </Stack>

          <form onSubmit={handleLogin}>
            <Stack spacing={2}>
              <TextField
                label="Correo electrónico"
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                fullWidth
                required
              />
              <TextField
                label="Contraseña"
                type="password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                fullWidth
                required
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
                Iniciar sesión
              </Button>

              <Button
                fullWidth
                variant="text"
                onClick={() => navigate('/registro')}
                sx={{ color: '#2C7873', fontWeight: 'bold' }}
              >
                ¿No tienes cuenta? Regístrate
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;