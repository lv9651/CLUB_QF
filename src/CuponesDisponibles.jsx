import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CardActions,
} from '@mui/material';

const cupones = [
  { nombre: '10% de descuento en Capilares', puntos: 200 },
  { nombre: 'Envío gratis por compras desde S/100', puntos: 150 },
  { nombre: '20% en Cannabis medicinal', puntos: 300 },
  { nombre: 'Cupón sorpresa QF', puntos: 250 },
];

const CuponesDisponibles = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" color="#2C7873" fontWeight="bold" mb={3}>
        Cupones disponibles para canje
      </Typography>

      <Grid container spacing={3}>
        {cupones.map((c, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card sx={{ backgroundColor: '#F2F2F2' }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" color="#0CB08C">
                  {c.nombre}
                </Typography>
                <Typography sx={{ color: '#349348', mt: 1 }}>
                  {c.puntos} pts
                </Typography>
              </CardContent>
              <CardActions>
                <Button fullWidth variant="contained" disabled>
                  Canjear
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CuponesDisponibles;