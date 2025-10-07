const { Affiliate } = require("../db/models");



const createAffiliate = async (req, res) => {
  try {
    const nuevoAffiliate = await Affiliate.create(req.body);
    res.status(201).json(nuevoAffiliate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getAffiliates = async(req,res) =>{
 try {
    const affiliates = await Affiliate.findAll({attributes:["id","nombre","apellido","numeroDeDocumento","numeroDeAfiliado","planMedico"]})
    res.json(affiliates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getAffiliateById = async(req,res) =>{
    const id = req.params.id
    const afiliado  = await Affiliate.findByPk(id);
    try {
        res.status(201).json(afiliado)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updateAffiliate = async(req,res) =>{

  try {
     const id = req.params.id
     const afiliadoAModificar = await Affiliate.findByPk(id)
     const afiliadoModificado = await afiliadoAModificar.update(req.body)
     res.status(201).json(afiliadoModificado)

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const deleteAffiliate = async (req,res) =>{
  try {
     const id = req.params.id
        await Affiliate.destroy(
            {
                where: { id }
            })
       
        res.status(201).json({ message: "Afiliado eliminada correctamente"})
  } catch (error) {
     res.status(400).json({ error: error.message });
  }
}



module.exports =  {
  createAffiliate,
  getAffiliates,
  getAffiliateById,
  updateAffiliate,
  deleteAffiliate
}