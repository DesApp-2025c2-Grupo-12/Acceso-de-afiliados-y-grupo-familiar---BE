const { Affiliate } = require("../db/models");

//Validación de documento
const validateDocument = (req, res, next) => {
    const { documento } = req.params;

    if (!documento) {
        return res.status(400).json({ error: "Documento es requerido" });
    }

    if (documento.length !== 8) {
        return res.status(400).json({ error: "El documento debe tener 8 caracteres" });
    }

    if (!/^\d+$/.test(documento)) {
        return res.status(400).json({ error: "El documento debe contener solo números" });
    }

    next();
};

//Validación de contraseña
const validatePassword = (req, res, next) => {
    const { password } = req.params || req.body;
    
    if (!password) {
        return res.status(400).json({ error: "Contraseña es requerida" });
    }

    if (password.length < 8) {
        return res.status(400).json({ error: "La contraseña debe tener al menos 8 caracteres" });
    }

    if (!/^[a-zA-Z0-9]+$/.test(password)) {
        return res.status(400).json({ error: "La contraseña solo puede contener letras y números" });
    }

    next();
};


module.exports = {
    validateDocument,
    validatePassword
};