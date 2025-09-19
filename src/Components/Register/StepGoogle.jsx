import React from 'react';
import { Stack, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';

const StepGoogle = ({
  formData,
  handleChange,
  handleGoogleLogin,
  handleSubmit,
  googleLogged,
  handleBack // <-- nuevo prop para botón Atrás
}) => {
  return (
    <Stack spacing={3}>
      {!googleLogged ? (
        <Button
          fullWidth
          variant="outlined"
          onClick={handleGoogleLogin}
          sx={{
            borderColor: '#db4437',
            color: '#db4437',
            fontWeight: 'bold',
            py: 1.5,
            fontSize: '1rem',
            borderRadius: 2,
            textTransform: 'none'
          }}
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            style={{ width: 24, marginRight: 8 }}
          />
          Registrarme con Google
        </Button>
      ) : (
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              name="nombre"
              label="Nombres"
              value={formData.nombre}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name="apellidoPaterno"
              label="Apellido Paterno"
              value={formData.apellidoPaterno}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name="apellidoMaterno"
              label="Apellido Materno"
              value={formData.apellidoMaterno}
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
              disabled
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.suscrito || false}
                  onChange={handleChange}
                  name="suscrito"
                  sx={{ color: '#2C7873' }}
                />
              }
              label="Deseo suscribirme y recibir el cupón de bienvenida"
            />

            <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
              <Button
                variant="outlined"
                onClick={handleBack}
                sx={{ flex: 1, py: 1.5, fontSize: '1rem', borderRadius: 2 }}
              >
                Atrás
              </Button>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  flex: 2,
                  backgroundColor: '#0CB08C',
                  '&:hover': { backgroundColor: '#2C7873' },
                  fontWeight: 'bold',
                  py: 1.5,
                  fontSize: '1rem',
                  borderRadius: 2
                }}
              >
                Confirmar Registro con Google
              </Button>
            </Stack>
          </Stack>
        </form>
      )}
    </Stack>
  );
};

export default StepGoogle;