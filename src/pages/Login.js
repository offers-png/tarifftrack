import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await api.loginUser(email.trim().toLowerCase(), password);
      localStorage.setItem('tariff_user', JSON.stringify(user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const inp = {
    width: '100%', background: 'var(--bg3)', border: '1px solid var(--border2)',
    borderRadius: '8px', padding: '12px 14px', color: 'var(--text)', fontSize: '15px'
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: 'var(--bg)' }}>
      <Link to="/" style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, marginBottom: '48px' }}>
        Tariff<span style={{ color: 'var(--red)' }}>Track</span>
      </Link>
      <div style={{ width: '100%', maxWidth: '420px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '16px', padding: '40px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 800, marginBottom: '8px' }}>Welcome back</h1>
        <p style={{ color: 'var(--text2)', fontSize: '14px', marginBottom: '32px' }}>Sign in to your account</p>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text2)', marginBottom: '8px', fontWeight: 500 }}>Email address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@business.com" style={inp} />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text2)', marginBottom: '8px', fontWeight: 500 }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required placeholder="Your password" style={{ ...inp, paddingRight: '48px' }} />
              <button type="button" onClick={() => setShowPassword(v => !v)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', color: 'var(--text3)', fontSize: '16px' }}>
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
          {error && <div style={{ background: 'var(--red-glow)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '12px', fontSize: '14px', color: 'var(--red)', marginBottom: '16px' }}>{error}</div>}
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '14px', background: loading ? 'var(--bg3)' : 'var(--red)', color: '#fff', borderRadius: '8px', fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-display)', cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Signing in...' : 'Sign in →'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--text3)' }}>
          No account?{' '}<Link to="/signup" style={{ color: 'var(--red)', fontWeight: 600 }}>Sign up free</Link>
        </p>
      </div>
    </div>
  );
}
