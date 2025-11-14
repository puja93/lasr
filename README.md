# Agent Starter for React

This is a starter template for [LiveKit Agents](https://docs.livekit.io/agents) that provides a simple voice interface using the [LiveKit JavaScript SDK](https://github.com/livekit/client-sdk-js). It supports [voice](https://docs.livekit.io/agents/start/voice-ai), [transcriptions](https://docs.livekit.io/agents/build/text/), and [virtual avatars](https://docs.livekit.io/agents/integrations/avatar).

Also available for:
[Android](https://github.com/livekit-examples/agent-starter-android) • [Flutter](https://github.com/livekit-examples/agent-starter-flutter) • [Swift](https://github.com/livekit-examples/agent-starter-swift) • [React Native](https://github.com/livekit-examples/agent-starter-react-native)

<picture>
  <source srcset="./.github/assets/readme-hero-dark.webp" media="(prefers-color-scheme: dark)">
  <source srcset="./.github/assets/readme-hero-light.webp" media="(prefers-color-scheme: light)">
  <img src="./.github/assets/readme-hero-light.webp" alt="App screenshot">
</picture>

### Features:

- Real-time voice interaction with LiveKit Agents
- Camera video streaming support
- Screen sharing capabilities
- Audio visualization and level monitoring
- Virtual avatar integration
- Light/dark theme switching with system preference detection
- Customizable branding, colors, and UI text via configuration

This template is built with Vite + React and is free for you to use or modify as you see fit.

### Project structure

This is a monorepo with separate frontend and backend workspaces:

```
agent-starter-react/
├── frontend/               # Vite + React application
│   ├── src/
│   │   ├── styles/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── components/
│   │   ├── livekit/
│   │   └── app/
│   ├── hooks/
│   ├── lib/
│   ├── public/
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
├── backend/                # Express API server
│   ├── src/
│   │   └── index.ts       # Token generation endpoint
│   ├── tsconfig.json
│   └── package.json
├── .env.local             # Your LiveKit credentials (gitignored)
├── .env.example           # Template for environment variables
└── package.json           # Root workspace configuration
```

## Getting started

> [!TIP]
> If you'd like to try this application without modification, you can deploy an instance in just a few clicks with [LiveKit Cloud Sandbox](https://cloud.livekit.io/projects/p_/sandbox/templates/agent-starter-react).

[![Open on LiveKit](https://img.shields.io/badge/Open%20on%20LiveKit%20Cloud-002CF2?style=for-the-badge&logo=external-link)](https://cloud.livekit.io/projects/p_/sandbox/templates/agent-starter-react)

Run the following command to automatically clone this template.

```bash
lk app create --template agent-starter-react
```

Then run the app with:

```bash
npm install
npm run dev
```

This will start both the Vite development server (frontend on http://localhost:3000) and the Express backend (API on http://localhost:3001).

You'll also need an agent to speak with. Try our starter agent for [Python](https://github.com/livekit-examples/agent-starter-python), [Node.js](https://github.com/livekit-examples/agent-starter-node), or [create your own from scratch](https://docs.livekit.io/agents/start/voice-ai/).

## Configuration

This starter is designed to be flexible so you can adapt it to your specific agent use case. You can easily configure it to work with different types of inputs and outputs:

#### Example: App configuration (`app-config.ts`)

```ts
export const APP_CONFIG_DEFAULTS: AppConfig = {
  companyName: 'LiveKit',
  pageTitle: 'LiveKit Voice Agent',
  pageDescription: 'A voice agent built with LiveKit',

  supportsChatInput: true,
  supportsVideoInput: true,
  supportsScreenShare: true,
  isPreConnectBufferEnabled: true,

  logo: '/lk-logo.svg',
  accent: '#002cf2',
  logoDark: '/lk-logo-dark.svg',
  accentDark: '#1fd5f9',
  startButtonText: 'Start call',

  // for LiveKit Cloud Sandbox
  sandboxId: undefined,
  agentName: undefined,
};
```

You can update these values in [`app-config.ts`](./app-config.ts) to customize branding, features, and UI text for your deployment.

> [!NOTE]
> The `sandboxId` and `agentName` are for the LiveKit Cloud Sandbox environment.
> They are not used for local development.

#### Environment Variables

Each workspace has its own environment configuration:

**Backend** (`backend/.env.local`):
```bash
# Copy backend/.env.example to backend/.env.local
cd backend
cp .env.example .env.local
```

```env
# LiveKit server configuration (REQUIRED)
LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret
LIVEKIT_URL=wss://your-project.livekit.cloud
PORT=3001
```

**Frontend** (`frontend/.env.local`):
```bash
# Copy frontend/.env.example to frontend/.env.local
cd frontend
cp .env.example .env.local
```

```env
# Backend API endpoint (OPTIONAL - defaults to /api/connection-details for local dev)
VITE_CONN_DETAILS_ENDPOINT=https://your-backend.vercel.app/api/connection-details

# Mapbox access token (OPTIONAL - only if using Mapbox features)
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_token
```

**Important Notes:**
- ✅ **Each workspace has its own `.env` file** - matches how deployment platforms work
- ✅ Backend variables are **never exposed** to the client
- ✅ Frontend variables **must be prefixed with `VITE_`** to be accessible
- ✅ The Express backend handles token generation securely via `/api/connection-details`

### Available Scripts

From the root directory:

- `npm run dev` - Start both frontend (Vite) and backend (Express) in development mode
- `npm run dev:frontend` - Start only the Vite development server (http://localhost:3000)
- `npm run dev:backend` - Start only the Express backend server (http://localhost:3001)
- `npm run build` - Build both frontend and backend for production
- `npm run build:frontend` - Build only the frontend
- `npm run build:backend` - Build only the backend
- `npm run start` - Start both frontend and backend in production mode
- `npm run lint` - Run ESLint on frontend
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Deployment

The frontend and backend can be deployed separately as they are independent services.

### Deploying to Vercel (Recommended)

Both frontend and backend can be deployed on Vercel as separate projects.

#### Backend Deployment on Vercel

1. Create a new **Vercel project** for the backend
2. Connect your repository
3. Configure the service:
   - **Root Directory**: `backend`
   - **Framework Preset**: Other
   - **Build Command**: `npm install && npm run build`
   - **Output Directory**: (leave empty)
4. Add environment variables:
   - `LIVEKIT_API_KEY`
   - `LIVEKIT_API_SECRET`
   - `LIVEKIT_URL`
5. Deploy the service and note the backend URL (e.g., `https://your-backend.vercel.app`)

The backend includes a `vercel.json` configuration file that tells Vercel how to run the Express API.

#### Frontend Deployment on Vercel

1. Create a new **Vercel project** for the frontend
2. Connect your repository (same repo, different project)
3. Configure the service:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add environment variables:
   - `VITE_CONN_DETAILS_ENDPOINT` - Full URL to your backend (e.g., `https://your-backend.vercel.app/api/connection-details`)
   - `VITE_MAPBOX_ACCESS_TOKEN` - If using Mapbox features
5. Deploy the static site

**Note:** Create two separate Vercel projects from the same repository, just use different root directories.

### Deploying to Render

#### Backend Deployment

1. Create a new **Web Service** on Render
2. Connect your repository
3. Configure the service:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: Node
4. Add environment variables:
   - `LIVEKIT_API_KEY`
   - `LIVEKIT_API_SECRET`
   - `LIVEKIT_URL`
   - `PORT` (optional, defaults to 3001)
5. Deploy the service and note the backend URL (e.g., `https://your-backend.onrender.com`)

#### Frontend Deployment

1. Create a new **Static Site** on Render
2. Connect your repository
3. Configure the service:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `frontend/dist`
4. Add environment variables (optional):
   - `VITE_CONN_DETAILS_ENDPOINT` - Full URL to your backend API endpoint (e.g., `https://your-backend.onrender.com/api/connection-details`)
   - `VITE_MAPBOX_ACCESS_TOKEN` - If using Mapbox features
5. Deploy the static site

**Note:** If you don't set `VITE_CONN_DETAILS_ENDPOINT`, the frontend will default to `/api/connection-details`, which works for local development but needs to be updated for separate deployments.

### Other Deployment Options

- **Frontend**: Can be deployed to any static hosting service (Vercel, Netlify, AWS S3 + CloudFront, etc.)
- **Backend**: Can be deployed to any Node.js hosting service (Heroku, Railway, AWS ECS, Google Cloud Run, etc.)

## Contributing

This template is open source and we welcome contributions! Please open a PR or issue through GitHub, and don't forget to join us in the [LiveKit Community Slack](https://livekit.io/join-slack)!
