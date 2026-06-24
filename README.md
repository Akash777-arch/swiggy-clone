# swiggy-clone

## Project Structure

- `client/` - React.js frontend
  - `public/` - Static assets and HTML entrypoint
  - `src/` - React application source code
    - `components/` - Reusable UI components
    - `pages/` - Page views and routes
    - `hooks/` - Custom React hooks
    - `context/` - Global state providers
    - `services/` - API call logic (placeholder)
    - `utils/` - Helper utilities
    - `App.js` - Main application router
- `server/` - Node.js + Express backend
  - `config/` - Environment and configuration
  - `controllers/` - Request handling logic (placeholder)
  - `models/` - Database schema definitions (placeholder)
  - `routes/` - API routes
  - `middleware/` - Error handling and auth middleware
  - `index.js` - Server entrypoint

## Getting Started

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm start
```
