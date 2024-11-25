# Project SIMLITABMAS

This project is a [brief description of the project, e.g., web application, API service, etc.], developed using Next.js, Prisma, PostgreSQL, and MinIO. This guide will help you set up and get started with development.

## Prerequisites

Make sure you have the following tools installed:

- **Git**: For version control.
- **Docker**: To run the database and MinIO services in containers.
- **Node.js**: To run the Next.js application.
- **Prisma**: For managing and running database migrations.

## Setup and Development Steps

1. **Clone the Repository**

   Start by cloning the repository to your local machine:

   ```bash
   git pull origin dev
   ```

2. **Install Dependencies**

   Install all the necessary dependencies for the project:

   ```bash
   npm install
   ```

3. **Run Database and MinIO with Docker**

   This project uses PostgreSQL as the database and MinIO as bucket storage. You can run these services with Docker:

   ```bash
   docker-compose up -d db
   docker-compose up -d minio
   ```

4. **Apply Database Migrations**

   Once the database services are running, apply the schema migrations defined in Prisma:

   ```bash
   npx prisma migrate deploy
   ```
5. **Built Prisma Client**

   Built Prisma client to generate client and interfaces:

   ```bash
   npx prisma generate
   ```

6. **Seeding Database**

   Seeding the database by run this command:

   ```bash
   npx prisma db seed
   ```

7. **Run the Development Server**

   Start by cloning the repository to your local machine:

   ```bash
   npm run dev
   ```

   The server will be running at http://localhost:3000

8. **Open Prisma Studio**

   Prisma Studio provides a graphical interface for manipulating data in the database. To open it, use the command:

   ```bash
   npx prisma studio
   ```

   The server will be running at http://localhost:5555


## Dummy Account

Open file at /prisma/seeder/seed.ts
