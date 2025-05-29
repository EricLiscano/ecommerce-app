// Controlador de checkout y pagos
/**
 * Procesar checkout y pago
 */
exports.processCheckout = async (req, res) => {
  // Demo: simula respuesta de pago según entorno
  const env = process.env.NODE_ENV === 'production' ? 'producción' : 'desarrollo';
  res.json({ message: `Pago procesado (${env}, demo)` });
};
