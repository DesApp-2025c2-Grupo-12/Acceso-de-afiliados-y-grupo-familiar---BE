# 🧩 Acceso de Afiliados y Grupo Familiar — Backend

## 🎯 Objetivo

El backend del proyecto **Acceso de Afiliados y Grupo Familiar** forma parte del sistema desarrollado para la empresa Medicina Integral.
Su propósito es brindar soporte a la aplicación web utilizada por los afiliados, permitiendo la gestión y almacenamiento de información vinculada a servicios médicos y administrativos.

A través de esta API, los afiliados y algunos miembros del grupo familiar pueden:

- Solicitar turnos de atención (según disponibilidad).
- Gestionar reintegros.
- Iniciar pedidos de autorización de prestaciones.
- Registrar recetas para solicitar cobertura.
- Consultar la cartilla de prestadores.

---

## ⚙️ Tecnologías utilizadas

- **Node.js** — Entorno de ejecución.
- **Express.js** — Framework para API REST.
- **Sequelize ORM** — Mapeo objeto-relacional.
- **MySQL / PostgreSQL** — Bases de datos relacionales.
- **JavaScript (ES6+)**
- **Nodemon** — Recarga en desarrollo.

---

## 🗂️ Estructura del proyecto

```
ACCESO-DE-AFILIADOS-Y-GRUPO-FAMILIAR---BE/
│
├─ node_modules/
│
├─ seeders/
│   ├─ 20251030170938-afiliados-fijos.js
│   ├─ 20251030172502-turnos-fijos.js
│   └─ 20251111120000-recetas-fijas.js
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
│   │   └─ utils/
│   │       └─ validations/
│   │           ├─ providerValidation.js
│   │           ├─ recipeValidation.js
│   │           └─ validations.js
│   │
│   ├─ middlewares/
│   │   ├─ affiliateMiddleware.js
│   │   ├─ appointmentMiddleware.js
│   │   ├─ authorization.middleware.js
│   │   ├─ providerMiddleware.js
│   │   ├─ recipeMiddleware.js
│   │   ├─ validateData.js
│   │   ├─ validateIds.js
│   │   └─ validateSchema.js
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
│       ├─ authorization.schema.js
│       ├─ refund.schema.js
│       ├─ recipe.schema.js
│       └─ provider.schema.js
│
├─ main.js
├─ .gitignore
├─ package.json
├─ package-lock.json
├─ README.md
└─ 127.0.0.1

```
---
# 📡 Endpoints principales

### 🧩 Ejemplo - Afiliados



| Método | Endpoint                              | Descripción                  |
| ------ | ------------------------------------- | ---------------------------- |
| GET    | `http://localhost:3000/affiliate`     | Obtiene todos los afiliados. |
| GET    | `http://localhost:3000/affiliate/:id` | Obtiene un afiliado por ID.  |
| POST   | `http://localhost:3000/affiliate`     | Crea un nuevo afiliado.      |
| PUT    | `http://localhost:3000/affiliate/:id` | Actualiza un afiliado.       |
| DELETE | `http://localhost:3000/affiliate/:id` | Elimina un afiliado.         |


# 🧪 Ejemplo — GET todos los afiliados

```
[
  {
    "id": 1,
    "nombre": "juan",
    "apellido": "Perez",
    "numeroDeDocumento": "38322514",
    "numeroDeAfiliado": "11111",
    "planMedico": "933"
  },
  {
    "id": 2,
    "nombre": "gabriel",
    "apellido": "Perez",
    "numeroDeDocumento": "38322515",
    "numeroDeAfiliado": "11112",
    "planMedico": "933"
  },
  {
    "id": 3,
    "nombre": "minerba",
    "apellido": "perez",
    "numeroDeDocumento": "38322516",
    "numeroDeAfiliado": "11113",
    "planMedico": "933"
  },
  {
    "id": 4,
    "nombre": "luciana",
    "apellido": "perez",
    "numeroDeDocumento": "38322517",
    "numeroDeAfiliado": "11114",
    "planMedico": "933"
  }
]
```
---


# 🚀 Uso

1. Clonar el repositorio.

2. Instalar dependencias: 

```
npm install
```

3. Configurar la base de datos en: 

``` 
src/db/config/config.json
```

4. Ejecutar migraciones y seeders:

```
npx sequelize db:migrate
npx sequelize db:seed:all
```

5. Iniciar el servidor en desarrollo:

```
npm run dev
```

6. Servidor disponible en:

```
✔️ Conexión a la base de datos OK
✔️ Generación de tablas OK
🚀 La app arrancó en el puerto 3000
```

---

# 🧑‍💻 Autores

Proyecto académico desarrollado en el marco de la Universidad Nacional de Hurlingham (UnaHur). Equipo de desarrollo:

* Gabriel Facundo Gutiérrez.
* Luana Belén Calderón.
* Ezequiel Escobar.
* Franco Cantero.
* Diego Andrés Primera.

---
