#!/usr/bin/env node

console.log('🔍 Debugging LiveKit Setup\n');

// Check environment variables
console.log('📋 Environment Variables:');
const envVars = ['LIVEKIT_API_KEY', 'LIVEKIT_API_SECRET', 'LIVEKIT_URL', 'PORT'];
envVars.forEach(key => {
  const value = process.env[key];
  if (value) {
    console.log(`  ✅ ${key}: ${key.includes('SECRET') ? '***' : value}`);
  } else {
    console.log(`  ❌ ${key}: NOT SET`);
  }
});

// Test API endpoint
console.log('\n🌐 Testing Backend API:');
try {
  const response = await fetch('http://localhost:3001/api/connection-details', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ room_config: { agents: [] } })
  });

  if (response.ok) {
    const data = await response.json();
    console.log('  ✅ API Response:', {
      serverUrl: data.serverUrl,
      roomName: data.roomName,
      hasToken: !!data.participantToken
    });
  } else {
    console.log(`  ❌ API Error: ${response.status} ${response.statusText}`);
    console.log('  Response:', await response.text());
  }
} catch (error) {
  console.log('  ❌ Connection Failed:', error.message);
  console.log('  💡 Make sure the backend is running: npm run dev:server');
}
