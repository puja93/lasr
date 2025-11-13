import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { AccessToken } from 'livekit-server-sdk';
import { RoomConfiguration } from '@livekit/protocol';
// Get the directory of this file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
// Load environment variables from .env.local (or .env if .env.local doesn't exist)
// Use absolute paths to ensure they load regardless of where the process is started
dotenv.config({ path: join(rootDir, '.env.local') });
dotenv.config({ path: join(rootDir, '.env') });
const app = express();
const PORT = process.env.PORT || 3001;
// Middleware
app.use(cors());
app.use(express.json());
// Environment variables
const API_KEY = process.env.LIVEKIT_API_KEY;
const API_SECRET = process.env.LIVEKIT_API_SECRET;
const LIVEKIT_URL = process.env.LIVEKIT_URL;
function createParticipantToken(userInfo, roomName, agentName) {
    const at = new AccessToken(API_KEY, API_SECRET, {
        ...userInfo,
        ttl: '15m',
    });
    const grant = {
        room: roomName,
        roomJoin: true,
        canPublish: true,
        canPublishData: true,
        canSubscribe: true,
    };
    at.addGrant(grant);
    if (agentName) {
        at.roomConfig = new RoomConfiguration({
            agents: [{ agentName }],
        });
    }
    return at.toJwt();
}
// API Routes
app.post('/api/connection-details', async (req, res) => {
    try {
        if (LIVEKIT_URL === undefined) {
            throw new Error('LIVEKIT_URL is not defined');
        }
        if (API_KEY === undefined) {
            throw new Error('LIVEKIT_API_KEY is not defined');
        }
        if (API_SECRET === undefined) {
            throw new Error('LIVEKIT_API_SECRET is not defined');
        }
        // Parse agent configuration from request body
        const body = req.body;
        const agentName = body?.room_config?.agents?.[0]?.agent_name;
        // Generate participant token
        const participantName = 'user';
        const participantIdentity = `voice_assistant_user_${Math.floor(Math.random() * 10000)}`;
        const roomName = `voice_assistant_room_${Math.floor(Math.random() * 10000)}`;
        const participantToken = await createParticipantToken({ identity: participantIdentity, name: participantName }, roomName, agentName);
        // Return connection details
        const data = {
            serverUrl: LIVEKIT_URL,
            roomName,
            participantToken: participantToken,
            participantName,
        };
        res.setHeader('Cache-Control', 'no-store');
        res.json(data);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error);
            res.status(500).send(error.message);
        }
    }
});
// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
