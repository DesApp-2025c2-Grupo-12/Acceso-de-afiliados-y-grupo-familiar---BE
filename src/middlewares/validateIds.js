//valida que el los ids sean numeros
const validateIds = (req, res, next) => {
    const ids = { ...req.params };
    
    for (const [key, value] of Object.entries(ids)) {
        if (key.includes('Id') && (!value || isNaN(value))) {
            return res.status(400).json({ error: `${key} inválido` });
        }
    }
    next();
};

module.exports = validateIds;