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
        fecha: "2025-11-25",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Garcia",
        lugarDeAtencion: "calle blibli 245",
        especialidad: "pediatria",
        horario: "08:20:00",
        fecha: "2025-11-25",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Garcia",
        lugarDeAtencion: "calle blibli 245",
        especialidad: "pediatria",
        horario: "08:40:00",
        fecha: "2025-11-25",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Garcia",
        lugarDeAtencion: "calle blibli 245",
        especialidad: "pediatria",
        horario: "09:00:00",
        fecha: "2025-11-25",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Garcia",
        lugarDeAtencion: "calle blibli 245",
        especialidad: "pediatria",
        horario: "09:20:00",
        fecha: "2025-11-25",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Garcia",
        lugarDeAtencion: "calle blibli 245",
        especialidad: "pediatria",
        horario: "09:40:00",
        fecha: "2025-11-25",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Garcia",
        lugarDeAtencion: "calle blibli 245",
        especialidad: "pediatria",
        horario: "10:00:00",
        fecha: "2025-11-25",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Garcia",
        lugarDeAtencion: "calle blibli 245",
        especialidad: "pediatria",
        horario: "10:20:00",
        fecha: "2025-11-25",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Garcia",
        lugarDeAtencion: "calle blibli 245",
        especialidad: "pediatria",
        horario: "10:40:00",
        fecha: "2025-11-25",
        createdAt: new Date(),
        updatedAt: new Date(),
        affiliateId:null
      },
      {
        nombreDelPrestador: "Dr Garcia",
        lugarDeAtencion: "calle blibli 245",
        especialidad: "pediatria",
        horario: "11:00:00",
        fecha: "2025-11-25",
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
