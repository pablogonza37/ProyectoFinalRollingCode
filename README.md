# Rolling Bistro Frontend

## Descripción del Proyecto

Este proyecto es una aplicación web llamada Rolling Bistro. El objetivo principal es realizar todas las operaciones del CRUD y proporcionar un sistema de inicio de sesión con diferentes opciones dependiendo del usuario que se loguee. Solo el usuario administrador podrá administrar las diferentes opciones de menú, mientras que los clientes deberán iniciar su sesión o registrarse para poder solicitar un pedido.


## Tecnologías Utilizadas

Este proyecto ha sido desarrollado utilizando las siguientes tecnologías:

- React 18.2.0
- Vite 5.2.7 (https://vitejs.dev/)
- JavaScript
- React Bootstrap (https://react-bootstrap.netlify.app/)
- HTML
- CSS

## Dependencias

Este proyecto utiliza las siguientes dependencias:

### Dependencias de Producción

- bootstrap: 5.3.3
- bootstrap-icons: 1.11.3
- nodemailer: 6.9.13
- react: 18.2.0
- react-bootstrap: 2.10.2
- react-dom: 18.2.0
- react-hook-form: 7.51.2
- react-modal: 3.16.1
- react-router-dom: 6.22.3
- react-sweetalert2: 0.6.0

## Instalación y Ejecución

# Instalación
### Requisitos

- Node.js (v20.0.0 o superior)

Para instalar este proyecto en tu entorno local, sigue estos pasos:

1. Clona este repositorio: `git clone https://github.com/username/proyectofinalrollingcode.git`
2. Navega al directorio del proyecto: `cd proyectofinalrollingcode`
3. Instala las dependencias: `npm install`
4. Inicia el servidor de desarrollo: `npm run dev`

Para instalar y ejecutar este proyecto, necesitarás tener instalado Node.js y React en tu servidor. Una vez que hayas clonado el repositorio debes instalar Node.js: Puedes descargar Node.js desde su sitio web oficial. Selecciona la versión que se adapte a tu sistema operativo y sigue las instrucciones de instalación.
puedes instalar las dependencias necesarias con el siguiente comando proporcionado.

## Uso

Este proyecto es una aplicación web que permite a los usuarios loguearse en una pantalla de login donde el usuario puede autenticarse o darse de alta a través de un enlace al formulario de registro.
Tambien podrá registrarse donde el usuario nuevo puede darse de alta.

Este proyecto contiene una pantalla principal con información del restaurante y los productos disponibles para que los usuarios puedan
seleccionar los que deseen y puedan crear un pedido seleccionando las opciones de la página principal, pero previamente debe estar logueado.

Además, al seleccionar un producto de la página principal, se mostrará el detalle del producto donde se visualicen correctamente los datos del producto.

Este proyecto contiene una página de Pedidos, la cual es una página que contendrá los menús seleccionados por el usuario y su costo total. Tiene un botón de
hacer pedido y al hacer clic el pedido se guardará en la base de datos con un estado pendiente y se muestra al usuario un mensaje que su pedido fue correctamente realizado.

También, el usuario administrador podrá acceder a una página donde se muestran los listados de usuarios,
productos del menú y pedidos solicitados, además podrá realizar las siguientes operaciones:

- Listar los usuarios
- Dar de alta productos
- Modificar productos
- Eliminar productos
- Listar productos
- Listar los pedidos
- Modificar el estado de los pedidos de pendientes a realizados

Para poder realizar todas estas acciones, necesitaras estas credenciales (puedes modificarlas desde el lado del backend si deseas):
- Usuario: Admin@rollingbistro.com
- Contraseña:Prueba123

También puedes utilizar esta aplicación como un usuario que realizara pedidos creando tus propias credenciales.

Además este proyecto contiene la información de los desarrolladores en una página llamada Acerca De.

Por último y no menos importante, cuenta con una página de error 404 a la cual se accede en el caso de que una ruta no sea encontrada o una funcionalidad no este disponible.

## Deploy del proyecto

https://rolling-bistro.netlify.app/

## Contribución

Si deseas contribuir a este proyecto, puedes comunicarte con el dueño del repositorio.

## Backend del proyecto

https://github.com/pablogonza37/backendProyectoFinalRC

## Contribuyentes
Este proyecto ha sido desarrollado por:
- Pablo Gaston González
- José Eugenio Navarro Bovi
