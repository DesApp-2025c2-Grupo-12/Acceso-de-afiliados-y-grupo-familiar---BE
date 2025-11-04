# 🧩 Acceso de Afiliados y Grupo Familiar — Backend

## 🎯 Objetivo

El backend del proyecto **Acceso de Afiliados y Grupo Familiar** forma parte del sistema desarrollado para la empresa *Medicina Integral*.  
Su propósito es brindar soporte a la aplicación web de afiliados, permitiendo la gestión y almacenamiento de datos vinculados a los servicios médicos y administrativos de la empresa.

A través de esta API, los afiliados y algunos miembros del grupo familiar pueden:

- Solicitar turnos de atención (de acuerdo a la disponibilidad configurada por la empresa).  
- Gestionar reintegros.  
- Abrir pedidos de autorización de prestaciones.  
- Registrar recetas para solicitar cobertura.  
- Consultar la cartilla de prestadores.

---

## ⚙️ Tecnologías utilizadas

- **Node.js** — entorno de ejecución.  
- **Express.js** — framework para la construcción de la API REST.  
- **Sequelize ORM** — mapeo objeto-relacional para la base de datos.  
- **MySQL / PostgreSQL** — base de datos relacional.  
- **JavaScript (ES6+)**  
- **Nodemon** — recarga automática en desarrollo.

---

## 🗂️ Estructura del proyecto

```
ACCESO-DE-AFILIADOS-Y-GRUPO-FAMILIAR---BE/
│
├─ node_modules/
│
├─ seeders/
│   ├─ 20251030170938-afiliados-fijos.js
│   └─ 20251030172502-turnos-fijos.js
│
├─ src/
│   ├─ controllers/
│   │   ├─ affiliate.controller.js
│   │   ├─ appointment.controller.js
│   │   ├─ appointmentschedule.controller.js
│   │   ├─ authorization.controller.js
│   │   ├─ provider.controller.js
│   │   ├─ recipe.controller.js
│   │   └─ refund.controller.js
│   │
│   ├─ db/
│   │   ├─ config/
│   │   │   └─ config.json
│   │   │
│   │   ├─ migrations/
│   │   │   ├─ 20251005153957-create-affiliate.js
│   │   │   ├─ 20251005155025-create-recipe.js
│   │   │   ├─ 20251016163754-create-refund.js
│   │   │   ├─ 20251017000730-create-authorization.js
│   │   │   ├─ 20251018205902-create-appointment.js
│   │   │   ├─ 20251022211210-create-appointment-schedule.js
│   │   │   └─ 20251022214500-create-provider.js
│   │   │
│   │   ├─ models/
│   │   │   ├─ affiliate.js
│   │   │   ├─ appointment.js
│   │   │   ├─ appointmentschedule.js
│   │   │   ├─ authorization.js
│   │   │   ├─ provider.js
│   │   │   ├─ recipe.js
│   │   │   ├─ refund.js
│   │   │   └─ index.js
│   │   │
│   │   ├─ seeders/
│   │   │   ├─ prestadores.json
│   │   │   └─ recetas.json
│   │   │
│   │   └─ utils/
│   │       └─ validations/
│   │           ├─ providerValidation.js
│   │           ├─ recipeValidation.js
│   │           └─ validations.js
│   │
│   ├─ middlewares/
│   │   ├─ validateData.js
│   │   └─ providerMiddleware.js
│   │   └─ recipeMiddleware.js
│   │
│   ├─ routes/
│   │   ├─ affiliate.routes.js
│   │   ├─ appointment.routes.js
│   │   ├─ appointmentschedule.routes.js
│   │   ├─ authorization.routes.js
│   │   ├─ provider.routes.js
│   │   ├─ recipe.routes.js
│   │   └─ refund.routes.js
│   │
│   └─ schemas/
│       ├─ refund.schema.js
│       ├─ recipe.schema.js
│       └─ provider.schema.js
│
├─ main.js
├─ seedProviders.js
├─ .gitignore
├─ package.json
├─ package-lock.json
├─ README.md
└─ 127.0.0.1  


```
---

# 🚀 Uso

1. Clonar el repositorio.
2. Instalar las dependencias con npm install.
3. Configurar la base de datos en el archivo src/db/config/config.json con las credenciales correspondientes.
4. Ejecutar las migraciones y seeders con npx sequelize db:migrate y npx sequelize db:seed:all.
5. Ejecutar el servidor de desarrollo con npm run dev.
6. El servidor estará disponible en http://localhost:3000

---

# 🧑‍💻 Autores

Proyecto académico desarrollado en el marco de la Universidad Nacional de Hurlingham (UnaHur). Equipo de desarrollo:

* Gabriel Facundo Gutiérrez.
* Luana Belén Calderón.
* Ezequiel Escobar.
* Franco Cantero.
* Diego Andrés Primera.

---