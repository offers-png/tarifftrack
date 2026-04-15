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
  const [form, setForm] = useState({ email: '', business_name: '', business_type: 'retail' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await api.createUser({
        email: form.email.trim().toLowerCase(),
        business_name: form.business_name,
        business_type: form.business_type
      });
      localStorage.setItem('tariff_user', JSON.stringify(user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to create account. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      background: 'var(--bg)'
    }}>
      <Link to="/" style={{
        fontFamily: 'var(--font-display)',
        fontSize: '24px',
        fontWeight: 800,
        marginBottom: '48px'
      }}>
        Tariff<span style={{ color: 'var(--red)' }}>Track</span>
      </Link>

      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: 'var(--bg2)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '40px'
      }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '26px',
          fontWeight: 800,
          marginBottom: '8px'
        }}>Create your account</h1>
        <p style={{ color: 'var(--text2)', fontSize: '14px', marginBottom: '32px' }}>
          Free forever. No credit card required.
        </p>

        <form onSubmit={handleSignup}>
          {[
            { label: 'Email address', key: 'email', type: 'email', placeholder: 'you@business.com' },
            { label: 'Business name', key: 'business_name', type: 'text', placeholder: 'Uncle Sam Market' }
          ].map(field => (
            <div key={field.key} style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: 'var(--text2)', marginBottom: '8px', fontWeight: 500 }}>
                {field.label}
              </label>
              <input
                type={field.type}
                value={form[field.key]}
                onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                required
                placeholder={field.placeholder}
                style={{
                  width: '100%',
                  background: 'var(--bg3)',
                  border: '1px solid var(--border2)',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  color: 'var(--text)',
                  fontSize: '15px'
                }}
              />
            </div>
          ))}

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text2)', marginBottom: '8px', fontWeight: 500 }}>
              Business type
            </label>
            <select
              value={form.business_type}
              onChange={e => setForm(f => ({ ...f, business_type: e.target.value }))}
              style={{
                width: '100%',
                background: 'var(--bg3)',
                border: '1px solid var(--border2)',
                borderRadius: '8px',
                padding: '12px 14px',
                color: 'var(--text)',
                fontSize: '15px'
              }}
            >
              {BUSINESS_TYPES.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          {error && (
            <div style={{
              background: 'var(--red-glow)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '8px',
              padding: '12px',
              fontSize: '14px',
              color: 'var(--red)',
              marginBottom: '16px'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: loading ? 'var(--bg3)' : 'var(--red)',
              color: '#fff',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: 700,
              fontFamily: 'var(--font-display)',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Creating account...' : 'Create free account →'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--text3)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--red)', fontWeight: 600 }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
