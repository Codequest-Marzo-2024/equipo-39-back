# Code Quest - 2024 - DevTalles

## Desafio

Desarrollar una aplicación web que proporcione a la comunidad de DevTalles una herramienta versátil para realizar sorteos en cualquier momento.

## Requerimientos basicos

- Panel administrativo para la gestión de los sorteos a realizar (CRUD de sorteos solo para personal Admin).
- Opción para seleccionar un ganador (Solo Admin)
- Botón para participar en el sorteo (se debe validar que estén
  unidos al servidor de Devtalles)
- Usar cualquier tecnología usada en los cursos de Fernando
- Para este proyecto se prefiere una aplicación web
- Autenticación y Autorización de Usuarios Admin

## Pasos para levantar este Backend

1. Clonar el repositorio
2. Instalar las dependencias con `yarn` o `npm install`
3. Crear un archivo `.env` en base al archivo `.env.example` y completar las variables de entorno
4. Correr la base de datos con `docker-compose up -d`
5. Ejecutar las migraciones de Prisma con `npx prisma migrate deploy`
6. Ejcutar el seed de Prisma con `npx prisma db seed`
7. Correr el servidor con `yarn start:dev` o `npm run start:dev`
