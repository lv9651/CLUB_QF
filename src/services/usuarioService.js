
import axios from "axios";
import { BASE_URL } from '../Config/config'; 
export const validarCompra = async ({ tipoDocumento, numeroDocumento, ultimaFechaCompra, ultimoMontoCompra }) => {
  const response = await fetch(`${BASE_URL}/api/Usuario/validar-compra`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tipoDocumento, numeroDocumento, ultimaFechaCompra, ultimoMontoCompra }),
  });
  return response.json();
};

export const socialLogin = async (usuario) => {
  const response = await fetch(`${BASE_URL}/api/Usuario/social-login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });
  return response.json();
};

export const validarCorreo = async (correo) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/Usuario/validar-correo`, {
      params: { correo },
    });
    return response.data;
  } catch (error) {
    return error.response?.data || { mensaje: "Error validando correo" };
  }
};