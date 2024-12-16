# Online Card Game API

This API handles user authentication, profile management, and game lobby management for an online card game platform.

## Features

- User authentication with Google OAuth
- User profile management (CRUD)
- Game lobby management (tables, players)
- Built with Node.js, Express, and PostgreSQL

## Installation

1. Clone the repository

   ```
   git clone https://github.com/Boutzi/card-game-api.git
   ```

2. Install dependencies

   ```
   npm install
   ```

3. Configure environment variables
   Create a `.env` file and add the following variables:

   ```
   SESSION_SECRET=<your-session-secret>
   GOOGLE_CLIENT_ID=<your-google-client-id>
   GOOGLE_CLIENT_SECRET=<your-google-client-secret>
   POSTGRES_USER=postgres
   POSTGRES_HOST=localhost
   POSTGRES_DB=<your-database-name>
   POSTGRES_PASSWORD=<your-superadmin-password>
   POSTGRES_PORT=5432
   ```

4. Start the application
   ```
   npm run dev
   ```

## Endpoints

- **GET /**: Home route with login link.
- **GET /profile**: Fetch user profile after authentication.
- **GET /auth/google**: Initiates Google OAuth authentication.
- **GET /google/callback**: Callback for Google OAuth.
- **GET /auth/failure**: Authentication failure route.
- **GET /logout**: Logs out the current user.

## License

MIT License. See the [LICENSE](LICENSE) file for details.
