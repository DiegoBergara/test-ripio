
***Diego Bergara : Test - Ripio***


## Índice
-  [Introducción](#introducción)

-  [Implementación](#implementación)

-  [Ejecutar la aplicación](#ejecutar-la-aplicación)

-  [Funcionalidades de la aplicación](#funcionalidades-de-la-aplicación)

-  [Aspectos a mejorar](#aspectos-a-mejorar)
  

## Introducción

El proyecto realizado cumple con los requerimientos mencionados [aquí](https://docs.google.com/document/d/1QgpsycBZJnsjtf0zXPTbTF2DVSLe4GiK8ijZUGC8XHU/edit?usp=sharing)

## Implementación

La aplicación está divida en dos grandes partes, el backend, donde se  manejan y almacenan los datos utilizados, y el frontend, donde se muestran los datos del backend de una manera mas agradable e interactiva, el front y elbackend se comunican mediante una REST request.

Para el backend se utilizó python y el framework Django, además de una base de datos SQLite, la cual para motivos de demostrar el funcionamiento cumple con los requerimientos.

Para el frontend se utilizó React y Axios para los llamados a la API REST realizada en Django.

## Ejecutar la aplicación 
Los pre-requisistos son tener instalado [Docker](https://www.docker.com/)

Para ejecutar la aplicación debe ejecutarse, desde la consola de comandos con origen en la ruta del archivo `docker-compose.yml`, los siguientes comandos:

    docker-compose build
Una vez termine corremos el siguiente

    docker-compose up
  
Al terminar de correr podremos acceder a:

- frontend: http://localhost:3000/

- backend: http://localhost:8000/admim

las credenciales para django son user y password `admin`

## Funcionalidades de la aplicación
En la aplicacion se puede registrar, una vez registrado el login se realiza automático, una vez en la view /home podremos ver nuestras cuentas, relizar transacciones, crear cuentas de monedas que no tengamos y visualizar las transferencias en la se encuentran nuestras cuentas

## Aspectos a Mejorar
Un mejor handling sobre los cambios de moneda en las transacciones, ahora se encuentran todas las transacciones en base DOLAR por lo que los cambios no son excatos.

Utilizar una base de datos que soporte mejor la concurrencia y que sea mas amena a la escalabilidad.

Agregar forma de realizar ingresos a las cuentas de los uruarios

En el frontend, ahora mismo no es del todo responsive, puede mejorar esa parte, realizar control de inputs antes de enviar datos.