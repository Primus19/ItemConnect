
import React, { useState } from 'react';
import api from '../services/api';

export default function TestLoginPage() {
  const [log, setLog] = useState('');

  const handleLogin = async () => {
    try {
      const credentials = {
        email: 'testuser@example.com',
        password: 'password123',
      };
      setLog('🔄 Sending login request...');
      const res = await api.post('/auth/login', credentials);
      setLog('✅ Login success!\n' + JSON.stringify(res.data, null, 2));
    } catch (err) {
      setLog('❌ Login failed:\n' + JSON.stringify(err.response?.data || err.message));
    }
  };

  return (
    <div style={{ padding: 32 }}>
      <h1>🧪 Test Login Page</h1>
      <button onClick={handleLogin} style={{ padding: '10px 20px', fontSize: 16 }}>Test Login</button>
      <pre style={{ background: '#f0f0f0', padding: 16, marginTop: 20 }}>{log}</pre>
    </div>
  );
}
