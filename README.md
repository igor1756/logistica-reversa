# Logística Reversa de Equipamentos

Sistema para gestão do ciclo de vida de equipamentos corporativos.

## Arquitetura

Backend
- NestJS
- Prisma ORM
- PostgreSQL
- Docker

Frontend
- Next.js
- React
- TypeScript

## Funcionalidades

- Controle de equipamentos
- Solicitação de recolhimento
- Avaliação técnica
- Destinação (venda, doação ou reciclagem)
- Auditoria de status

## Estrutura

apps/
 backend/
 frontend/

## Rodar projeto

### Banco

docker compose up -d

### Backend

cd apps/backend
npm install
npm run start:dev

### Frontend

cd apps/frontend
npm install
npm run dev
