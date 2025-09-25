import React, { useState } from "react";
import { Box, Button, Container, Typography, Paper, Stack, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import { validarCorreo } from "../../services/usuarioService";

const Login = () => {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const showMessage = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleGoogleLogin = async () => {
  try {
    googleProvider.setCustomParameters({ prompt: "select_account" });
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    if (!user.email) {
      showMessage("No se pudo obtener el correo de Google", "error");
      return;
    }

    // 🔹 Validar en la base de datos si existe ese correo
    const usuarioDb = await validarCorreo(user.email);

    if (!usuarioDb || !usuarioDb.correo) {
      showMessage("⚠️ El correo no está registrado. Regístrate primero.", "error");
      return;
    }

    // ✅ Mensaje de bienvenida
    showMessage(`👋 Bienvenido ${usuarioDb.Nombre} ${usuarioDb.ApellidoPaterno}`, "success");

    // 🔹 Redirige al panel con el correo desde la BD
    navigate("/panel", { state: { correo: usuarioDb.correo, nombre:usuarioDb.nombre, apellidoPaterno:usuarioDb.apellidoPaterno, apellidoMaterno:usuarioDb.apellidoMaterno} });

  } catch (error) {
    console.error(error);
    showMessage("Error en inicio de sesión con Google", "error");
  }
};

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #E0F7FA, #ffffff)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            borderRadius: 4,
            p: { xs: 4, sm: 5 },
            backgroundColor: "#ffffff",
          }}
        >
          <Stack spacing={3} alignItems="center" mb={3}>
            <Box component="img" src="/logo-osc.png" alt="Logo QF Club" sx={{ height: 60 }} />
            <Typography variant="h5" fontWeight="bold" color="#2C7873" textAlign="center">
              Iniciar sesión
            </Typography>
          </Stack>

          <Stack spacing={2}>
            {/* Botón de Google */}
            <Button
              variant="contained"
              fullWidth
              onClick={handleGoogleLogin}
              sx={{
                backgroundColor: "#2C7873",
                "&:hover": { backgroundColor: "#22665f" },
                fontWeight: "bold",
                py: 1.5,
                fontSize: "1rem",
                borderRadius: 2,
              }}
            >
              Iniciar sesión con Google
            </Button>

            {/* Botón Atrás */}
            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate("/")}
              sx={{
                borderColor: "#2C7873",
                color: "#2C7873",
                fontWeight: "bold",
                py: 1.5,
                fontSize: "1rem",
                borderRadius: 2,
              }}
            >
              Atrás
            </Button>
          </Stack>
        </Paper>
      </Container>

      {/* Snackbar para mensajes */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;