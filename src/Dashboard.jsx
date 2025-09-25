import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from './Config/config';
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
  CircularProgress,
  Snackbar,
  Alert,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const correoUsuario = location.state?.correo;
  const nombre = location.state?.nombre;
  const apellidoPaterno = location.state?.apellidoPaterno;
  const apellidoMaterno = location.state?.apellidoMaterno;

  const [idCliente, setIdCliente] = useState(location.state?.idCliente ?? null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [puntosTotales, setPuntosTotales] = useState(0);
  const [puntosDisponibles, setPuntosDisponibles] = useState(0);
  const [nivel, setNivel] = useState(null);
  const [beneficios, setBeneficios] = useState([]);
  const [productos, setProductos] = useState([]);
  const [historial, setHistorial] = useState([]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const puntosRes = await axios.post(
        `${BASE_URL}/api/Puntaje/actualizar-puntos`,
        null,
        { params: { correo: correoUsuario } }
      );

      const puntosData = puntosRes.data ?? {};
      const idFromPuntos =
        puntosData.idCliente ?? puntosData.idcliente ?? puntosData.IdCliente ?? null;

      setPuntosTotales(puntosData.puntosTotales ?? puntosData.PuntosTotales ?? 0);
      setPuntosDisponibles(puntosData.puntosDisponibles ?? puntosData.PuntosDisponibles ?? 0);

      if (idFromPuntos) {
        setIdCliente(idFromPuntos);
      }

      const nivelRes = await axios.get(`${BASE_URL}/api/Puntaje/nivel-completo`, {
        params: { correo: correoUsuario },
      });

      const nivelData = nivelRes.data ?? {};
      setNivel(nivelData.nivelInfo ?? nivelData.NivelInfo ?? null);
      setBeneficios(nivelData.beneficios ?? nivelData.Beneficios ?? []);
      setProductos(nivelData.productos ?? nivelData.Productos ?? []);

      const clienteParaHistorial = idFromPuntos ?? idCliente ?? null;
      if (clienteParaHistorial) {
        const historialRes = await axios.get(
          `${BASE_URL}/api/Puntaje/historial/${clienteParaHistorial}`
        );
        setHistorial(historialRes.data ?? []);
      } else {
        setHistorial([]);
      }
    } catch (err) {
      console.error(err);
      setError('⚠️ Error al cargar datos del dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [correoUsuario]);

  const canjearItem = async (item, tipo) => {
    try {
      const nombre = tipo === 'PRODUCTO' ? item.nombreProducto : item.descripcion;

      const response = await axios.post(`${BASE_URL}/api/Puntaje/canjear`, {
        correo: correoUsuario,
        tipo,
        idReferencia: tipo === 'PRODUCTO' ? item.idProducto : item.id,
      });

      if (response.data?.pendiente) {
        setSnackbar({
          open: true,
          message: `⏳ El ${tipo === 'PRODUCTO' ? 'producto' : 'beneficio'} "${nombre}" está pendiente de aprobación.`,
          severity: 'warning',
        });
      } else {
        setSnackbar({
          open: true,
          message: `🎉 ¡Has canjeado el ${tipo === 'PRODUCTO' ? 'producto' : 'beneficio'} "${nombre}" con éxito!`,
          severity: 'success',
        });
      }

      await fetchDashboardData();
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: `❌ Error al canjear. Intenta nuevamente.`,
        severity: 'error',
      });
    }
  };

  const puntosProximoNivel = nivel?.maxCompra ?? 1000;
  const progreso = Math.min((puntosTotales / puntosProximoNivel) * 100, 100);
  const puntosFaltantes = Math.max(puntosProximoNivel - puntosTotales, 0);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress color="success" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0fdfa, #e0f7f3, #ffffff)',
      }}
    >
      {/* Encabezado Usuario */}
      <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
        <Box display="flex" alignItems="center" mb={4}>
          <Avatar
            alt={nombre ?? correoUsuario}
            src="/avatar-qf.png"
            sx={{ width: 80, height: 80, mr: 2, border: '3px solid #2C7873' }}
          />
          <Box>
            <Typography variant="h4" fontWeight="bold" color="#1a3c34">
              Hola, {nombre} {apellidoPaterno} {apellidoMaterno}! 👋
            </Typography>
            <Chip
              label={`Nivel: ${nivel?.nombre ?? 'N/A'}`}
              sx={{
                mt: 1,
                fontWeight: 'bold',
                background: 'linear-gradient(90deg, #2C7873, #5cc9a8)',
                color: 'white',
              }}
            />
          </Box>
        </Box>
      </motion.div>

      {/* Progreso */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Card
          sx={{
            mb: 5,
            borderRadius: 4,
            boxShadow: '0 8px 20px rgba(44,120,115,0.15)',
            background: 'linear-gradient(135deg, #ffffff, #f5fdfc)',
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom color="#2C7873">Tu progreso</Typography>
            <Typography variant="body1">Puntos acumulados: <strong>{puntosTotales}</strong></Typography>
            <Typography variant="body1">Disponibles para canje: <strong>{puntosDisponibles}</strong></Typography>
            <Box mt={3}>
              <LinearProgress
                variant="determinate"
                value={progreso}
                sx={{
                  height: 16,
                  borderRadius: 8,
                  backgroundColor: '#e0f2f1',
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(90deg, #2C7873, #5cc9a8)',
                  },
                }}
              />
              <Typography variant="caption" color="textSecondary">
                {puntosTotales} / {puntosProximoNivel} pts — faltan {puntosFaltantes} pts
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      {/* Beneficios */}
      <Typography variant="h6" mb={2} color="#2C7873">🎁 Beneficios disponibles</Typography>
      <Stack direction="column" spacing={2} mb={5}>
        {beneficios.length > 0 ? beneficios.map((b, i) => (
          <motion.div key={i} whileHover={{ scale: 1.02 }}>
            <Card sx={{ p: 2, borderRadius: 4, boxShadow: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body1">{b.descripcion}</Typography>
                <Typography variant="body2" color="textSecondary">{b.puntaje} pts</Typography>
              </Box>
              <Box mt={1} textAlign="right">
                <Button
                  size="small"
                  variant={b.puntaje <= puntosDisponibles && !b.pendiente ? 'contained' : 'outlined'}
                  color={b.puntaje <= puntosDisponibles && !b.pendiente ? 'success' : 'inherit'}
                  disabled={b.puntaje > puntosDisponibles || b.pendiente}
                  onClick={() => canjearItem(b, 'BENEFICIO')}
                >
                  {b.pendiente ? 'Pendiente...' : 'Canjear'}
                </Button>
              </Box>
            </Card>
          </motion.div>
        )) : <Typography variant="body2" color="textSecondary">No hay beneficios disponibles.</Typography>}
      </Stack>

      {/* Productos */}
      <Typography variant="h6" mb={2} color="#2C7873">🛍️ Productos para canje</Typography>
      <Grid container spacing={3} mb={5}>
        {productos.length > 0 ? productos.map((p, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <motion.div whileHover={{ scale: 1.02 }}>
              <Card sx={{ borderRadius: 4, height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>{p.nombreProducto}</Typography>
                  <Typography variant="body2" color="textSecondary">{p.puntaje} pts</Typography>
                </CardContent>
                <Box p={2} textAlign="center">
                  <Button
                    fullWidth
                    variant={p.puntaje <= puntosDisponibles && !p.pendiente ? 'contained' : 'outlined'}
                    color={p.puntaje <= puntosDisponibles && !p.pendiente ? 'success' : 'inherit'}
                    disabled={p.puntaje > puntosDisponibles || p.pendiente}
                    onClick={() => canjearItem(p, 'PRODUCTO')}
                  >
                    {p.pendiente ? 'Pendiente...' : 'Canjear'}
                  </Button>
                </Box>
              </Card>
            </motion.div>
          </Grid>
        )) : <Typography variant="body2" color="textSecondary" sx={{ p: 2 }}>No hay productos disponibles.</Typography>}
      </Grid>

      {/* Historial */}
      <Typography variant="h6" mb={2} color="#2C7873">📜 Historial de canjes</Typography>
      {idCliente ? (
        historial.length > 0 ? (
          <Paper sx={{ overflowX: 'auto', borderRadius: 3, boxShadow: 3, mb: 5 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#e0f7f3' }}>
                  <TableCell><strong>Tipo</strong></TableCell>
                  <TableCell><strong>Item</strong></TableCell>
                  <TableCell><strong>Puntos</strong></TableCell>
                  <TableCell><strong>Fecha</strong></TableCell>
                  <TableCell><strong>Estado</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historial.map((h, i) => (
                  <TableRow key={i}>
                    <TableCell>{h.tipo}</TableCell>
                    <TableCell>{h.nombreItem}</TableCell>
                    <TableCell>{h.puntosDescontados}</TableCell>
                    <TableCell>{new Date(h.fechaCanje).toLocaleString()}</TableCell>
                    <TableCell>{h.estado}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        ) : (
          <Typography variant="body2" color="textSecondary">No tienes historial de canjes aún.</Typography>
        )
      ) : (
        <Typography variant="body2" color="textSecondary">ID de cliente no disponible.</Typography>
      )}

      {/* Logout */}
      <Divider sx={{ my: 4 }} />
      <Box textAlign="center">
        <Button variant="outlined" color="error" onClick={() => navigate('/')}>Cerrar sesión</Button>
      </Box>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard;