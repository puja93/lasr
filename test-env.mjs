#!/usr/bin/env node

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 Testing Environment Variable Loading\n');

// Check which files exist
const envLocalPath = join(__dirname, '.env.local');
const envPath = join(__dirname, '.env');

console.log('📁 File Check:');
console.log(`  .env.local: ${existsSync(envLocalPath) ? '✅ EXISTS' : '❌ NOT FOUND'}`);
console.log(`  .env:       ${existsSync(envPath) ? '✅ EXISTS' : '❌ NOT FOUND'}`);
console.log();

// Load environment variables the same way the server does
console.log('🔄 Loading environment variables...\n');

const resultLocal = dotenv.config({ path: '.env.local' });
if (resultLocal.error) {
  console.log('  ⚠️  .env.local not loaded:', resultLocal.error.message);
} else {
  console.log('  ✅ .env.local loaded successfully');
}

const resultEnv = dotenv.config();
if (resultEnv.error) {
  console.log('  ⚠️  .env not loaded:', resultEnv.error.message);
} else {
  console.log('  ✅ .env loaded successfully');
}

console.log();

// Check required environment variables
console.log('📋 Environment Variables:');
const requiredVars = [
  'LIVEKIT_API_KEY',
  'LIVEKIT_API_SECRET',
  'LIVEKIT_URL',
  'PORT'
];

let allSet = true;
requiredVars.forEach(key => {
  const value = process.env[key];
  if (value) {
    // Mask secrets
    const displayValue = key.includes('SECRET')
      ? '***' + value.slice(-4)
      : value;
    console.log(`  ✅ ${key}: ${displayValue}`);
  } else {
    console.log(`  ❌ ${key}: NOT SET`);
    allSet = false;
  }
});

console.log();

if (allSet) {
  console.log('✨ All environment variables are set! Server should work.');
} else {
  console.log('⚠️  Some environment variables are missing.');
  console.log('   Make sure your .env.local file contains real values, not placeholders.');
  console.log('   Example:');
  console.log('   LIVEKIT_API_KEY=devkey_abc123...');
  console.log('   LIVEKIT_API_SECRET=secretABC123...');
  console.log('   LIVEKIT_URL=wss://your-project.livekit.cloud');
}
