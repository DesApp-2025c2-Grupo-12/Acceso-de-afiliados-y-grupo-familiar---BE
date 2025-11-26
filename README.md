# Acceso de Afiliados y Grupo Familiar — Backend

## Objetivo

El backend del proyecto **Acceso de Afiliados y Grupo Familiar**  forma parte del sistema desarrollado para la empresa Medicina Integral.
Su propósito es brindar soporte a la aplicación web utilizada por los afiliados, permitiendo la gestión y almacenamiento de información vinculada a servicios médicos y administrativos.

### Accesos según perfil de usuario:

- **Afiliado - Titular:** Acceso completo a sus operaciones y a las del grupo familiar. Puede registrar operaciones para sí y para sus hijos.

- **Cónyuge:** Puede visualizar y registrar operaciones propias y de los hijos.

- **Usuarios menores de 16 años:** Pueden acceder a la plataforma, pero no realizar ningún tipo de operación.

- **Usuarios de 16 años o más:** Habilitados para solicitar turnos exclusivamente para sí mismos.

---
A través de esta API, los afiliados y algunos miembros del grupo familiar pueden:

-**Solicitar turnos de atención médica:** Permite solicitar turnos según disponibilidad. Los turnos pueden cancelarse hasta un día antes de la fecha asignada
facilitando la gestión desde la web o la app.

- **Registrar y renovar recetas:** Posibilita cargar, renovar y consultar recetas previas, mostrando los estados actualizados para un seguimiento claro y seguro.

- **Gestionar reintegros:** Incluye la presentación de facturas, detalle de prestaciones y elección de forma de pago (cheque, efectivo, transferencia o depósito), garantizando un proceso ágil.

- **Consultar la cartilla de prestadores:** Ofrece acceso a la cartilla actualizada, con filtros por especialidad, zona y ubicación para una búsqueda más rápida y eficiente.

- **Gestionar autorizaciones:** Permite cargar y dar seguimiento a solicitudes de autorización, con notificaciones de estado que aseguran un proceso claro y confiable.
---

## Tecnologías utilizadas

- **Node.js** — Entorno de ejecución de JavaScript del lado del servidor, que permite crear aplicaciones escalables y rápidas.
- **Express.js** — Framework para construir APIs REST de manera sencilla y organizada.
- **Sequelize ORM** — Herramienta para mapear modelos de JavaScript a tablas de bases de datos relacionales, facilitando consultas y operaciones CRUD.
- **MySQL / PostgreSQL** — Bases de datos relacionales utilizadas para almacenar y gestionar datos de la aplicación.
- **JavaScript (ES6+)** — Lenguaje de programación principal, aprovechando características modernas de ES6 en adelante.
- **Nodemon** — Utilidad que reinicia automáticamente el servidor al detectar cambios en el código, ideal para desarrollo.

---

## Estructura del proyecto

```
ACCESO-DE-AFILIADOS-Y-GRUPO-FAMILIAR---BE/
│
├─ node_modules/
│
├─ seeders/
│   ├─ 20251030170938-afiliados-fijos.js
│   ├─ 20251030172502-turnos-fijos.js
│   ├─ 20251107005748-reintegros-fijos.js
│   ├─ 20251111120000-recetas-fijas.js
│   ├─ 20251113120000-prestadores-fijos.js
│   └─ 20251114120000-autorizaciones-fijas.js
│
├─ src/
│   ├─ controllers/
│   │   ├─ affiliate.controller.js
│   │   ├─ appointment.controller.js
│   │   ├─ appointmentschedule.controller.js
│   │   ├─ authorization.controller.js
│   │   ├─ dashboard.controller.js
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
│   │   ├─ refundMiddleware.js
│   │   ├─ validateData.js
│   │   ├─ validateIds.js
│   │   └─ validateSchema.js
│   │
│   ├─ routes/
│   │   ├─ affiliate.routes.js
│   │   ├─ appointment.routes.js
│   │   ├─ appointmentschedule.routes.js
│   │   ├─ authorization.routes.js
│   │   ├─ dashboard.routes.js
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
## Endpoints principales

### Ejemplo - Afiliados



| Método | Endpoint                              | Descripción                  |
| ------ | ------------------------------------- | ---------------------------- |
| GET    | `http://localhost:3000/affiliate`     | Obtiene todos los afiliados. |
| GET    | `http://localhost:3000/affiliate/:id` | Obtiene un afiliado por ID.  |
| POST   | `http://localhost:3000/affiliate`     | Crea un nuevo afiliado.      |
| PUT    | `http://localhost:3000/affiliate/:id` | Actualiza un afiliado.       |
| DELETE | `http://localhost:3000/affiliate/:id` | Elimina un afiliado.         |


### Ejemplo — GET todos los afiliados

```
[
  {
    "id": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    "numeroDeDocumento": "30123456",
    "numeroDeAfiliado": "TIT001",
    "planMedico": "Plan Oro"
  },
  {
    "id": 2,
    "nombre": "María",
    "apellido": "Pérez",
    "numeroDeDocumento": "28987654",
    "numeroDeAfiliado": "CON001",
    "planMedico": "Plan Oro"
  },
  {
    "id": 3,
    "nombre": "Pedro",
    "apellido": "Pérez",
    "numeroDeDocumento": "56123456",
    "numeroDeAfiliado": "HIJ001",
    "planMedico": "Plan Oro"
  },
  {
    "id": 4,
    "nombre": "Ana",
    "apellido": "Pérez",
    "numeroDeDocumento": "45123456",
    "numeroDeAfiliado": "HIJ002",
    "planMedico": "Plan Oro"
  }
]
```
---


## Uso

1. Clonar el repositorio.

2. Instalar dependencias: 

```
npm install
```

3. Configurar la contraseña en la base de datos en: 

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

## Autores

Proyecto académico desarrollado en el marco de la materia Desarrollo de Aplicaciones- 2do cuatrimestre 2025 - Grupo  N° 12 - Universidad Nacional de Hurlingham (UnaHur).

* Gabriel Facundo Gutiérrez.
* Luana Belén Calderón.
* Ezequiel Escobar.
* Franco Cantero.
* Diego Andrés Primera.

---
