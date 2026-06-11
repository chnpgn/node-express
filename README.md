# Node Express Guitar App

## Project overview

This is a simple Node.js Express web application for managing guitars with user login support. It uses:

- `Express` for the web server.
- `express-handlebars` for server-side view rendering.
- `Mongoose` for MongoDB object modeling.
- `express-session` for session support.
- `bcrypt` for password hashing.
- `dotenv` for environment variable configuration.

The app includes:

- A login page at `/login`.
- Session-based authentication checks for guitar create/edit/delete routes.
- A guitar listing page at `/guitars`.
- A form to add and edit guitars.
- A MongoDB-backed `User` model and `Guitar` model.

## Files and structure

Key files and folders:

- `index.js` — application entrypoint.
- `app/app.js` — configures Express, Handlebars, session, and routes.
- `app/auth/` — authentication controller, model, and password utilities.
- `app/guitars/` — guitar controller, model, and route definitions.
- `app/views/` — Handlebars templates for home, auth, and guitar pages.
- `public/assets/` — static CSS and JavaScript assets.
- `setup.js` — helper script to create a user account in MongoDB.

## Required environment variables

Create a `.env` file in the project root with the following values:

```env
DB_ADMIN=<your-mongodb-admin-username>
DB_PASSWORD=<your-mongodb-password>
```

The application expects a MongoDB Atlas connection string in the form:

`mongodb+srv://${DB_ADMIN}:${DB_PASSWORD}@phriklasta.6sra03i.mongodb.net/`

## Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file with your MongoDB credentials.

3. Create an initial user account:

   ```bash
   node setup.js
   ```

   - Enter your email.
   - Enter a password.

## Running the app

Start the server:

```bash
npm start
```

Open the app in your browser at:

```text
http://localhost:8000
```

For development with automatic restart on changes, use:

```bash
npm run dev
```

## App flow

- Visit `/` to see the home page.
- Visit `/login` to sign in.
- After login, navigate to `/guitars` to view all guitars.
- Use `/guitars/create` to add a new guitar.
- Edit or delete guitars from the list.

## Notes

- Authentication is session-based and stored in `req.session.user`.
- Guitar search by make is supported via the route `/guitars/:make`.
- If your MongoDB credentials or database connection change, update `.env` accordingly.

## Troubleshooting

- If the app cannot connect to MongoDB, verify the `.env` values and network access for your Atlas cluster.
- If login fails, ensure the user account was created with `node setup.js` and the password was hashed.
- If static assets do not load, confirm `public/assets` is present and the Express static middleware is configured.
