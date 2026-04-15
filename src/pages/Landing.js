import React from 'react';
import { Link } from 'react-router-dom';
import { COUNTRY_FLAGS } from '../api';

const TICKER_ITEMS = [
  'China: 55% tariff on electronics',
  'Vietnam: 46% tariff on clothing',
  'Brazil: 50% tariff on all goods',
  'Mexico: 25% tariff (non-USMCA)',
  'Taiwan: 32% tariff rate',
  'India: 25% tariff on imports',
  'Average rate: 18% — highest since 1930s',
];

export default function Landing() {
  const tickerText = [...TICKER_ITEMS, ...TICKER_ITEMS].join('  ·  ');

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Ticker */}
      <div style={{
        background: 'var(--red)',
        padding: '8px 0',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        position: 'relative'
      }}>
        <div style={{
          display: 'inline-block',
          animation: 'ticker 30s linear infinite',
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          fontWeight: 500,
          letterSpacing: '0.05em',
          color: '#fff',
          paddingLeft: '100%'
        }}>
          {tickerText}
        </div>
      </div>

      {/* Nav */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
        borderBottom: '1px solid var(--border)',
        position: 'sticky',
        top: 0,
        background: 'rgba(10,14,26,0.95)',
        backdropFilter: 'blur(12px)',
        zIndex: 100
      }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800 }}>
          Tariff<span style={{ color: 'var(--red)' }}>Track</span>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Link to="/login" style={{
            padding: '8px 20px',
            color: 'var(--text2)',
            fontSize: '14px',
            fontWeight: 500,
            transition: 'color 0.2s'
          }}>Log in</Link>
          <Link to="/signup" style={{
            padding: '10px 24px',
            background: 'var(--red)',
            color: '#fff',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            transition: 'background 0.2s'
          }}>Get Started Free</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '100px 40px 80px',
        textAlign: 'center',
        position: 'relative'
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -60%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(239,68,68,0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'var(--red-glow)',
          border: '1px solid rgba(239,68,68,0.3)',
          borderRadius: '100px',
          padding: '6px 16px',
          marginBottom: '32px',
          fontSize: '13px',
          color: 'var(--red)',
          fontWeight: 600,
          fontFamily: 'var(--font-mono)'
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--red)', animation: 'pulse-red 2s infinite', display: 'inline-block' }} />
          LIVE — Average tariff: 18% · Highest since the 1930s
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(38px, 6vw, 64px)',
          fontWeight: 800,
          lineHeight: 1.1,
          marginBottom: '24px',
          letterSpacing: '-0.02em'
        }}>
          Tariffs are eating<br />
          your margins.<br />
          <span style={{ color: 'var(--red)' }}>Know exactly how much.</span>
        </h1>

        <p style={{
          fontSize: '19px',
          color: 'var(--text2)',
          lineHeight: 1.6,
          maxWidth: '580px',
          margin: '0 auto 40px',
          fontWeight: 300
        }}>
          Add your products and suppliers. TariffTrack calculates your exact tariff burden, shows you which prices to raise, and suggests cheaper domestic alternatives — in real time.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/signup" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '16px 36px',
            background: 'var(--red)',
            color: '#fff',
            borderRadius: '10px',
            fontSize: '16px',
            fontWeight: 700,
            fontFamily: 'var(--font-display)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 4px 24px rgba(239,68,68,0.3)'
          }}>
            Calculate Your Tariff Cost — Free →
          </Link>
          <Link to="/login" style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '16px 28px',
            background: 'transparent',
            border: '1px solid var(--border2)',
            color: 'var(--text2)',
            borderRadius: '10px',
            fontSize: '16px',
            fontWeight: 500
          }}>
            Sign in
          </Link>
        </div>

        <p style={{ marginTop: '20px', fontSize: '13px', color: 'var(--text3)' }}>
          Free for up to 5 products. No credit card required.
        </p>
      </section>

      {/* Pain Points */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 40px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px'
        }}>
          {[
            {
              icon: '📈',
              title: 'Supplier costs changing weekly?',
              body: 'New tariff announcements every week mean your cost structure is constantly shifting. You need real-time tracking, not a spreadsheet.'
            },
            {
              icon: '🎯',
              title: "Don't know which products to reprice?",
              body: 'Not every product is equally hit. TariffTrack identifies exactly which items need immediate attention and by how much.'
            },
            {
              icon: '💸',
              title: 'Losing margin without realizing it?',
              body: 'If you set prices 6 months ago, you may already be losing money on every sale. Know your exact current margin right now.'
            }
          ].map((card, i) => (
            <div key={i} style={{
              background: 'var(--bg2)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '28px',
              transition: 'border-color 0.2s'
            }}>
              <div style={{ fontSize: '28px', marginBottom: '16px' }}>{card.icon}</div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '18px',
                fontWeight: 700,
                marginBottom: '12px'
              }}>{card.title}</h3>
              <p style={{ color: 'var(--text2)', lineHeight: 1.6, fontSize: '15px' }}>{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '60px 40px',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '36px',
          fontWeight: 800,
          marginBottom: '12px'
        }}>How it works</h2>
        <p style={{ color: 'var(--text2)', marginBottom: '48px', fontSize: '16px' }}>
          Three steps from signup to knowing exactly what to charge
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px'
        }}>
          {[
            { step: '01', title: 'Add your products', body: 'Enter what you sell, where it comes from, your cost, and your selling price.' },
            { step: '02', title: 'See your burden', body: 'Instantly see your exact monthly tariff cost per product and in total.' },
            { step: '03', title: 'Get exact prices', body: 'AI tells you exactly what price to charge to protect your margins.' }
          ].map((s, i) => (
            <div key={i} style={{ position: 'relative' }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '48px',
                fontWeight: 500,
                color: 'rgba(239,68,68,0.2)',
                lineHeight: 1,
                marginBottom: '12px'
              }}>{s.step}</div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '17px',
                fontWeight: 700,
                marginBottom: '10px'
              }}>{s.title}</h3>
              <p style={{ color: 'var(--text2)', fontSize: '14px', lineHeight: 1.6 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Supported Countries */}
      <section style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '40px',
        textAlign: 'center'
      }}>
        <p style={{ color: 'var(--text3)', fontSize: '12px', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', marginBottom: '20px' }}>
          TRACKED COUNTRIES & REGIONS
        </p>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'center'
        }}>
          {[
            ['China', '🇨🇳', '55%'],
            ['Mexico', '🇲🇽', '25%'],
            ['Canada', '🇨🇦', '35%'],
            ['EU', '🇪🇺', '15%'],
            ['Vietnam', '🇻🇳', '46%'],
            ['Japan', '🇯🇵', '15%'],
            ['South Korea', '🇰🇷', '15%'],
            ['India', '🇮🇳', '25%'],
            ['Brazil', '🇧🇷', '50%'],
            ['Taiwan', '🇹🇼', '32%']
          ].map(([name, flag, rate]) => (
            <div key={name} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              background: 'var(--bg2)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              fontSize: '14px'
            }}>
              <span style={{ fontSize: '20px' }}>{flag}</span>
              <span style={{ color: 'var(--text2)', fontWeight: 500 }}>{name}</span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--red)',
                fontWeight: 600
              }}>{rate}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '60px 40px',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '36px',
          fontWeight: 800,
          marginBottom: '48px'
        }}>Simple pricing</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {/* Free */}
          <div style={{
            background: 'var(--bg2)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '36px',
            textAlign: 'left'
          }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Free</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '40px', fontWeight: 800, marginBottom: '4px' }}>$0</div>
            <div style={{ color: 'var(--text3)', fontSize: '14px', marginBottom: '28px' }}>forever</div>
            {[
              'Up to 5 products',
              '1 AI analysis per week',
              'All tariff calculations',
              'Margin alerts'
            ].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '14px', color: 'var(--text2)' }}>
                <span style={{ color: 'var(--green)', fontWeight: 700 }}>✓</span> {f}
              </div>
            ))}
            <Link to="/signup" style={{
              display: 'block',
              marginTop: '24px',
              padding: '12px',
              textAlign: 'center',
              border: '1px solid var(--border2)',
              borderRadius: '8px',
              color: 'var(--text)',
              fontWeight: 600,
              fontSize: '14px',
              transition: 'border-color 0.2s'
            }}>Get started free</Link>
          </div>

          {/* Pro */}
          <div style={{
            background: 'var(--bg2)',
            border: '1px solid rgba(239,68,68,0.4)',
            borderRadius: '16px',
            padding: '36px',
            textAlign: 'left',
            position: 'relative',
            boxShadow: '0 0 40px rgba(239,68,68,0.08)'
          }}>
            <div style={{
              position: 'absolute',
              top: '-12px',
              right: '24px',
              background: 'var(--red)',
              color: '#fff',
              padding: '4px 12px',
              borderRadius: '100px',
              fontSize: '12px',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)'
            }}>MOST POPULAR</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Pro</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '40px', fontWeight: 800, marginBottom: '4px' }}>$14.99</div>
            <div style={{ color: 'var(--text3)', fontSize: '14px', marginBottom: '28px' }}>per month</div>
            {[
              'Unlimited products',
              'Unlimited AI analysis',
              'Email alerts on tariff changes',
              'CSV export',
              'Priority support'
            ].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '14px', color: 'var(--text2)' }}>
                <span style={{ color: 'var(--green)', fontWeight: 700 }}>✓</span> {f}
              </div>
            ))}
            <Link to="/signup" style={{
              display: 'block',
              marginTop: '24px',
              padding: '12px',
              textAlign: 'center',
              background: 'var(--red)',
              borderRadius: '8px',
              color: '#fff',
              fontWeight: 700,
              fontSize: '14px',
              transition: 'background 0.2s'
            }}>Start with Pro</Link>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '40px',
        textAlign: 'center'
      }}>
        <div style={{
          background: 'var(--bg2)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '40px',
          position: 'relative'
        }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '60px',
            color: 'rgba(239,68,68,0.3)',
            lineHeight: 0.8,
            marginBottom: '20px'
          }}>"</div>
          <p style={{
            fontSize: '18px',
            color: 'var(--text)',
            lineHeight: 1.7,
            marginBottom: '24px',
            fontStyle: 'italic'
          }}>
            Finally know exactly how much tariffs are costing me every month. Raised prices on 4 products immediately and recovered $800 in monthly margin.
          </p>
          <div style={{ color: 'var(--text3)', fontSize: '14px' }}>
            <strong style={{ color: 'var(--text2)' }}>Sarah M.</strong> — Retail shop owner, Ohio
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        textAlign: 'center',
        padding: '80px 40px'
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '40px',
          fontWeight: 800,
          marginBottom: '16px'
        }}>Start protecting your margins today</h2>
        <p style={{ color: 'var(--text2)', marginBottom: '36px', fontSize: '17px' }}>
          Free to start. Takes 2 minutes. Know your exact tariff cost before your next order.
        </p>
        <Link to="/signup" style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '18px 44px',
          background: 'var(--red)',
          color: '#fff',
          borderRadius: '10px',
          fontSize: '17px',
          fontWeight: 700,
          fontFamily: 'var(--font-display)',
          boxShadow: '0 4px 30px rgba(239,68,68,0.35)',
          transition: 'transform 0.2s'
        }}>
          Get Started — It's Free →
        </Link>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '28px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '18px' }}>
          Tariff<span style={{ color: 'var(--red)' }}>Track</span>
        </div>
        <div style={{ color: 'var(--text3)', fontSize: '13px' }}>
          © 2026 TariffTrack by DealDily. Tariff rates updated regularly.
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link to="/login" style={{ color: 'var(--text3)', fontSize: '13px' }}>Login</Link>
          <Link to="/signup" style={{ color: 'var(--text3)', fontSize: '13px' }}>Sign up</Link>
        </div>
      </footer>
    </div>
  );
}
