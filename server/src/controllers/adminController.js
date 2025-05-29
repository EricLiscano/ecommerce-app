// Controlador de administración (solo admins)
/**
 * Crear producto
 */
exports.createProduct = async (req, res) => {
  // Simula creación de producto
  res.json({ message: 'Producto creado (demo)' });
};

/**
 * Actualizar producto
 */
exports.updateProduct = async (req, res) => {
  // Simula actualización
  res.json({ message: 'Producto actualizado (demo)' });
};

/**
 * Eliminar producto
 */
exports.deleteProduct = async (req, res) => {
  // Simula eliminación
  res.json({ message: 'Producto eliminado (demo)' });
};
