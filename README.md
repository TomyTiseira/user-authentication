# Proyecto de Gestión de Usuarios y Roles

Este proyecto es una aplicación Node.js que permite la gestión de usuarios y roles. Proporciona funcionalidades para crear, actualizar, recuperar y eliminar tanto usuarios como roles, así como autenticación y documentación de la API.

## Características

- **Gestión de Usuarios**: Crear, actualizar, eliminar y recuperar usuarios.
- **Gestión de Roles**: Crear, actualizar, eliminar y recuperar roles.
- **Autenticación**: Implementación de autenticación JWT.
- **Documentación de la API**: Documentación interactiva de la API utilizando Swagger UI.

## Configuración

1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_REPOSITORIO>
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   - Crea un archivo `.env` basado en el archivo `.env.template` y configura las variables necesarias, como `MONGO_URI`, `PORT`, `SECRET_JWT`, etc.

4. Inicia la aplicación:
   ```bash
   npm start
   ```

## Rutas de la API

- **Autenticación**: `/auth`
  - `POST /auth/login`: Iniciar sesión.
  - `POST /auth/logout`: Cerrar sesión.
  - `GET /auth/profile`: Obtener el perfil del usuario (requiere autenticación).
  - `POST /auth/refresh`: Refrescar el token de autenticación.
  
- **Usuarios**: `/user`
  - `POST /user`: Crear un nuevo usuario
  - `GET /user`: Obtener todos los usuarios
  - `GET /user/:id`: Obtener un usuario por ID
  - `PUT /user/:id`: Actualizar un usuario por ID
  - `DELETE /user/:id`: Eliminar un usuario por ID
  
- **Roles**: `/role`
  - `POST /role`: Crear un nuevo rol
  - `GET /role`: Obtener todos los roles
  - `GET /role/:id`: Obtener un rol por ID
  - `PUT /role/:id`: Actualizar un rol por ID
  - `DELETE /role/:id`: Eliminar un rol por ID

## Pruebas

Para ejecutar las pruebas, utiliza el siguiente comando:
```bash
npm test
```

