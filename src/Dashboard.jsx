import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  LinearProgress,
  Divider,
  Avatar,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const nombreUsuario = 'Luis';
  const puntos = 720;
  const puntosProximoNivel = 900;
  const progreso = Math.min((puntos / puntosProximoNivel) * 100, 100);
  const nivel = puntos >= 900 ? 'QF Premium' : 'QF Core';

  const cupones = [
    { nombre: 'Cupón Bienvenida', valor: '10%', estado: 'Activo' },
    { nombre: 'Cupón Día del Cliente', valor: '15%', estado: 'Vencido' },
    { nombre: 'Cupón Especial Julio', valor: '5%', estado: 'Activo' },
  ];

  const historial = [
    { fecha: '2025-07-10', descripcion: 'Registro inicial', puntos: 50 },
    { fecha: '2025-07-12', descripcion: 'Compra CBD Capilar', puntos: 120 },
    { fecha: '2025-07-15', descripcion: 'Campaña Instagram', puntos: 70 },
  ];

  const misiones = [
    { titulo: 'Completa tu perfil', recompensa: 30, completado: true },
    { titulo: 'Realiza tu primera compra', recompensa: 100, completado: false },
    { titulo: 'Comparte en redes sociales', recompensa: 50, completado: false },
  ];

  const beneficios = [
    'Descuentos exclusivos',
    'Atención preferente',
    'Eventos privados',
    'Charlas de salud',
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: '#F9FCFB', minHeight: '100vh' }}>
      {/* Usuario y nivel */}
      <Box display="flex" alignItems="center" mb={3}>
        <Avatar
          alt={nombreUsuario}
          src="/avatar-qf.png"
          sx={{ width: 64, height: 64, mr: 2 }}
        />
        <Box>
          <Typography variant="h5" fontWeight="bold" color="#2C7873">
            ¡Hola, {nombreUsuario}! 👋
          </Typography>
          <Chip
            label={`Nivel: ${nivel}`}
            color={nivel === 'QF Premium' ? 'warning' : 'info'}
            sx={{ mt: 0.5 }}
          />
        </Box>
      </Box>

      {/* Progreso */}
      <Card sx={{ mb: 4, backgroundColor: '#ffffff' }}>
        <CardContent>
          <Typography variant="body1" gutterBottom>
            Progreso hacia <strong>QF Premium</strong>
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progreso}
            sx={{ height: 10, borderRadius: 5, mb: 1 }}
            color="success"
          />
          <Typography variant="caption" color="textSecondary">
            {puntos} / {puntosProximoNivel} pts — Te faltan {puntosProximoNivel - puntos} puntos
          </Typography>
        </CardContent>
      </Card>

      {/* Cupones */}
      <Typography variant="h6" mb={1} color="#2C7873">
        Mis Cupones
      </Typography>
      <Grid container spacing={2} mb={4}>
        {cupones.map((cupon, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ backgroundColor: cupon.estado === 'Activo' ? '#E0F7F1' : '#F0F0F0' }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">
                  {cupon.nombre}
                </Typography>
                <Typography variant="h6" color="primary">
                  {cupon.valor} OFF
                </Typography>
                <Chip
                  label={cupon.estado}
                  color={cupon.estado === 'Activo' ? 'success' : 'default'}
                  sx={{ mt: 1 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Historial */}
      <Typography variant="h6" mb={1} color="#2C7873">
        Historial de puntos
      </Typography>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          {historial.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                py: 1,
                borderBottom: index < historial.length - 1 ? '1px solid #eee' : 'none',
              }}
            >
              <Typography>{item.fecha}</Typography>
              <Typography>{item.descripcion}</Typography>
              <Typography color="#349348">+{item.puntos} pts</Typography>
            </Box>
          ))}
        </CardContent>
      </Card>

      {/* Misiones */}
      <Typography variant="h6" mb={1} color="#2C7873">
        Misiones activas
      </Typography>
      <Grid container spacing={2} mb={4}>
        {misiones.map((m, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Card>
              <CardContent>
                <Typography fontWeight="bold">{m.titulo}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Recompensa: <strong>+{m.recompensa} pts</strong>
                </Typography>
                <Button
                  variant={m.completado ? 'contained' : 'outlined'}
                  color={m.completado ? 'success' : 'primary'}
                  size="small"
                  sx={{ mt: 1 }}
                >
                  {m.completado ? 'Completado' : 'Completar'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Beneficios */}
      <Typography variant="h6" mb={1} color="#2C7873">
        Beneficios destacados
      </Typography>
      <Stack direction="row" spacing={2} flexWrap="wrap" mb={4}>
        {beneficios.map((b, i) => (
          <Chip
            key={i}
            label={b}
            sx={{ backgroundColor: '#DAF5EC', fontWeight: 'bold' }}
          />
        ))}
      </Stack>

      {/* Logout */}
      <Divider sx={{ my: 3 }} />
      <Box textAlign="center">
        <Button variant="outlined" color="error" onClick={() => navigate('/')}>
          Cerrar sesión
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;