# Hurix Assignments

## 1. Frontend Assignment

### What it uses

- Typescript
- Vite
- Shadcn
- Tanstack React Query

### How to run

- make sure you node:20 and above is used
- by navigating to the `fe-react` directory, run `npm install` command
- copy content from `.env.sample` into `.env` file and change the API KEY
- start the application using `npm run dev`

### Deployment

- [Link to deployed frontend app](https://fe-hurix.websofmine.com)
- The application is hosted on VPS attached to a domain.

## 2. Backend Assignment

### Technologies used

- Hono
- Typescript
- Docker
- DrizzleORM
- PostgreSQL

### How to run the app

- navigate to the `be-hono` directory and run `npm install` command
- copy content from `.env.sample` into `.env` file
- run the docker compose file using the command: `docker compose up -d`
- if running for the first time make sure to migrate the database changes by running `npm run mig:run` followed by `npm run mig:seed` for seeding the database
- postman collection can be imported which is present in `/postman` directory

### Deployments

- [Link to Deployed Application](https://be-hurix.websofmine.com)
- The application is hosted on VPS attached to a domain.
