# Backend La Brújula Llanera

Este proyecto contiene el backend para el sistema de gestión de La Brújula Llanera. Aquí se manejan los controladores, rutas, APIs, modelos, migraciones, autenticación y más.

---

## **Requisitos Previos**

1. **Node.js**: Asegúrate de tener instalado Node.js (versión 16 o superior).
2. **PostgreSQL**: Configura una base de datos PostgreSQL.
3. **Supabase**: Si usas Supabase, configura las credenciales necesarias.

---

## **Instalación**

1. Inicializa el proyecto:
   ```bash
   npm init -y
   ```

2. Instala las dependencias principales:
   ```bash
   npm install express pg pg-hstore sequelize bcrypt cors dotenv @supabase/supabase-js
   ```

3. Instala las dependencias de desarrollo:
   ```bash
   npm install --save-dev eslint @eslint/js globals nodemon mocha sequelize-cli
   ```

4. Configura Sequelize:
   ```bash
   npx sequelize-cli init
   ```

---

## **Comandos Disponibles**

### **Migraciones**

- Crear un modelo y su migración:
  ```bash
  npx sequelize-cli model:generate --name User --attributes name:string,email:string,password:string
  ```

- Ejecutar migraciones:
  ```bash
  npx sequelize-cli db:migrate --migrations-path src/database/migrations
  ```

- Deshacer la última migración:
  ```bash
  npx sequelize-cli db:migrate:undo --migrations-path src/database/migrations
  ```

---

### **Seeders**

- Ejecutar un seeder específico:
  ```bash
  npx sequelize-cli db:seed --seeders-path src/database/seeders --seed seeder-user.js
  ```

- Ejecutar todos los seeders:
  ```bash
  npx sequelize-cli db:seed:all --seeders-path src/database/seeders
  ```

- Deshacer un seeder específico:
  ```bash
  npx sequelize-cli db:seed:undo --seeders-path src/database/seeders --seed seeder-user.js
  ```

- Deshacer todos los seeders:
  ```bash
  npx sequelize-cli db:seed:undo:all --seeders-path src/database/seeders
  ```

---

### **Reiniciar Secuencias de IDs en PostgreSQL**

Si necesitas reiniciar las secuencias de IDs en PostgreSQL, ejecuta los siguientes comandos SQL:

```sql
-- Reiniciar secuencia para Usuarios
ALTER SEQUENCE "Usuarios_id_Usuario_seq" RESTART WITH 1;

-- Reiniciar secuencia para Categorias
ALTER SEQUENCE "Categorias_id_Categoria_seq" RESTART WITH 1;

-- Reiniciar secuencia para CategoriaImagen
ALTER SEQUENCE "CategoriaImagen_id_Categoria_Imagen_seq" RESTART WITH 1;

-- Reiniciar secuencia para Lugares
ALTER SEQUENCE "Lugares_id_Lugar_seq" RESTART WITH 1;

-- Reiniciar secuencia para Comentarios
ALTER SEQUENCE "Comentarios_id_Comentario_seq" RESTART WITH 1;

-- Reiniciar secuencia para ProductoMasVendido
ALTER SEQUENCE "ProductoMasVendido_id_Producto_Mas_Vendido_seq" RESTART WITH 1;
```

---

### **Scripts en `package.json`**

Puedes agregar los siguientes scripts en tu archivo `package.json` para facilitar la ejecución de comandos:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js",
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "seed:all": "sequelize-cli db:seed:all --seeders-path src/database/seeders",
  "seed:undo:all": "sequelize-cli db:seed:undo:all --seeders-path src/database/seeders",
  "seed": "sequelize-cli db:seed --seeders-path src/database/seeders",
  "migrate": "sequelize-cli db:migrate --migrations-path src/database/migrations",
  "migrate:undo": "sequelize-cli db:migrate:undo --migrations-path src/database/migrations"
}
```

---

## **Ejecución del Proyecto**

1. Inicia el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

2. Accede a la documentación Swagger:
   - URL: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## **Dependencias**

### **Dependencias Principales**
- `express`: Framework para construir APIs.
- `pg` y `pg-hstore`: Conectores para PostgreSQL.
- `sequelize`: ORM para manejar la base de datos.
- `bcrypt`: Para encriptar contraseñas.
- `cors`: Para habilitar CORS.
- `dotenv`: Para manejar variables de entorno.
- `@supabase/supabase-js`: Cliente para interactuar con Supabase.

### **Dependencias de Desarrollo**
- `eslint`: Herramienta para analizar el código.
- `@eslint/js`: Configuración para ESLint.
- `globals`: Variables globales para ESLint.
- `nodemon`: Reinicia automáticamente el servidor en desarrollo.
- `mocha`: Framework para pruebas.
- `sequelize-cli`: CLI para manejar migraciones y seeders.

---

## **Estructura del Proyecto**

```
Backend_La_Brujula_Llanera/
├── src/
│   ├── controllers/
│   ├── database/
│   │   ├── migrations/
│   │   ├── seeders/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
├── swagger/
├── tests/
├── .env
├── .eslintrc.js
├── package.json
├── README.md
```

---

## **Contribución**

1. Crea un fork del repositorio.
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m 'Agrega nueva funcionalidad'`).
4. Haz push a tu rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

---

## **Licencia**

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.
