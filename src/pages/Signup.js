import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';

const BUSINESS_TYPES = [
  { value: 'retail', label: 'Retail Store' },
  { value: 'restaurant', label: 'Restaurant / Food Service' },
  { value: 'contractor', label: 'Contractor / Trades' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'other', label: 'Other' }
];

export default function Signup() {
  const [form, setForm] = useState({
    email: '', business_name: '', business_type: 'retail',
    password: '', confirm_password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (form.password !== form.confirm_password) { setError('Passwords do not match.'); return; }
    setLoading(true);
    try {
      const user = await api.createUser({
        email: form.email.trim().toLowerCase(),
        business_name: form.business_name,
        business_type: form.business_type,
        password: form.password
      });
      localStorage.setItem('tariff_user', JSON.stringify(user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to create account.');
    } finally {
      setLoading(false);
    }
  };

  const inp = {
    width: '100%', background: 'var(--bg3)', border: '1px solid var(--border2)',
    borderRadius: '8px', padding: '12px 14px', color: 'var(--text)', fontSize: '15px'
  };
  const lbl = { display: 'block', fontSize: '13px', color: 'var(--text2)', marginBottom: '8px', fontWeight: 500 };
  const strength = form.password.length >= 12 ? 'var(--green)' : form.password.length >= 8 ? 'var(--yellow)' : 'var(--red)';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: 'var(--bg)' }}>
      <Link to="/" style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, marginBottom: '48px' }}>
        Tariff<span style={{ color: 'var(--red)' }}>Track</span>
      </Link>
      <div style={{ width: '100%', maxWidth: '420px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '16px', padding: '40px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 800, marginBottom: '8px' }}>Create your account</h1>
        <p style={{ color: 'var(--text2)', fontSize: '14px', marginBottom: '28px' }}>Free forever. No credit card required.</p>
        <form onSubmit={handleSignup}>
          {[
            { label: 'Email address', key: 'email', type: 'email', placeholder: 'you@business.com' },
            { label: 'Business name', key: 'business_name', type: 'text', placeholder: 'Uncle Sam Market' }
          ].map(f => (
            <div key={f.key} style={{ marginBottom: '14px' }}>
              <label style={lbl}>{f.label}</label>
              <input type={f.type} value={form[f.key]} onChange={e => setForm(v => ({ ...v, [f.key]: e.target.value }))} required placeholder={f.placeholder} style={inp} />
            </div>
          ))}
          <div style={{ marginBottom: '14px' }}>
            <label style={lbl}>Business type</label>
            <select value={form.business_type} onChange={e => setForm(v => ({ ...v, business_type: e.target.value }))} style={inp}>
              {BUSINESS_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: '14px' }}>
            <label style={lbl}>Password</label>
            <div style={{ position: 'relative' }}>
              <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={e => setForm(v => ({ ...v, password: e.target.value }))} required placeholder="Min. 8 characters" style={{ ...inp, paddingRight: '48px' }} />
              <button type="button" onClick={() => setShowPassword(v => !v)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', color: 'var(--text3)', fontSize: '16px' }}>
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {form.password.length > 0 && (
              <div style={{ display: 'flex', gap: '3px', alignItems: 'center', marginTop: '6px' }}>
                {[1,2,3,4].map(i => <div key={i} style={{ flex: 1, height: '3px', borderRadius: '2px', background: form.password.length >= i * 3 ? strength : 'var(--border2)' }} />)}
                <span style={{ fontSize: '11px', color: 'var(--text3)', marginLeft: '6px' }}>
                  {form.password.length < 8 ? 'Weak' : form.password.length < 12 ? 'Good' : 'Strong'}
                </span>
              </div>
            )}
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={lbl}>Confirm password</label>
            <input type={showPassword ? 'text' : 'password'} value={form.confirm_password} onChange={e => setForm(v => ({ ...v, confirm_password: e.target.value }))} required placeholder="Re-enter your password"
              style={{ ...inp, borderColor: form.confirm_password && form.confirm_password !== form.password ? 'rgba(239,68,68,0.5)' : 'var(--border2)' }} />
            {form.confirm_password && form.confirm_password !== form.password && (
              <p style={{ fontSize: '12px', color: 'var(--red)', marginTop: '4px' }}>Passwords don't match</p>
            )}
          </div>
          {error && <div style={{ background: 'var(--red-glow)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '12px', fontSize: '14px', color: 'var(--red)', marginBottom: '16px' }}>{error}</div>}
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '14px', background: loading ? 'var(--bg3)' : 'var(--red)', color: '#fff', borderRadius: '8px', fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-display)', cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Creating account...' : 'Create free account →'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: 'var(--text3)' }}>
          Already have an account?{' '}<Link to="/login" style={{ color: 'var(--red)', fontWeight: 600 }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
