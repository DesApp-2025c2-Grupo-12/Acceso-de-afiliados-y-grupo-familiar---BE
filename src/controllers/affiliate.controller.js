const { Affiliate } = require("../db/models");



const createAffiliate = async (req, res) => {
  try {
    const nuevoAffiliate = await Affiliate.create(req.body);
    res.status(201).json(nuevoAffiliate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getAffiliates = async (req, res) => {
  try {
    const affiliates = await Affiliate.findAll({ attributes: ["id", "nombre", "apellido", "numeroDeDocumento", "numeroDeAfiliado", "planMedico"] })
    res.json(affiliates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getAffiliateById = async (req, res) => {
  const id = req.params.id
  const afiliado = await Affiliate.findByPk(id);
  try {
    res.status(201).json(afiliado)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const updateAffiliate = async (req, res) => {

  try {
    const id = req.params.id
    const afiliadoAModificar = await Affiliate.findByPk(id)
    const afiliadoModificado = await afiliadoAModificar.update(req.body)
    res.status(201).json(afiliadoModificado)

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const deleteAffiliate = async (req, res) => {
  try {
    const id = req.params.id
    await Affiliate.destroy(
      {
        where: { id }
      })

    res.status(201).json({ message: "Afiliado eliminada correctamente" })
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


const verificarsiHayAfiliadoConDocumento = async (req, res) => {
  try {
    const documentoAVerificar = req.params.documento
    const ususarioVerificado = await Affiliate.findOne({
      where: { numeroDeDocumento: documentoAVerificar }
    })
    if (ususarioVerificado) {
      return res.status(200).json({ existe: true });
    } else {
      return res.status(200).json({ existe: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}


const agregarContraseña = async (req, res) => {
  try {
    const { documento, password } = req.params;
    const usuarioVerificado = await Affiliate.findOne({
      where: { numeroDeDocumento: documento },
    });

    if (!usuarioVerificado) {
      return res.status(404).json({ error: "Afiliado no encontrado" });
    }

    usuarioVerificado.password = password;
    await usuarioVerificado.save();

    res.status(200).json({
      message: "Contraseña actualizada correctamente",
      afiliado: usuarioVerificado,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const tieneContraseña = async (req, res) => {

  try {
    const { documento } = req.params
    const usuarioVerificado = await Affiliate.findOne({
      where: { numeroDeDocumento: documento },
    });
    if (await usuarioVerificado.password != null) {
      return res.status(200).json({ existe: true });
    } else {
      return res.status(200).json({ existe: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }


}

const esSuContraseña = async (req, res) => {
  try {
    const { documento, password } = req.params
    const usuarioVerificado = await Affiliate.findOne({
      where: { numeroDeDocumento: documento },
    });
    if (await usuarioVerificado.password == password) {
      return res.status(200).json({ existe: true });
    } else {
      return res.status(200).json({ existe: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}

const getAffiliateByDocument = async (req, res) => {

  try {
    const documento = req.params.documento

    const usuarioVerificado = await Affiliate.findOne({
      where: { numeroDeDocumento: documento }
    });
    if (!usuarioVerificado) {
      return res.status(404).json({ message: "Afiliado no encontrado" });
    }
    res.status(201).json(usuarioVerificado)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


const getGrupoFamiliar = async (req,res) => {
  try {
    const documento = req.params.documento

    const grupoFamiliar = await Affiliate.findAll({
      where: { perteneceA: documento }
    });
    if (!grupoFamiliar) {
      return res.status(404).json({ message: "Grupo Familiar  no encontrado" });
    }
    res.status(201).json(grupoFamiliar)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


const esHijo = async (req, res) => {
  try {
    const afiliadoId = req.params.id;
    const supuestoHijoId = req.params.hijoId;
    
    
    const afiliado = await Affiliate.findOne({
      where: { id: afiliadoId }
    });
    
    const supuestoHijo = await Affiliate.findOne({
      where: { id: supuestoHijoId }
    });

    
    if (!afiliado || !supuestoHijo) {
      return res.status(404).json({ error: "Uno o ambos afiliados no existen" });
    }

    
    if (supuestoHijo.perteneceA === afiliado.numeroDeDocumento && 
        (supuestoHijo.parentesco === "hijo" || supuestoHijo.parentesco === "hija")) {
      return res.status(200).json({ existe: true });
    } else {
      return res.status(200).json({ existe: false });
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTieneHijos = async  (req,res) => {
  try {
    const afiliadoId = req.params.id

     const afiliado = await Affiliate.findOne({
      where: { id: afiliadoId }
    });

     if (!afiliado) {
      return res.status(404).json({ error: "El afiliado no existe" });
    }

    if(afiliado.parentesco !== "hijo" && afiliado.parentesco !== "hija" ){
      return res.status(200).json({ existe: true });
    }
    else{
       return res.status(200).json({ existe: false });
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}




module.exports = {
  createAffiliate,
  getAffiliates,
  getAffiliateById,
  updateAffiliate,
  deleteAffiliate,
  verificarsiHayAfiliadoConDocumento,
  agregarContraseña,
  tieneContraseña,
  esSuContraseña,
  getAffiliateByDocument,
  getGrupoFamiliar,
  esHijo,
  getTieneHijos
  

}