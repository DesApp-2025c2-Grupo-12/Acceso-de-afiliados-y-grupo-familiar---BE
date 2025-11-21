const { Affiliate } = require("../db/models");

// Validación de documento
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

// Validación de contraseña
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


const esMenorDeEdad = (fechaNacimiento) => {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();


  const mesHoy = hoy.getMonth();
  const mesNacimiento = nacimiento.getMonth();
  const diaHoy = hoy.getDate();
  const diaNacimiento = nacimiento.getDate();

  if (mesHoy < mesNacimiento || (mesHoy === mesNacimiento && diaHoy < diaNacimiento)) {
    edad--;
  }

  return edad < 18;
};

//MANEJAR PERMISOS FAMILIAR PARA REALIZAR OPERACIONES
const canManageFamilyMember = async (req, res, next) => {
  try {
    let currentAffiliateId, targetAffiliateId;

    
    if (req.params.usuarioLogueadoId && req.params.affiliateId) {
      currentAffiliateId = req.params.usuarioLogueadoId;
      targetAffiliateId = req.params.affiliateId;
    }
    
    else if (req.body.affiliateId && req.body.usuarioLogueadoId) {
      currentAffiliateId = req.body.usuarioLogueadoId || req.headers['usuario-logueado-id'];
      targetAffiliateId = req.body.affiliateId;

      
      if (!currentAffiliateId) {
       
        return res.status(400).json({ error: 'No se pudo identificar al usuario logueado' });
      }
    }
    else if (req.query.usuarioLogueadoId && req.query.affiliateId) {
      currentAffiliateId = req.query.usuarioLogueadoId;
      targetAffiliateId = req.query.affiliateId;
    }
    else {
      return res.status(400).json({ error: 'No se proporcionaron los IDs necesarios' });
    }

    console.log('Middleware - currentAffiliateId:', currentAffiliateId);
    console.log('Middleware - targetAffiliateId:', targetAffiliateId);

    
    if (parseInt(currentAffiliateId) === parseInt(targetAffiliateId)) {
      return next();
    }

    const currentAffiliate = await Affiliate.findByPk(currentAffiliateId);
    const targetAffiliate = await Affiliate.findByPk(targetAffiliateId);

    if (!targetAffiliate) {
      return res.status(404).json({ error: 'Afiliado no encontrado' });
    }


    const isTitular = currentAffiliate.parentesco === 'TITULAR';
    const isConyuge = currentAffiliate.parentesco === 'CONYUGE';


    if (!isTitular && !isConyuge) {
      return res.status(403).json({
        error: 'Solo puede gestionar para usted mismo'
      });
    }


    let esHijoDelTitular = false;

    if (isTitular) {

      esHijoDelTitular = (
        targetAffiliate.titularId === currentAffiliate.id &&
        targetAffiliate.parentesco === 'HIJO'
      );
    } else if (isConyuge) {

      esHijoDelTitular = (
        targetAffiliate.titularId === currentAffiliate.titularId &&
        targetAffiliate.parentesco === 'HIJO'
      );
    }

    if (!esHijoDelTitular) {
      return res.status(403).json({
        error: 'Solo puede gestionar para sus hijos menores'
      });
    }


    if (!esMenorDeEdad(targetAffiliate.fechaDeNacimiento)) {
      return res.status(403).json({
        error: 'Solo puede gestionar para hijos menores de edad'
      });
    }


    next();
  } catch (error) {
    res.status(500).json({ error: 'Error al verificar permisos: ' + error.message });
  }
};

module.exports = {
  validateDocument,
  validatePassword,
  canManageFamilyMember,
  esMenorDeEdad
};