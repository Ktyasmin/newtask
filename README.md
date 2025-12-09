# User App

This is a Node.js + Express + MySQL REST API project to manage users.

## APIs

### POST /users
Add a new user.
- Body: JSON `{ "name": "John Doe", "email": "john@example.com" }`

### GET /users
Fetch all users.

## Deployment on Railway

1. Push project to GitHub.
2. Create a Railway project → Deploy from GitHub.
3. Add MySQL plugin on Railway.
4. Set environment variables:
   - `DB_HOST`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME`
5. Deploy and access APIs at your Railway URL.
