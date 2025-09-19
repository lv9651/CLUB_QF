export class Usuario {
  constructor({
    nombre = '',
    apellidoPaterno = '',
    apellidoMaterno = '',
    tipoDocumento = '',
    numeroDocumento  = '',
    correo = '',
    celular = '',
    suscrito = true,
    ultimaFechaCompra = '',
    ultimoMontoCompra = '',
    googleToken = null
  } = {}) {
    this.nombre = nombre;
    this.apellidoPaterno = apellidoPaterno;
    this.apellidoMaterno = apellidoMaterno;
    this.tipoDocumento = tipoDocumento;
    this.numeroDocumento = numeroDocumento;
    this.correo = correo;
    this.celular = celular;
    this.suscrito = suscrito;
    this.ultimaFechaCompra = ultimaFechaCompra;
    this.ultimoMontoCompra = ultimoMontoCompra;
    this.googleToken = googleToken;
  }
}