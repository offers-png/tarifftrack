import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api, COUNTRY_FLAGS, CATEGORIES, COUNTRIES, formatCurrency, formatPct } from '../api';

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, color = 'var(--text)', icon }) {
  return (
    <div style={{
      background: 'var(--bg2)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      padding: '24px',
      flex: 1,
      minWidth: '180px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <span style={{ fontSize: '13px', color: 'var(--text3)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
        {icon && <span style={{ fontSize: '20px' }}>{icon}</span>}
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '28px', fontWeight: 500, color, marginBottom: '6px' }}>{value}</div>
      {sub && <div style={{ fontSize: '12px', color: 'var(--text3)' }}>{sub}</div>}
    </div>
  );
}

// ─── Add Product Modal ────────────────────────────────────────────────────────
function AddProductModal({ user, onClose, onAdded }) {
  const [form, setForm] = useState({
    product_name: '',
    supplier_country: 'China',
    current_cost: '',
    selling_price: '',
    units_per_month: '',
    category: 'general',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await api.addProduct({
        user_id: user.id,
        product_name: form.product_name,
        supplier_country: form.supplier_country,
        current_cost: parseFloat(form.current_cost),
        selling_price: parseFloat(form.selling_price),
        units_per_month: parseInt(form.units_per_month) || 0,
        category: form.category,
        notes: form.notes
      });
      onAdded(result);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    background: 'var(--bg3)',
    border: '1px solid var(--border2)',
    borderRadius: '8px',
    padding: '10px 12px',
    color: 'var(--text)',
    fontSize: '14px'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '12px',
    color: 'var(--text2)',
    marginBottom: '6px',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.04em'
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: '20px'
    }}>
      <div style={{
        background: 'var(--bg2)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '36px',
        width: '100%',
        maxWidth: '520px',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800 }}>Add Product</h2>
          <button onClick={onClose} style={{ background: 'none', color: 'var(--text3)', fontSize: '24px', lineHeight: 1 }}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Product Name</label>
            <input style={inputStyle} required value={form.product_name}
              onChange={e => setForm(f => ({ ...f, product_name: e.target.value }))}
              placeholder="e.g. Wireless Earbuds, Cotton T-Shirts" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={labelStyle}>Supplier Country</label>
              <select style={inputStyle} value={form.supplier_country}
                onChange={e => setForm(f => ({ ...f, supplier_country: e.target.value }))}>
                {COUNTRIES.map(c => (
                  <option key={c} value={c}>{COUNTRY_FLAGS[c] || '🌐'} {c}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select style={inputStyle} value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                {CATEGORIES.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={labelStyle}>Your Cost (per unit)</label>
              <input style={inputStyle} type="number" step="0.01" min="0" required
                value={form.current_cost}
                onChange={e => setForm(f => ({ ...f, current_cost: e.target.value }))}
                placeholder="$0.00" />
            </div>
            <div>
              <label style={labelStyle}>Selling Price (per unit)</label>
              <input style={inputStyle} type="number" step="0.01" min="0" required
                value={form.selling_price}
                onChange={e => setForm(f => ({ ...f, selling_price: e.target.value }))}
                placeholder="$0.00" />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Units Per Month</label>
            <input style={inputStyle} type="number" min="0"
              value={form.units_per_month}
              onChange={e => setForm(f => ({ ...f, units_per_month: e.target.value }))}
              placeholder="How many do you sell per month?" />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={labelStyle}>Notes (optional)</label>
            <input style={inputStyle} value={form.notes}
              onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              placeholder="Supplier name, SKU, etc." />
          </div>

          {error && (
            <div style={{
              background: 'var(--red-glow)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '8px',
              padding: '12px',
              color: 'var(--red)',
              fontSize: '14px',
              marginBottom: '16px'
            }}>
              {error}
              {error.includes('limit') && (
                <div style={{ marginTop: '8px' }}>
                  <button onClick={() => window.location.href = '/dashboard?upgrade=true'}
                    style={{ background: 'var(--red)', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                    Upgrade to Pro →
                  </button>
                </div>
              )}
            </div>
          )}

          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '14px',
            background: loading ? 'var(--bg3)' : 'var(--red)',
            color: '#fff', borderRadius: '8px',
            fontSize: '15px', fontWeight: 700,
            fontFamily: 'var(--font-display)',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}>
            {loading ? 'Adding product...' : 'Add Product & Calculate Impact →'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Upgrade Modal ────────────────────────────────────────────────────────────
function UpgradeModal({ user, onClose }) {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const { checkout_url } = await api.createCheckout(user.id, user.email);
      window.location.href = checkout_url;
    } catch (err) {
      alert('Checkout failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: '20px'
    }}>
      <div style={{
        background: 'var(--bg2)',
        border: '1px solid rgba(239,68,68,0.3)',
        borderRadius: '16px',
        padding: '40px',
        width: '100%',
        maxWidth: '440px',
        textAlign: 'center',
        boxShadow: '0 0 60px rgba(239,68,68,0.1)'
      }}>
        <div style={{ fontSize: '40px', marginBottom: '16px' }}>🚀</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>
          Upgrade to TariffTrack Pro
        </h2>
        <p style={{ color: 'var(--text2)', marginBottom: '28px', lineHeight: 1.6, fontSize: '15px' }}>
          Unlimited products, unlimited AI analysis, email alerts, and CSV export.
        </p>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '44px', fontWeight: 800, marginBottom: '4px', color: 'var(--red)' }}>$14.99</div>
        <div style={{ color: 'var(--text3)', fontSize: '14px', marginBottom: '32px' }}>per month, cancel anytime</div>

        <button onClick={handleUpgrade} disabled={loading} style={{
          width: '100%', padding: '16px',
          background: 'var(--red)', color: '#fff', borderRadius: '10px',
          fontSize: '16px', fontWeight: 700, fontFamily: 'var(--font-display)',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '12px'
        }}>
          {loading ? 'Loading...' : 'Upgrade Now →'}
        </button>
        <button onClick={onClose} style={{
          background: 'none', color: 'var(--text3)',
          fontSize: '14px', padding: '8px'
        }}>
          Maybe later
        </button>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function Dashboard() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('tariff_user') || 'null'));
  const [dashboard, setDashboard] = useState(null);
  const [products, setProducts] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [appliedPrices, setAppliedPrices] = useState({});
  const [activeTab, setActiveTab] = useState('products');

  const loadData = useCallback(async () => {
    if (!user) return;
    try {
      const [dash, prods, alertData] = await Promise.all([
        api.getDashboard(user.id),
        api.getProducts(user.id),
        api.getAlerts(user.id)
      ]);
      setDashboard(dash);
      setProducts(prods.products || []);
      setAlerts(alertData.alerts || []);

      // Refresh user from server to get latest plan
      const freshUser = await api.getUser(user.email);
      setUser(freshUser);
      localStorage.setItem('tariff_user', JSON.stringify(freshUser));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (searchParams.get('upgraded') === 'true') {
      setTimeout(() => loadData(), 1500);
    }
    if (searchParams.get('upgrade') === 'true') {
      setShowUpgrade(true);
    }
  }, [searchParams, loadData]);

  const handleAddProduct = async (product) => {
    await loadData();
  };

  const handleGetAnalysis = async () => {
    if (user.plan === 'free') {
      // Check if they have analysis cached
    }
    setAnalysisLoading(true);
    try {
      const result = await api.getAIAnalysis(user.id);
      setAnalysis(result);
      setActiveTab('analysis');
    } catch (err) {
      if (err.message.includes('week') || err.message.includes('Pro')) {
        setShowUpgrade(true);
      } else {
        alert(err.message);
      }
    } finally {
      setAnalysisLoading(false);
    }
  };

  const handleApplyPrice = async (productId) => {
    await api.applyPrice(productId);
    setAppliedPrices(p => ({ ...p, [productId]: true }));
  };

  const handleMarkAlertsRead = async () => {
    const unread = alerts.filter(a => !a.read).map(a => a.id);
    if (unread.length > 0) {
      await api.markAlertsRead(unread);
      setAlerts(prev => prev.map(a => ({ ...a, read: true })));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('tariff_user');
    navigate('/');
  };

  const getMarginColor = (margin) => {
    if (margin > 25) return 'var(--green)';
    if (margin > 10) return 'var(--yellow)';
    return 'var(--red)';
  };

  const getRowBg = (margin) => {
    if (margin > 25) return 'rgba(34,197,94,0.04)';
    if (margin > 10) return 'rgba(234,179,8,0.04)';
    return 'rgba(239,68,68,0.06)';
  };

  const unreadCount = alerts.filter(a => !a.read).length;

  if (!user) {
    navigate('/login');
    return null;
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, marginBottom: '8px' }}>
            Tariff<span style={{ color: 'var(--red)' }}>Track</span>
          </div>
          <div style={{ color: 'var(--text3)', fontSize: '14px', fontFamily: 'var(--font-mono)' }}>Loading your dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Alert Banner */}
      {unreadCount > 0 && (
        <div style={{
          background: 'rgba(239,68,68,0.12)',
          borderBottom: '1px solid rgba(239,68,68,0.25)',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--red)', fontSize: '14px', fontWeight: 600 }}>
            <span>⚠️</span>
            <span>{unreadCount} product{unreadCount > 1 ? 's' : ''} need immediate repricing attention</span>
          </div>
          <button onClick={() => { setActiveTab('alerts'); handleMarkAlertsRead(); }}
            style={{ background: 'none', color: 'var(--red)', fontSize: '13px', fontWeight: 600, textDecoration: 'underline' }}>
            View alerts
          </button>
        </div>
      )}

      {/* Upgraded banner */}
      {searchParams.get('upgraded') === 'true' && (
        <div style={{
          background: 'var(--green-glow)',
          borderBottom: '1px solid rgba(34,197,94,0.3)',
          padding: '12px 24px',
          textAlign: 'center',
          color: 'var(--green)',
          fontSize: '14px',
          fontWeight: 600
        }}>
          🎉 Welcome to TariffTrack Pro! You now have unlimited products and AI analysis.
        </div>
      )}

      {/* Header */}
      <header style={{
        padding: '16px 24px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--bg2)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800 }}>
            Tariff<span style={{ color: 'var(--red)' }}>Track</span>
          </div>
          {user.plan === 'pro' && (
            <span style={{
              background: 'rgba(239,68,68,0.15)',
              border: '1px solid rgba(239,68,68,0.3)',
              color: 'var(--red)',
              padding: '3px 10px',
              borderRadius: '100px',
              fontSize: '11px',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.05em'
            }}>PRO</span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '13px', fontWeight: 600 }}>{user.business_name || user.email}</div>
            <div style={{ fontSize: '12px', color: 'var(--text3)' }}>
              {user.plan === 'free' ? `${products.length}/5 products` : 'Pro · Unlimited'}
            </div>
          </div>
          {user.plan === 'free' && (
            <button onClick={() => setShowUpgrade(true)} style={{
              padding: '8px 16px',
              background: 'var(--red)',
              color: '#fff',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 700
            }}>
              Upgrade
            </button>
          )}
          <button onClick={handleLogout} style={{
            padding: '8px 14px',
            background: 'none',
            border: '1px solid var(--border)',
            color: 'var(--text3)',
            borderRadius: '8px',
            fontSize: '13px'
          }}>
            Logout
          </button>
        </div>
      </header>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '28px 24px' }}>

        {/* Stat Cards */}
        {dashboard && (
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '28px' }}>
            <StatCard
              label="Monthly Tariff Burden"
              value={formatCurrency(dashboard.total_monthly_burden)}
              sub="Total cost absorbed from tariffs"
              color="var(--red)"
              icon="🔥"
            />
            <StatCard
              label="Avg Margin Now"
              value={formatPct(dashboard.avg_current_margin)}
              sub={`Was ${formatPct(dashboard.avg_original_margin)} before tariffs`}
              color={getMarginColor(dashboard.avg_current_margin)}
              icon="📊"
            />
            <StatCard
              label="Products at Risk"
              value={dashboard.at_risk_count}
              sub="Margin below 15% threshold"
              color={dashboard.at_risk_count > 0 ? 'var(--red)' : 'var(--green)'}
              icon="⚠️"
            />
            <StatCard
              label="Potential Recovery"
              value={formatCurrency(dashboard.potential_recovery)}
              sub="If you apply all recommended prices"
              color="var(--green)"
              icon="💰"
            />
          </div>
        )}

        {/* Health Score */}
        {dashboard && (
          <div style={{
            background: 'var(--bg2)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '20px 24px',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            flexWrap: 'wrap'
          }}>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text3)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Business Health Score</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '42px',
                  fontWeight: 500,
                  color: dashboard.health_score > 60 ? 'var(--green)' : dashboard.health_score > 30 ? 'var(--yellow)' : 'var(--red)'
                }}>
                  {dashboard.health_score}/100
                </div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{
                    height: '8px',
                    background: 'var(--bg3)',
                    borderRadius: '100px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${dashboard.health_score}%`,
                      background: dashboard.health_score > 60 ? 'var(--green)' : dashboard.health_score > 30 ? 'var(--yellow)' : 'var(--red)',
                      borderRadius: '100px',
                      transition: 'width 0.6s ease'
                    }} />
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text3)', marginTop: '6px' }}>
                    Based on average margin compression across all products
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '0' }}>
          {[
            { id: 'products', label: `Products (${products.length})` },
            { id: 'analysis', label: '🤖 AI Analysis' },
            { id: 'alerts', label: `Alerts ${unreadCount > 0 ? `(${unreadCount})` : ''}` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '10px 20px',
                background: 'none',
                color: activeTab === tab.id ? 'var(--text)' : 'var(--text3)',
                fontWeight: activeTab === tab.id ? 700 : 400,
                fontSize: '14px',
                fontFamily: 'var(--font-display)',
                borderBottom: activeTab === tab.id ? '2px solid var(--red)' : '2px solid transparent',
                transition: 'color 0.2s',
                marginBottom: '-1px'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ fontSize: '14px', color: 'var(--text3)' }}>
                {products.length === 0 ? 'No products yet — add your first one to see your tariff impact' : `${products.length} product${products.length > 1 ? 's' : ''} tracked`}
              </div>
              <button
                onClick={() => {
                  if (user.plan === 'free' && products.length >= 5) {
                    setShowUpgrade(true);
                  } else {
                    setShowAddProduct(true);
                  }
                }}
                style={{
                  padding: '10px 20px',
                  background: 'var(--red)',
                  color: '#fff',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 700,
                  fontFamily: 'var(--font-display)'
                }}
              >
                + Add Product
              </button>
            </div>

            {products.length === 0 ? (
              <div style={{
                background: 'var(--bg2)',
                border: '2px dashed var(--border2)',
                borderRadius: '16px',
                padding: '60px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📦</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>
                  Add your first product
                </h3>
                <p style={{ color: 'var(--text2)', marginBottom: '24px', fontSize: '15px' }}>
                  Enter a product you sell, where it comes from, and your cost. We'll calculate your exact tariff exposure instantly.
                </p>
                <button onClick={() => setShowAddProduct(true)} style={{
                  padding: '14px 32px',
                  background: 'var(--red)',
                  color: '#fff',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: 700,
                  fontFamily: 'var(--font-display)'
                }}>
                  Add First Product →
                </button>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      {['Product', 'Country', 'Tariff %', 'Your Cost', 'Cost w/ Tariff', 'Cur. Margin', 'Rec. Price', 'Monthly Hit', 'Action'].map(h => (
                        <th key={h} style={{
                          padding: '10px 12px',
                          textAlign: 'left',
                          color: 'var(--text3)',
                          fontWeight: 600,
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                          whiteSpace: 'nowrap'
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => {
                      const margin = p.current_margin_pct ?? 0;
                      const applied = appliedPrices[p.id] || p.price_updated;
                      return (
                        <tr key={p.id} style={{
                          background: getRowBg(margin),
                          borderBottom: '1px solid var(--border)',
                          transition: 'background 0.2s'
                        }}>
                          <td style={{ padding: '14px 12px', fontWeight: 600, maxWidth: '160px' }}>
                            <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.product_name}</div>
                            {p.category && (
                              <div style={{ fontSize: '11px', color: 'var(--text3)', marginTop: '2px' }}>{p.category}</div>
                            )}
                          </td>
                          <td style={{ padding: '14px 12px', whiteSpace: 'nowrap' }}>
                            <span style={{ fontSize: '16px', marginRight: '6px' }}>{COUNTRY_FLAGS[p.supplier_country] || '🌐'}</span>
                            <span style={{ color: 'var(--text2)' }}>{p.supplier_country}</span>
                          </td>
                          <td style={{ padding: '14px 12px', fontFamily: 'var(--font-mono)', color: 'var(--red)', fontWeight: 600 }}>
                            {p.tariff_rate ?? 0}%
                          </td>
                          <td style={{ padding: '14px 12px', fontFamily: 'var(--font-mono)' }}>
                            {formatCurrency(p.current_cost)}
                          </td>
                          <td style={{ padding: '14px 12px', fontFamily: 'var(--font-mono)', color: 'var(--yellow)' }}>
                            {formatCurrency(p.cost_with_tariff)}
                          </td>
                          <td style={{ padding: '14px 12px' }}>
                            <span style={{
                              fontFamily: 'var(--font-mono)',
                              fontWeight: 700,
                              color: getMarginColor(margin)
                            }}>
                              {formatPct(margin)}
                            </span>
                            <div style={{ fontSize: '11px', color: 'var(--text3)', marginTop: '2px' }}>
                              was {formatPct(p.original_margin_pct)}
                            </div>
                          </td>
                          <td style={{ padding: '14px 12px' }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--green)' }}>
                              {formatCurrency(p.recommended_price)}
                            </span>
                            {p.price_increase_needed > 0 && (
                              <div style={{ fontSize: '11px', color: 'var(--red)', marginTop: '2px' }}>
                                +{formatCurrency(p.price_increase_needed)}
                              </div>
                            )}
                          </td>
                          <td style={{ padding: '14px 12px' }}>
                            <span style={{
                              fontFamily: 'var(--font-mono)',
                              color: p.monthly_tariff_burden > 0 ? 'var(--red)' : 'var(--text2)',
                              fontWeight: p.monthly_tariff_burden > 0 ? 600 : 400
                            }}>
                              {formatCurrency(p.monthly_tariff_burden)}
                            </span>
                          </td>
                          <td style={{ padding: '14px 12px' }}>
                            {applied ? (
                              <span style={{ color: 'var(--green)', fontSize: '12px', fontWeight: 600 }}>✓ Applied</span>
                            ) : (
                              <button onClick={() => handleApplyPrice(p.id)} style={{
                                padding: '6px 12px',
                                background: 'var(--green-glow)',
                                border: '1px solid rgba(34,197,94,0.3)',
                                color: 'var(--green)',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: 600,
                                whiteSpace: 'nowrap'
                              }}>
                                Mark Applied
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Summary Row */}
                {dashboard && (
                  <div style={{
                    display: 'flex',
                    gap: '20px',
                    padding: '16px 12px',
                    background: 'rgba(239,68,68,0.05)',
                    border: '1px solid rgba(239,68,68,0.15)',
                    borderRadius: '8px',
                    marginTop: '12px',
                    flexWrap: 'wrap'
                  }}>
                    <div>
                      <span style={{ color: 'var(--text3)', fontSize: '12px' }}>Total monthly burden: </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--red)' }}>
                        {formatCurrency(dashboard.total_monthly_burden)}
                      </span>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text3)', fontSize: '12px' }}>Recoverable if repriced: </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--green)' }}>
                        {formatCurrency(dashboard.potential_recovery)}
                      </span>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text3)', fontSize: '12px' }}>Margin compression: </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--yellow)' }}>
                        {formatPct(dashboard.avg_original_margin)} → {formatPct(dashboard.avg_current_margin)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* AI Analysis Tab */}
        {activeTab === 'analysis' && (
          <div className="fade-in">
            <div style={{
              background: 'var(--bg2)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '32px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, marginBottom: '6px' }}>
                    AI Tariff Action Plan
                  </h2>
                  <p style={{ color: 'var(--text3)', fontSize: '14px' }}>
                    {user.plan === 'free' ? '1 analysis per week on Free plan' : 'Unlimited on Pro plan'}
                  </p>
                </div>
                <button
                  onClick={handleGetAnalysis}
                  disabled={analysisLoading || products.length === 0}
                  style={{
                    padding: '12px 24px',
                    background: analysisLoading ? 'var(--bg3)' : 'var(--red)',
                    color: '#fff',
                    borderRadius: '10px',
                    fontSize: '15px',
                    fontWeight: 700,
                    fontFamily: 'var(--font-display)',
                    cursor: analysisLoading || products.length === 0 ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  {analysisLoading ? '🤖 Analyzing...' : '🤖 Get Action Plan'}
                </button>
              </div>

              {analysis ? (
                <div>
                  <div style={{
                    display: 'flex',
                    gap: '20px',
                    padding: '16px',
                    background: 'var(--bg3)',
                    borderRadius: '10px',
                    marginBottom: '24px',
                    flexWrap: 'wrap'
                  }}>
                    <div style={{ fontSize: '13px', color: 'var(--text3)' }}>
                      Generated: <span style={{ color: 'var(--text2)', fontFamily: 'var(--font-mono)' }}>
                        {new Date(analysis.generated_at).toLocaleString()}
                      </span>
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text3)' }}>
                      Burden analyzed: <span style={{ color: 'var(--red)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                        {formatCurrency(analysis.total_burden)}/mo
                      </span>
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text3)' }}>
                      Margin: <span style={{ color: 'var(--yellow)', fontFamily: 'var(--font-mono)' }}>
                        {formatPct(analysis.avg_margin_before)} → {formatPct(analysis.avg_margin_after)}
                      </span>
                    </div>
                  </div>

                  <div style={{
                    background: 'var(--bg3)',
                    borderRadius: '12px',
                    padding: '28px',
                    lineHeight: 1.8,
                    color: 'var(--text)',
                    fontSize: '15px',
                    whiteSpace: 'pre-wrap',
                    fontFamily: 'var(--font-body)'
                  }}>
                    {analysis.analysis}
                  </div>
                </div>
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '60px 20px',
                  color: 'var(--text3)'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤖</div>
                  <p style={{ fontSize: '16px', marginBottom: '8px' }}>
                    {products.length === 0
                      ? 'Add products first, then get your AI action plan'
                      : 'Click "Get Action Plan" to receive personalized tariff recommendations'}
                  </p>
                  <p style={{ fontSize: '13px' }}>
                    Claude AI will analyze your specific products and tell you exactly what to do
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Alerts Tab */}
        {activeTab === 'alerts' && (
          <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ fontSize: '14px', color: 'var(--text3)' }}>
                {alerts.length === 0 ? 'No alerts yet' : `${alerts.length} alert${alerts.length > 1 ? 's' : ''}`}
              </div>
              {unreadCount > 0 && (
                <button onClick={handleMarkAlertsRead} style={{
                  padding: '8px 16px',
                  background: 'none',
                  border: '1px solid var(--border)',
                  color: 'var(--text2)',
                  borderRadius: '8px',
                  fontSize: '13px'
                }}>
                  Mark all read
                </button>
              )}
            </div>

            {alerts.length === 0 ? (
              <div style={{
                background: 'var(--bg2)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '48px',
                textAlign: 'center',
                color: 'var(--text3)'
              }}>
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>🔔</div>
                <p>No alerts yet. Alerts will appear when margins drop below 15% or when tariff rates change.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {alerts.map(alert => (
                  <div key={alert.id} style={{
                    background: alert.read ? 'var(--bg2)' : 'rgba(239,68,68,0.05)',
                    border: `1px solid ${alert.read ? 'var(--border)' : 'rgba(239,68,68,0.2)'}`,
                    borderRadius: '10px',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '14px'
                  }}>
                    <span style={{ fontSize: '20px', flexShrink: 0 }}>
                      {alert.alert_type === 'tariff_increase' ? '🔴' :
                       alert.alert_type === 'tariff_decrease' ? '🟢' :
                       alert.alert_type === 'margin_warning' ? '🟡' : '🔔'}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', color: 'var(--text)', marginBottom: '4px' }}>
                        {alert.message}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>
                        {new Date(alert.created_at).toLocaleString()}
                        {!alert.read && (
                          <span style={{
                            marginLeft: '10px',
                            background: 'var(--red)',
                            color: '#fff',
                            padding: '1px 8px',
                            borderRadius: '100px',
                            fontSize: '10px',
                            fontWeight: 700,
                            verticalAlign: 'middle'
                          }}>NEW</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {showAddProduct && (
        <AddProductModal
          user={user}
          onClose={() => setShowAddProduct(false)}
          onAdded={handleAddProduct}
        />
      )}
      {showUpgrade && (
        <UpgradeModal
          user={user}
          onClose={() => setShowUpgrade(false)}
        />
      )}
    </div>
  );
}
