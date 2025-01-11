# Customer Support WhatsApp Bot

A TypeScript-based Node.js application for handling customer support inquiries via WhatsApp. This bot uses:
- **Express** for the REST API
- **PostgreSQL** (via **Prisma** ORM) for database storage
- **WWeb.js** for WhatsApp Web automation
- **Jest** for testing

## Features

1. **WhatsApp Bot**
   - Greets new users, captures their name, and stores session data in-memory.
   - Looks up FAQs from a PostgreSQL database.
   - Logs every user query and the bot’s response.
   - Uses OpenAI GPT (optional) to provide dynamic answers if no FAQ match is found.

2. **RESTful APIs**
   - Endpoints for managing FAQs (`/api/faqs`) and logs (`/api/logs`).
   - Full CRUD operations: create, read, update, delete.

3. **Database Logging**
   - Every conversation snippet is recorded for future analysis.

4. **Session Handling**
   - Allows users to reset or exit via keywords like "exit" or "reset".

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Seeding the FAQ Database](#seeding-the-faq-database)
- [Running in Development](#running-in-development)
- [Testing](#testing)
- [Swagger Documentation](#swagger-documentation)
- [Deployment Notes](#deployment-notes)
- [License](#license)

## Prerequisites

- [Node.js](https://nodejs.org/en/) (v14+)
- [PostgreSQL](https://www.postgresql.org/) or a hosted PostgreSQL instance
- (Optional) [OpenAI API Key](https://platform.openai.com/account/api-keys), if you plan to enable AI fallback

## Installation

1. **Clone** this repo:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

## Environment Variables

- Create a .env file in the project root with the following (adjust as needed):
  ```bash
  DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DB_NAME"
  PORT=3000

  // For AI Fallback (OpenAI):
  OPENAI_API_KEY="sk-xyz..."
  ```

  (You should also create a .env.test for a separate database)

## Database Setup

1. Generate Prisma Client:
   ```bash
   npx prisma generate
   ```

2. Run Migrations:
   ```bash
   npx prisma migrate dev --name init
   ```
This creates or updates your local database schema.

## Seeding the FAQ Database
- To insert initial FAQ data, run:
  ```bash
  npm run seed
  ```

This executes the script in prisma/seed.ts which populates the faqs table with common questions.

## Running In Development
   ```bash
   npm run dev

- This uses ts-node to start the Express server.
- You’ll see a QR code in your terminal from WWeb.js. Scan it with WhatsApp → Linked Devices to connect the bot
```


## Testing
I used Jest + Supertest to cover unit and integration tests:
```bash
npm run test
```

## Swagger Documentation
I used [https://www.npmjs.com/package/swagger-ui-express](swagger-ui-express) and OpenAPI-specification to document the endpoints. See [https://chatgpt.com/g/g-p-678127eab30081918af2c6f22c72556e-customer-support-bot/c/678127fc-726c-800d-9312-e5b18fa06306#swagger-documentation](Swagger-Documentation) for setup instructions.

## QR Code:
![alt text](image.png)