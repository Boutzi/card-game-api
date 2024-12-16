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
   GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
   FACEBOOK_APP_ID=<your-facebook-client-id>
   FACEBOOK_APP_SECRET=<your-facebook-client-secret>
   FACEBOOK_CALLBACK_URL=http://localhost:3000/auth/facebook/callback
   MICROSOFT_CLIENT_ID=<your-microsoft-client-id>
   MICROSOFT_CLIENT_SECRET=<your-microsoft-client-secret>
   MICROSOFT_CALLBACK_URL=http://localhost:3000/auth/microsoft/callback
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
- **GET /auth/google/callback**: Callback for Google OAuth.
- **GET /auth/facebook**: Initiates Google OAuth authentication.
- **GET /auth/facebook/callback**: Callback for Google OAuth.
- **GET /auth/microsoft**: Initiates Google OAuth authentication.
- **GET /auth/microsoft/callback**: Callback for Google OAuth.
- **GET /auth/failure**: Authentication failure route.
- **GET /logout**: Logs out the current user.

## License

MIT License. See the [LICENSE](LICENSE) file for details.
