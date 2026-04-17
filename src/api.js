const BASE = 'https://main-backend-k32m.onrender.com';

export const api = {
  async createUser(data) {
    const r = await fetch(`${BASE}/tariff/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!r.ok) { const e = await r.json(); throw new Error(e.detail || 'Failed to create account'); }
    return r.json();
  },

  async loginUser(email, password) {
    const r = await fetch(`${BASE}/tariff/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!r.ok) { const e = await r.json(); throw new Error(e.detail || 'Invalid email or password'); }
    return r.json();
  },

  async getUser(email) {
    const r = await fetch(`${BASE}/tariff/user/${encodeURIComponent(email)}`);
    if (!r.ok) throw new Error('User not found');
    return r.json();
  },

  async addProduct(data) {
    const r = await fetch(`${BASE}/tariff/product`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!r.ok) { const e = await r.json(); throw new Error(e.detail || 'Failed to add product'); }
    return r.json();
  },

  async getProducts(userId) {
    const r = await fetch(`${BASE}/tariff/products/${userId}`);
    if (!r.ok) throw new Error('Failed to load products');
    return r.json();
  },

  async getDashboard(userId) {
    const r = await fetch(`${BASE}/tariff/dashboard/${userId}`);
    if (!r.ok) throw new Error('Failed to load dashboard');
    return r.json();
  },

  async getAIAnalysis(userId) {
    const r = await fetch(`${BASE}/tariff/ai-analysis`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId })
    });
    if (!r.ok) { const e = await r.json(); throw new Error(e.detail || 'Analysis failed'); }
    return r.json();
  },

  async createCheckout(userId, email) {
    const r = await fetch(`${BASE}/tariff/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, email })
    });
    if (!r.ok) throw new Error('Checkout failed');
    return r.json();
  },

  async cancelSubscription(userId) {
    const r = await fetch(`${BASE}/tariff/cancel`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId })
    });
    if (!r.ok) { const e = await r.json(); throw new Error(e.detail || 'Cancellation failed'); }
    return r.json();
  },

  async getAlerts(userId) {
    const r = await fetch(`${BASE}/tariff/alerts/${userId}`);
    if (!r.ok) throw new Error('Failed to load alerts');
    return r.json();
  },

  async markAlertsRead(alertIds) {
    await fetch(`${BASE}/tariff/alerts/read`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ alert_ids: alertIds })
    });
  },

  async applyPrice(productId) {
    await fetch(`${BASE}/tariff/product/apply-price`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: productId })
    });
  }
};

export const COUNTRY_FLAGS = {
  'China': '🇨🇳', 'Mexico': '🇲🇽', 'Canada': '🇨🇦', 'EU': '🇪🇺',
  'Vietnam': '🇻🇳', 'Japan': '🇯🇵', 'South Korea': '🇰🇷', 'India': '🇮🇳',
  'Brazil': '🇧🇷', 'Taiwan': '🇹🇼', 'Domestic (USA)': '🇺🇸', 'Other': '🌐'
};

export const CATEGORIES = [
  { value: 'general', label: 'General / Other' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing & Apparel' },
  { value: 'food', label: 'Food & Beverage' },
  { value: 'auto_parts', label: 'Auto Parts' },
];

export const COUNTRIES = [
  'China', 'Mexico', 'Canada', 'EU', 'Vietnam',
  'Japan', 'South Korea', 'India', 'Brazil', 'Taiwan',
  'Domestic (USA)', 'Other'
];

export const formatCurrency = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n || 0);

export const formatPct = (n) => `${(n || 0).toFixed(1)}%`;
