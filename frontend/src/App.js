
import React, { useState } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [items, setItems] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.ok) {
        setLoggedIn(true);
        setError('');
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      setError('Login request failed');
    }
  };

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/items');
      const data = await response.json();

      if (response.ok) {
        setItems(data.items);
      } else {
        setError('Failed to fetch items');
      }
    } catch (err) {
      setError('Error fetching items');
    }
  };

  return (
    <div style={{ fontFamily: 'Inter', padding: 30, textAlign: 'center' }}>
      <h1 style={{ color: '#4F46E5' }}>ItemConnect</h1>
      {!loggedIn ? (
        <div>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: '10px', margin: '5px', borderRadius: '5px' }}
          />
          <br />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '10px', margin: '5px', borderRadius: '5px' }}
          />
          <br />
          <button
            onClick={handleLogin}
            style={{ padding: '10px 20px', backgroundColor: '#4F46E5', color: '#fff', border: 'none', borderRadius: '8px' }}
          >
            Login
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={fetchItems}
            style={{ padding: '10px 20px', backgroundColor: '#4F46E5', color: '#fff', border: 'none', borderRadius: '8px', marginTop: '20px' }}
          >
            Load Items
          </button>
          <ul style={{ marginTop: '20px', listStyle: 'none', padding: 0 }}>
            {items.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
