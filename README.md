# Proyecto React - Enviar Notificaciones

Este proyecto fue creado con [Create React App](https://github.com/facebook/create-react-app) para facilitar el desarrollo de una aplicación React que envía notificaciones a través de Firebase Cloud Messaging (FCM).

## Introducción

Este proyecto proporciona una interfaz para enviar notificaciones a dispositivos móviles utilizando Firebase Cloud Messaging. Puedes especificar el nombre de la aplicación, el ID del chofer, el título y el cuerpo de la notificación, así como datos adicionales en formato clave-valor.

## Prerequisitos

Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu máquina:

- [Node.js](https://nodejs.org/) (versión 14 o superior recomendada)
- [npm](https://www.npmjs.com/) (se instala automáticamente con Node.js)

## Instalación

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/tu_usuario/tu_repositorio.git

   ```

2. **Navega al directorio del proyecto:**

   ```bash
    cd tu_repositorio

   ```

3. **Instala las dependencias:**

   ```bash
    npm install

   ```

4. **Configura tus variables de entorno:**

   Crea un archivo .env en la raíz del proyecto y añade las siguientes variables de entorno. Usa el archivo .env.example como referencia:

   ```bash
    REACT_APP_FIREBASE_API_URL=http://example.com/api/getfcmbt
    REACT_APP_CHOFER_TOKENS_URL=https://example.com/token?chofer=
    REACT_APP_FCM_API_URL=https://fcm.googleapis.com/v1/projects/


   ```

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar los siguientes comandos:

### npm start

Ejecuta la aplicación en modo de desarrollo.
Abre http://localhost:3000 para ver la aplicación en tu navegador.
La página se recargará automáticamente cuando realices cambios. También podrás ver los errores de lint en la consola.
