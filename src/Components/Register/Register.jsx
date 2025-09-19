import React, { useState } from 'react';
import { Box, Container, Paper, Stepper, Step, StepLabel, CircularProgress } from '@mui/material';
import StepValidacion from './StepValidacion';
import StepGoogle from './StepGoogle';
import { Usuario } from '../../models/Usuario';
import { validarCompra, socialLogin } from '../../services/usuarioService';
import { auth, googleProvider } from '../../utils/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';

const steps = ["Validar datos", "Registro con Google"];

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(new Usuario());
  const [activeStep, setActiveStep] = useState(0);
  const [validado, setValidado] = useState(false);
  const [googleLogged, setGoogleLogged] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loading, setLoading] = useState(false); // para mostrar spinner

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const showMessage = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleValidar = async () => {
    setLoading(true);
    try {
      const data = await validarCompra({
        tipoDocumento: formData.tipoDocumento,
        numeroDocumento: formData.numeroDocumento,
        ultimaFechaCompra: formData.ultimaFechaCompra,
        ultimoMontoCompra: formData.ultimoMontoCompra
      });

      if (data.isValid) {
        showMessage("✅ Validación correcta", "success");
        setApiData(data);
        setValidado(true);
        setActiveStep(1);
      } else {
        showMessage("❌ Los datos no coinciden", "error");
        setValidado(false);
      }
    } catch (error) {
      showMessage("Ocurrió un error en la validación.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!validado) return showMessage("Debes validar tus datos primero", "error");
    setLoading(true);
    try {
      googleProvider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const nameParts = user.displayName ? user.displayName.split(" ") : [];
      const token = await user.getIdToken();
      setFormData(prev => ({
        ...prev,
        nombre: nameParts[0] || "",
        apellidoPaterno: nameParts[1] || "",
        apellidoMaterno: nameParts.length > 2 ? nameParts.slice(2).join(" ") : "",
        correo: user.email || prev.correo,
        googleToken: token,
        ultimaFechaCompra: apiData?.dbUltimaFechaCompra || "",
        ultimoMontoCompra: apiData?.dbMontoTotal || ""
      }));
      setGoogleLogged(true);
    } catch (error) {
      console.error(error);
      showMessage("Error en Google Login", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => setActiveStep(prev => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!googleLogged) {
      showMessage("Debes iniciar sesión con Google", "error");
      return;
    }

    setLoading(true);
    try {
      const payload = { ...formData };
      const data = await socialLogin(payload);

      if (data.mensaje) {
        showMessage(data.mensaje, "error");
        return;
      }

      showMessage("✅ Registro exitoso", "success");

      // Esperar 2s para mostrar el mensaje antes de redirigir
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error) {
      console.error(error);
      showMessage("Ocurrió un error al registrar. Intenta nuevamente.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
        background: 'linear-gradient(to bottom right, #E0F7FA, #fff)',
        position: 'relative'
      }}
    >
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(255,255,255,0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10
          }}
        >
          <img src="/loading.gif" alt="Cargando..." style={{ width: 80, height: 80 }} />
        </Box>
      )}

      <Container maxWidth="sm">
        <Paper elevation={10} sx={{ borderRadius: 4, p: { xs: 4, sm: 5 }, backgroundColor: '#fff' }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map(label => (
              <Step key={label}><StepLabel>{label}</StepLabel></Step>
            ))}
          </Stepper>

          {activeStep === 0 && (
            <StepValidacion
              formData={formData}
              handleChange={handleChange}
              handleValidar={handleValidar}
              handleBack={handleBack}
            />
          )}

          {activeStep === 1 && (
            <StepGoogle
              formData={formData}
              handleChange={handleChange}
              handleGoogleLogin={handleGoogleLogin}
              handleSubmit={handleSubmit}
              googleLogged={googleLogged}
              handleBack={handleBack}
            />
          )}
        </Paper>
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Register;