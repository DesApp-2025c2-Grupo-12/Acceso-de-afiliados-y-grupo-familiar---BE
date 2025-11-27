'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const turnos = [
      {
        nombreDelPrestador: "Dr Garcia",
        lugarDeAtencion: "calle blibli 245",
        especialidad: "pediatria",
        horario: "08:00:00",
        fecha: "2025-11-28",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Garcia",
        lugarDeAtencion: "calle blibli 245",
        especialidad: "pediatria",
        horario: "08:20:00",
        fecha: "2025-11-28",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Garcia",
        lugarDeAtencion: "calle blibli 245",
        especialidad: "pediatria",
        horario: "08:40:00",
        fecha: "2025-11-28",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Garcia",
        lugarDeAtencion: "calle blibli 245",
        especialidad: "pediatria",
        horario: "09:00:00",
        fecha: "2025-11-28",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Garcia",
        lugarDeAtencion: "calle blibli 245",
        especialidad: "pediatria",
        horario: "09:20:00",
        fecha: "2025-11-28",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Garcia",
        lugarDeAtencion: "calle blibli 245",
        especialidad: "pediatria",
        horario: "09:40:00",
        fecha: "2025-11-28",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Garcia",
        lugarDeAtencion: "calle blibli 245",
        especialidad: "pediatria",
        horario: "10:00:00",
        fecha: "2025-11-28",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Garcia",
        lugarDeAtencion: "calle blibli 245",
        especialidad: "pediatria",
        horario: "10:20:00",
        fecha: "2025-11-28",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Garcia",
        lugarDeAtencion: "calle blibli 245",
        especialidad: "pediatria",
        horario: "10:40:00",
        fecha: "2025-11-28",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Garcia",
        lugarDeAtencion: "calle blibli 245",
        especialidad: "pediatria",
        horario: "11:00:00",
        fecha: "2025-11-28",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Gonzalez",
        lugarDeAtencion: "calle wallabi 42,Sydney",
        especialidad: "cardiologia",
        horario: "21:00:00",
        fecha: "2025-11-28",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Robledo",
        lugarDeAtencion: "calle siempreviva 245",
        especialidad: "clinico",
        horario: "09:00:00",
        fecha: "2025-11-28",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Robledo",
        lugarDeAtencion: "calle siempreviva 245",
        especialidad: "clinico",
        horario: "09:30:00",
        fecha: "2025-11-28",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Robledo",
        lugarDeAtencion: "calle siempreviva 245",
        especialidad: "clinico",
        horario: "10:00:00",
        fecha: "2025-11-28",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Robledo",
        lugarDeAtencion: "calle siempreviva 245",
        especialidad: "clinico",
        horario: "10:30:00",
        fecha: "2025-11-28",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Robledo",
        lugarDeAtencion: "calle siempreviva 245",
        especialidad: "clinico",
        horario: "11:00:00",
        fecha: "2025-11-28",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Robledo",
        lugarDeAtencion: "calle siempreviva 245",
        especialidad: "clinico",
        horario: "11:30:00",
        fecha: "2025-11-28",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Robledo",
        lugarDeAtencion: "calle siempreviva 245",
        especialidad: "clinico",
        horario: "12:00:00",
        fecha: "2025-11-28",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Robledo",
        lugarDeAtencion: "calle siempreviva 245",
        especialidad: "clinico",
        horario: "12:30:00",
        fecha: "2025-11-28",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Robledo",
        lugarDeAtencion: "calle siempreviva 245",
        especialidad: "clinico",
        horario: "13:00:00",
        fecha: "2025-11-21",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Robledo",
        lugarDeAtencion: "calle siempreviva 245",
        especialidad: "clinico",
        horario: "13:30:00",
        fecha: "2025-11-21",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Robledo",
        lugarDeAtencion: "calle siempreviva 245",
        especialidad: "clinico",
        horario: "14:00:00",
        fecha: "2025-11-21",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Santilla",
        lugarDeAtencion: "Gurruchaga 233,Hurlingham",
        especialidad: "pediatria",
        horario: "13:00:00",
        fecha: "2025-11-21",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      }
      ,
      {
        nombreDelPrestador: "Dr Santilla",
        lugarDeAtencion: "Gurruchaga 233,Hurlingham",
        especialidad: "pediatria",
        horario: "13:20:00",
        fecha: "2025-11-21",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Santilla",
        lugarDeAtencion: "Gurruchaga 233,Hurlingham",
        especialidad: "pediatria",
        horario: "13:40:00",
        fecha: "2025-11-21",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Santilla",
        lugarDeAtencion: "Gurruchaga 233,Hurlingham",
        especialidad: "pediatria",
        horario: "14:00:00",
        fecha: "2025-11-21",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Santilla",
        lugarDeAtencion: "Gurruchaga 233,Hurlingham",
        especialidad: "pediatria",
        horario: "14:20:00",
        fecha: "2025-11-21",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Santilla",
        lugarDeAtencion: "Gurruchaga 233,Hurlingham",
        especialidad: "pediatria",
        horario: "14:40:00",
        fecha: "2025-11-21",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Santilla",
        lugarDeAtencion: "Gurruchaga 233,Hurlingham",
        especialidad: "pediatria",
        horario: "15:00:00",
        fecha: "2025-11-21",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Santilla",
        lugarDeAtencion: "Gurruchaga 233,Hurlingham",
        especialidad: "pediatria",
        horario: "15:20:00",
        fecha: "2025-11-21",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Santilla",
        lugarDeAtencion: "Gurruchaga 233,Hurlingham",
        especialidad: "pediatria",
        horario: "15:40:00",
        fecha: "2025-11-21",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Santilla",
        lugarDeAtencion: "Gurruchaga 233,Hurlingham",
        especialidad: "pediatria",
        horario: "16:00:00",
        fecha: "2025-11-21",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Santilla",
        lugarDeAtencion: "Gurruchaga 233,Hurlingham",
        especialidad: "pediatria",
        horario: "16:20:00",
        fecha: "2025-11-21",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Santilla",
        lugarDeAtencion: "Gurruchaga 233,Hurlingham",
        especialidad: "pediatria",
        horario: "16:40:00",
        fecha: "2025-11-21",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Santilla",
        lugarDeAtencion: "Gurruchaga 233,Hurlingham",
        especialidad: "pediatria",
        horario: "17:00:00",
        fecha: "2025-11-21",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Santilla",
        lugarDeAtencion: "Gurruchaga 233,Hurlingham",
        especialidad: "pediatria",
        horario: "13:00:00",
        fecha: "2025-11-22",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      }
      ,
      {
        nombreDelPrestador: "Dr Santilla",
        lugarDeAtencion: "Gurruchaga 233,Hurlingham",
        especialidad: "pediatria",
        horario: "13:20:00",
        fecha: "2025-11-22",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Santilla",
        lugarDeAtencion: "Gurruchaga 233,Hurlingham",
        especialidad: "pediatria",
        horario: "13:40:00",
        fecha: "2025-11-22",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Santilla",
        lugarDeAtencion: "Gurruchaga 233,Hurlingham",
        especialidad: "pediatria",
        horario: "14:00:00",
        fecha: "2025-11-22",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Santilla",
        lugarDeAtencion: "Gurruchaga 233,Hurlingham",
        especialidad: "pediatria",
        horario: "14:20:00",
        fecha: "2025-11-22",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Santilla",
        lugarDeAtencion: "Gurruchaga 233,Hurlingham",
        especialidad: "pediatria",
        horario: "14:40:00",
        fecha: "2025-11-22",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Santilla",
        lugarDeAtencion: "Gurruchaga 233,Hurlingham",
        especialidad: "pediatria",
        horario: "15:00:00",
        fecha: "2025-11-22",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Santilla",
        lugarDeAtencion: "Gurruchaga 233,Hurlingham",
        especialidad: "pediatria",
        horario: "15:20:00",
        fecha: "2025-11-23",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Santilla",
        lugarDeAtencion: "Gurruchaga 233,Hurlingham",
        especialidad: "pediatria",
        horario: "15:40:00",
        fecha: "2025-11-23",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Santilla",
        lugarDeAtencion: "Gurruchaga 233,Hurlingham",
        especialidad: "pediatria",
        horario: "16:00:00",
        fecha: "2025-11-23",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Santilla",
        lugarDeAtencion: "Gurruchaga 233,Hurlingham",
        especialidad: "pediatria",
        horario: "16:20:00",
        fecha: "2025-11-23",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Santilla",
        lugarDeAtencion: "Gurruchaga 233,Hurlingham",
        especialidad: "pediatria",
        horario: "16:40:00",
        fecha: "2025-11-23",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Santilla",
        lugarDeAtencion: "Gurruchaga 233,Hurlingham",
        especialidad: "pediatria",
        horario: "17:00:00",
        fecha: "2025-11-23",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Shepherd",
        lugarDeAtencion: "Grey-Sloan Memorial",
        especialidad: "Neurologia",
        horario: "19:00:00",
        fecha: "2025-11-22",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      }
      ,
      {
        nombreDelPrestador: "Dr Shepherd",
        lugarDeAtencion: "Grey-Sloan Memorial",
        especialidad: "Neurologia",
        horario: "19:30:00",
        fecha: "2025-11-22",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      }
      ,
      {
        nombreDelPrestador: "Dr Shepherd",
        lugarDeAtencion: "Grey-Sloan Memorial",
        especialidad: "Neurologia",
        horario: "20:00:00",
        fecha: "2025-11-22",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Shepherd",
        lugarDeAtencion: "Grey-Sloan Memorial",
        especialidad: "Neurologia",
        horario: "20:30:00",
        fecha: "2025-11-22",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Shepherd",
        lugarDeAtencion: "Grey-Sloan Memorial",
        especialidad: "Neurologia",
        horario: "21:00:00",
        fecha: "2025-11-22",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Shepherd",
        lugarDeAtencion: "Grey-Sloan Memorial",
        especialidad: "Neurologia",
        horario: "21:30:00",
        fecha: "2025-11-22",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      }
      ,
      {
        nombreDelPrestador: "Dr Shepherd",
        lugarDeAtencion: "Grey-Sloan Memorial",
        especialidad: "Neurologia",
        horario: "22:00:00",
        fecha: "2025-11-22",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      }
      ,
      {
        nombreDelPrestador: "Dr Shepherd",
        lugarDeAtencion: "Grey-Sloan Memorial",
        especialidad: "Neurologia",
        horario: "20:00:00",
        fecha: "2025-11-22",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Shepherd",
        lugarDeAtencion: "Grey-Sloan Memorial",
        especialidad: "Neurologia",
        horario: "20:30:00",
        fecha: "2025-11-22",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      }





















    ]
    await queryInterface.bulkInsert('Appointments', turnos, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Appointments', null, {});
  }
};
