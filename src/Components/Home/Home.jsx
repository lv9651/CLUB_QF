import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Stack,
  AppBar,
  Toolbar,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Navbar solo con logo */}
      <AppBar position="sticky" sx={{ backgroundColor: '#2C7873' }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Box component="img" src="/logo-osc.png" alt="QF Club" sx={{ width: 120 }} />
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: '#d8e6e6', // 👈 nuevo color de fondo
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            
            {/* Columna Izquierda: Imagen */}
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/chic.png" // tu imagen
                alt="QF Club"
                sx={{
                  width: '100%',
                  maxWidth: 450,
                  borderRadius: 2,
                  display: 'block',
                  margin: '0 auto',
                }}
              />
            </Grid>

            {/* Columna Derecha: Texto y botones */}
            <Grid 
              item 
              xs={12} 
              md={6} 
              textAlign={{ xs: 'center', md: 'right' }}
            >
              <Typography
                variant="h3"
                fontWeight={600}
                mb={2}
                sx={{ color: '#2C7873' }}
              >
                Bienvenido a <span style={{ color: '#0CB08C' }}>QF Club</span>
              </Typography>

              <Typography
                variant="body1"
                mb={4}
                sx={{ 
                  color: '#555', 
                  maxWidth: 400, 
                  ml: { md: 'auto' },
                  mr: { xs: 'auto', md: 0 }
                }}
              >
                Acumula puntos por tus compras, recibe cupones exclusivos y accede
                a todos nuestros beneficios.
              </Typography>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent={{ xs: 'center', md: 'flex-end' }}
              >
                <Button
                  onClick={() => navigate('/registro')}
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(to right, #0CB08C, #2C7873)',
                    px: 4,
                    py: 1.5,
                    borderRadius: 5,
                  }}
                >
                  REGISTRARME
                </Button>
                <Button
                  onClick={() => navigate('/login')}
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(to right, #0CB08C, #2C7873)',
                    px: 4,
                    py: 1.5,
                    borderRadius: 5,
                  }}
                >
                  INICIAR SESIÓN
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: '#2C7873', py: 4, color: 'white', textAlign: 'center' }}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} QF Club · Todos los derechos reservados
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;