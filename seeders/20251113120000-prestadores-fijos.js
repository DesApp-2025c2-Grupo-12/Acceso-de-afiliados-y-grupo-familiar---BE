'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const prestadores = [
      {
        numeroDeCuit_Cuil: "20333444555",
        nombreCompleto: "Clínica Central",
        especialidad: "Clínica Médica",
        esCentro: true,
        integraCentro: "Norte",
        telefono: "1144455566",
        correoElectronico: "contacto@clinicacentral.com",
        direccion: "Av. Siempreviva 123, CABA",
        horarioInicio: "08:00:00",
        horarioFin: "18:00:00",
        dias: "Lunes a Viernes",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numeroDeCuit_Cuil: "20322333444",
        nombreCompleto: "Dr. Juan Pérez",
        especialidad: "Cardiología",
        esCentro: false,
        integraCentro: null,
        telefono: "1155566677",
        correoElectronico: "juan.perez@gmail.com",
        direccion: "Calle Falsa 456, Buenos Aires",
        horarioInicio: "09:00:00",
        horarioFin: "17:00:00",
        dias: "Lunes, Miércoles y Viernes",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numeroDeCuit_Cuil: "20311222333",
        nombreCompleto: "Dra. Laura Gómez",
        especialidad: "Pediatría",
        esCentro: false,
        integraCentro: null,
        telefono: "1166677788",
        correoElectronico: "laura.gomez@gmail.com",
        direccion: "Av. Libertador 789, CABA",
        horarioInicio: "08:30:00",
        horarioFin: "16:30:00",
        dias: "Lunes a Viernes",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numeroDeCuit_Cuil: "20399887766",
        nombreCompleto: "Centro Salud Norte",
        especialidad: "Ginecología",
        esCentro: true,
        integraCentro: "Norte",
        telefono: "1145567788",
        correoElectronico: "norte@centrosalud.com",
        direccion: "Av. del Libertador 1500, Buenos Aires",
        horarioInicio: "07:00:00",
        horarioFin: "19:00:00",
        dias: "Lunes a Sábado",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numeroDeCuit_Cuil: "20388776655",
        nombreCompleto: "Dr. Martín López",
        especialidad: "Dermatología",
        esCentro: false,
        integraCentro: null,
        telefono: "1177788999",
        correoElectronico: "martin.lopez@gmail.com",
        direccion: "Córdoba 456, Córdoba",
        horarioInicio: "10:00:00",
        horarioFin: "18:00:00",
        dias: "Lunes a Viernes",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numeroDeCuit_Cuil: "20377665544",
        nombreCompleto: "Clínica Sur",
        especialidad: "Neurología",
        esCentro: true,
        integraCentro: "Sur",
        telefono: "1146677889",
        correoElectronico: "sur@clinicamedica.com",
        direccion: "Av. San Martín 123, Buenos Aires",
        horarioInicio: "08:00:00",
        horarioFin: "18:00:00",
        dias: "Lunes a Viernes",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numeroDeCuit_Cuil: "20366554433",
        nombreCompleto: "Dra. Valentina Ruiz",
        especialidad: "Traumatología",
        esCentro: false,
        integraCentro: null,
        telefono: "1167788990",
        correoElectronico: "valentina.ruiz@gmail.com",
        direccion: "Santa Fe 789, Santa Fe",
        horarioInicio: "09:00:00",
        horarioFin: "17:00:00",
        dias: "Martes a Sábado",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numeroDeCuit_Cuil: "20355443322",
        nombreCompleto: "Clínica Este",
        especialidad: "Clínica Médica",
        esCentro: true,
        integraCentro: "Este",
        telefono: "1147788990",
        correoElectronico: "este@clinicamedica.com",
        direccion: "Av. Corrientes 987, Buenos Aires",
        horarioInicio: "07:30:00",
        horarioFin: "18:30:00",
        dias: "Lunes a Viernes",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numeroDeCuit_Cuil: "20344332211",
        nombreCompleto: "Dr. Federico Torres",
        especialidad: "Cardiología",
        esCentro: false,
        integraCentro: null,
        telefono: "1158899001",
        correoElectronico: "federico.torres@gmail.com",
        direccion: "Mendoza 123, Mendoza",
        horarioInicio: "08:00:00",
        horarioFin: "16:00:00",
        dias: "Lunes a Viernes",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        numeroDeCuit_Cuil: "20333221100",
        nombreCompleto: "Dra. Carla Méndez",
        especialidad: "Pediatría",
        esCentro: false,
        integraCentro: null,
        telefono: "1178899002",
        correoElectronico: "carla.mendez@gmail.com",
        direccion: "Calle Mitre 456, Buenos Aires",
        horarioInicio: "09:00:00",
        horarioFin: "17:00:00",
        dias: "Lunes a Viernes",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Providers', prestadores, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Providers', null, {});
  }
};
