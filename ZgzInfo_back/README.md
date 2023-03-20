
# Estructura de ficheros

# package.json

Es el archivo de configuración principal del proyecto y debe encontrarse en la raíz del mismo. En él debe estar reflejado el nombre del proyecto, versión, descripción, scripts, autor, tipo de licencia y algo muy importante las dependencias.

# index.js
Es el archivo para conectar NodeJS con MongoDB (en el hacemos la conexión a la base de datos y configuración general de mongoose)

# app.js

Es el archivo para crear el servidor web con NodeJS, contiene la configuración de express. En el también importamos y cargamos las rutas después de crearlas.

# routes/user.js

Archivo en el que definimos las rutas (path) a las que responderá nuestra aplicación y en ellas se encontrará la lógica a ejecutar.

# controller/user.js

En el programamos las acciones y operaciones sobre nuestra base de datos, en este caso para obtener los datos de un usuario.

# middlewares/authenticated.js

Archivo con el middleware para validar la autenticación del usuario.

# models/user.js

archivo para crear los esquema y modelo User. Create tables de sql (VO'S)