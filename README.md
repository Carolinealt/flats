# Flats API

**Flats API** – is a server application for working with the apartment database. It allows to receive, create, update and delete real estate objects.

## Technologies used

Node.js – JavaScript runtime environment
Express.js – Web framework for building APIs
MongoDB + Mongoose – Database and ODM
Vite – Development and build tool for frontend
ESLint – Linter for maintaining clean code
React – Linter for maintaining clean code

## Installation and launch
npm install

## Start the server in development mode
npm run dev

## Available API methods:
## Get all flats
GET /api/flats?page=1&perPage=10&sortBy=price&sortOrder=ASC

## Get a flat by ID
GET /api/flats/:flatId

## Create a new flat
POST /api/flats
Content-Type: multipart/form-data

{
"title": "Title",
"description": "Description",
"price": 50000,
"rooms": 3,
"photos": []
}

## Update flat information
PATCH /api/flats/:flatId
Content-Type: multipart/form-data

{
"title": "Title",
"description": "Description",
"price": 50000,
"rooms": 3,
"photos": []
}

## Delete a flat
DELETE /api/flats/:flatId