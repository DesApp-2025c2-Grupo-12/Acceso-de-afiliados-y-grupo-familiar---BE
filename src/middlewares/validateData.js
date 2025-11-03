module.exports = (validateFn) => {
  return async (req, res, next) => {
    try {
      await validateFn(req.body); // Ejecuta la validación
      next(); // Si todo esta oki, pasa al controller
    } catch (error) {
      res.status(400).json({ error: error.message }); // Si hay error lo devulve
    }
  };
};
