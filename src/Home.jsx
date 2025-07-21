import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Stack,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AppBar,
  Toolbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const beneficios = [
  { icono: '🎁', titulo: 'Cupones exclusivos', texto: 'Accede a promociones únicas solo para miembros del QF Club.' },
  { icono: '🧾', titulo: 'Puntos acumulables', texto: 'Gana puntos por cada compra y canjéalos por beneficios.' },
  { icono: '👩‍⚕️', titulo: 'Asesoría farmacéutica', texto: 'Recibe orientación personalizada de nuestros especialistas.' },
];

const preguntasFrecuentes = [
  { pregunta: '¿Cómo acumulo puntos?', respuesta: 'Por cada sol gastado, ganas 1 punto...' },
  { pregunta: '¿Dónde encuentro mis cupones?', respuesta: 'Al iniciar sesión verás todos tus beneficios.' },
  { pregunta: '¿Cuándo obtengo el primer cupón?', respuesta: 'Al registrarte por primera vez, recibirás uno.' },
  { pregunta: '¿Qué diferencia hay entre QF Core y Premium?', respuesta: 'QF Premium ofrece más beneficios y sorpresas.' },
  { pregunta: '¿Los puntos vencen?', respuesta: 'Sí, vencen en 12 meses, te avisaremos antes.' },
];

const categorias = [
  { nombre: 'Dermatología', icono: '🧴' },
  { nombre: 'Capilar', icono: '💇‍♀️' },
  { nombre: 'Ginecología', icono: '♀️' },
  { nombre: 'Podología', icono: '🦶' },
  { nombre: 'Nutrición', icono: '🥦' },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Navbar */}
      <AppBar position="sticky" sx={{ backgroundColor: '#2C7873' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box component="img" src="/logo-osc.png" alt="QF Club" sx={{ width: 100 }} />
          <Stack direction="row" spacing={2}>
            <Button color="inherit" onClick={() => navigate('/Login')}>Iniciar sesión</Button>
            <Button onClick={() => navigate('/registro')} sx={{ backgroundColor: '#0CB08C', color: '#fff', '&:hover': { backgroundColor: '#2C7873' } }}>
              Únete al club
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{ backgroundImage: 'linear-gradient(to bottom, #F2F2F2 0%, #ffffff 40%)', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" fontWeight={700} color="#2C7873" mb={3}>
                Bienvenido a <span style={{ color: '#0CB08C' }}>QF Club</span>
              </Typography>
              <Typography variant="body1" mb={4}>
                Acumula puntos por tus compras, recibe cupones exclusivos y accede a beneficios únicos.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button onClick={() => navigate('/registro')} variant="contained" sx={{ background: 'linear-gradient(to right, #0CB08C, #2C7873)', px: 4, py: 1.5, borderRadius: 5 }}>
                  Registrarme
                </Button>
                <Button onClick={() => navigate('/login')} variant="outlined" sx={{ borderColor: '#0CB08C', color: '#2C7873', px: 4, py: 1.5, borderRadius: 5 }}>
                  Ya tengo cuenta
                </Button>
              </Stack>
            </Grid>
           
          </Grid>
        </Container>
      </Box>

      {/* Categorías */}
      <Box sx={{ mt: 12 }}>
        <Typography variant="h4" align="center" fontWeight="bold" color="#2C7873" mb={4}>
          Explora nuestras categorías
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {categorias.map((item, i) => (
            <Grid item xs={6} sm={4} md={2} key={i}>
              <Paper elevation={3} sx={{ p: 2, textAlign: 'center', borderRadius: 3 }}>
                <Typography fontSize="2.5rem">{item.icono}</Typography>
                <Typography fontWeight="bold" color="#0CB08C">{item.nombre}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Historia */}
      <Box sx={{ mt: 12 }}>
        <Typography variant="h4" align="center" fontWeight="bold" color="#2C7873" mb={4}>
          Nuestra Historia
        </Typography>
        <Container maxWidth="md">
          <Typography align="center" color="textSecondary">
            En QF Club creemos en el poder de la salud personalizada. Nacimos con la visión de conectar la innovación farmacéutica con el bienestar del día a día. Nos apasiona brindar atención con integridad, calidad y pasión. Con cada punto que acumulas, formas parte de una comunidad comprometida con tu salud.
          </Typography>
        </Container>
      </Box>

      {/* Beneficios */}
      <Container maxWidth="lg" sx={{ mt: 12 }}>
        <Typography variant="h4" align="center" fontWeight="bold" color="#2C7873" mb={6}>
          Beneficios del QF Club
        </Typography>
        <Grid container spacing={4}>
          {beneficios.map((item, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Paper elevation={4} sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
                <Typography fontSize="3rem">{item.icono}</Typography>
                <Typography variant="h6" fontWeight="bold" color="#0CB08C" mb={1}>{item.titulo}</Typography>
                <Typography color="textSecondary">{item.texto}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* FAQ */}
      <Container maxWidth="md" sx={{ mt: 12, mb: 8 }}>
        <Typography variant="h4" align="center" fontWeight="bold" color="#2C7873" mb={4}>
          Preguntas Frecuentes
        </Typography>
        {preguntasFrecuentes.map((item, i) => (
          <Accordion key={i} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<span style={{ fontSize: 20 }}>➕</span>}>
              <Typography fontWeight="bold" color="#2C7873">{item.pregunta}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="textSecondary">{item.respuesta}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>

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
