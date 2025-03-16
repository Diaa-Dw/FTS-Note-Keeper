# Note Keeper API

## Documentation
[API Documentation](https://documenter.getpostman.com/view/29614238/2sAYkBsgvb)

## Overview
The Note Keeper API is a RESTful service built using Node.js, Express.js, and MongoDB. It allows users to create, manage, and organize notes securely with authentication features.

## Features
- **User Authentication**: Register, login, and logout functionality using JWT.
- **CRUD Operations**: Users can create, read, update, and delete their own notes.
- **Search**: Users can search notes by title or content.
- **Pagination**: Retrieve notes in paginated format.
- **Security**: Includes middleware to sanitize input and prevent attacks.


## Tech Stack
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/-Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/-Mongoose-880000?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/-JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Helmet](https://img.shields.io/badge/-Helmet-F05032?style=for-the-badge&&logoColor=white)
![Rate Limit](https://img.shields.io/badge/-Rate%20Limit-FFA500?style=for-the-badge&logo=security&logoColor=white)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/Diaa-Dw/FTS-Note-Keeper
   cd FTS-Note-Keeper
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables by creating a `.env` file:
   ```env
    NODE_ENV=development
    PORT=8080
    DB_URL=your_mongodb_connection_string
    DB_PASSWORD=your_database_password
    JWT_SECRET=your_jwt_secret
    JWT_EXPIRES_IN=7d
    JWT_COOKIE_EXPIRES_IN=your_cookie_expiration_time
   ```
4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### Authentication
| Method | Endpoint       | Description        |
|--------|---------------|--------------------|
| POST   | /api/v1/users/register | Register a user and get token   |
| POST   | /api/v1/users/login    | Login and get token |
| POST   | /api/v1/users/logout   | Logout user       |

### Notes
| Method | Endpoint          | Description                 |
|--------|------------------|-----------------------------|
| GET    | /api/v1/notes           | Get all user notes (paginated) |
| POST   | /api/v1/notes           | Create a new note           |
| GET    | /api/v1/notes/:id       | Get a single note           |
| PUT    | /api/v1/notes/:id       | Update a note               |
| DELETE | /api/v1/notes/:id       | Delete a note               |
| GET    | /api/v1/notes/search?query=YOUR_QUERY | Search notes (paginated)|
