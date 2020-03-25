**_Diego Bergara : Test - Ripio_**

## Índice

- [Introducción](#introducción)

- [Implementación](#implementación)

- [Ejecutar la aplicación](#ejecutar-la-aplicación)

- [Funcionalidades de la aplicación](#funcionalidades-de-la-aplicación)

- [Aspectos a mejorar](#aspectos-a-mejorar)

## Introducción

El proyecto realizado cumple con los requerimientos mencionados [aquí](https://docs.google.com/document/d/1QgpsycBZJnsjtf0zXPTbTF2DVSLe4GiK8ijZUGC8XHU/edit?usp=sharing)

## Implementación

La aplicación está divida en dos grandes partes, el backend, donde se manejan y almacenan los datos utilizados, y el frontend, donde se muestran los datos del backend de una manera mas agradable e interactiva, el front y elbackend se comunican mediante una REST request.

Para el backend se utilizó python y el framework Django, además de una base de datos SQLite, la cual para motivos de demostrar el funcionamiento cumple con los requisitos.

Para el frontend se utilizó React y Axios para los llamados a la API REST realizada en Django.

## Ejecutar la aplicación

El pre-requisistos es tener instalado [Docker](https://www.docker.com/)

Para ejecutar la aplicación debe ejecutarse, desde la consola de comandos con origen en la ruta del archivo `docker-compose.yml`, los siguientes comandos:

    docker-compose build

Una vez termine introducimos:

    docker-compose up

Tambien se puede iniciar por separado, desde la carpeta `frontend` abrir una consola de comandos e introducir los siguientes comandos:

    npm install
    npm start

(Para iniciar de esta manera es necesario tenes instalado `node.js`)

Y desde la carpeta `api` en una consola de comandos ingresar:

    python manage.py runserver

(Para iniciar de estamanera es necesario tener instalados los requerimientos indicados en `requirements.txt`
Al terminar de correr podremos acceder a:

- frontend: http://localhost:3000/

- backend: http://localhost:8000/admin

las credenciales para django son user y password `admin`

## Funcionalidades de la aplicación

En la aplicacion se puede registrar, una vez registrado el login se realiza automático, una vez en la view /home podremos ver nuestras cuentas, relizar transacciones, crear cuentas de monedas que no tengamos y visualizar las transferencias en la se encuentran nuestras cuentas.

Para realizar transferencias es necesario inidicar el numero de cuenta origen (debe ser una cuenta de nuestra propiedad, tabla), el numero de cuenta destino y el monto que se desea transferir. La aplicación automaticamente convierte el dinero a la moneda de la cuenta de destino. Una vez realizada la transacción podremos verla en la tabla de transacciones.

Se pueden agregar monedas desde el `admin` de django, a modo de que solo los administradores del sistema tienen control sobre esa información.

## Aspectos a Mejorar

Un mejor handling sobre los cambios de moneda en las transacciones, ahora se encuentran todas los `exchange_rates` en base DÓLAR por lo que los cambios no son excatos.

Utilizar una base de datos que soporte mejor la concurrencia y que sea mas amena a la escalabilidad.

Agregar forma de realizar ingresos de dinero a las cuentas de los uruarios.

En el frontend, ahora mismo no es del todo responsive, puede mejorar esa parte, realizar control de inputs antes de enviar datos. Tembién se debería usar react'redux para mejorar la comunicación con la api y entre componentes.
