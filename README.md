# Acceso-de-afiliados-y-grupo-familiar---BE

## 📁 Estructura del Proyecto

```
ACCESO-DE-AFILIADOS-Y-GRUPO-FAMILIAR---BE/
│
├─ node_modules/
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
│   │   ├─ migrations/
│   │   │   ├─ 20251005153957-create-affiliate.js
│   │   │   ├─ 20251005155025-create-recipe.js
│   │   │   ├─ 20251016163754-create-refund.js
│   │   │   ├─ 20251017000730-create-authorization.js
│   │   │   ├─ 20251018205902-create-appointment.js
│   │   │   ├─ 20251022211210-create-appointment-schedule.js
│   │   │   └─ 20251022214500-create-provider.js
│   │   ├─ models/
│   │   │   ├─ affiliate.js
│   │   │   ├─ appointment.js
│   │   │   ├─ appointmentschedule.js
│   │   │   ├─ authorization.js
│   │   │   ├─ provider.js
│   │   │   ├─ recipe.js
│   │   │   └─ refund.js
│   │   ├─ seeders/
│   │   │   └─ prestadores.json
│   │       └─ recetas.json
│   │   └─ utils/
│   │       └─ validations/
│   │           └─ providerValidation.js
│   │          └─ recipeValidation.js
│   │
│   └─ routes/
│       ├─ affiliate.routes.js
│       ├─ appointment.routes.js
│       ├─ appointmentschedule.routes.js
│       ├─ authorization.routes.js
│       ├─ provider.routes.js
│       ├─ recipe.routes.js
│       └─ refund.routes.js
│
├─ main.js
├─ seedProviders.js
├─ .gitignore
├─ 127.0.0.1
├─ package.json
├─ package-lock.json
└─ README.md


```

---
