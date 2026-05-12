'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const themes = {
  dark: {
    bg: '#0a0a0f', card: '#13131a', border: '#1e1e30', footerBorder: '#1a1a2e',
    divider: '#1e1e30', text: '#fff', textSecondary: '#d1d5db', textDim: '#4b5563',
    navBg: 'rgba(10,10,15,0.92)', navBorder: '#1e1e30', navLogin: '#6b7280',
    statHover: '#16162a', tableAlt: 'rgba(255,255,255,0.01)',
    stickyBg: 'rgba(13,13,20,0.96)', stickyBorder: '#1e1e30', stickyText: '#d1d5db',
    painBg: '#0d0d16', painStrip: '#1e1e30', phoneBg: '#13131a', phoneBorder: '#2a2a3d',
    dashBg: '#0d0d16',
  },
  light: {
    bg: '#f5f5fa', card: '#ffffff', border: 'rgba(0,0,0,0.09)', footerBorder: 'rgba(0,0,0,0.08)',
    divider: 'rgba(0,0,0,0.09)', text: '#111827', textSecondary: '#374151', textDim: '#6b7280',
    navBg: 'rgba(245,245,250,0.95)', navBorder: 'rgba(0,0,0,0.1)', navLogin: '#6b7280',
    statHover: '#ededf7', tableAlt: 'rgba(0,0,0,0.02)',
    stickyBg: 'rgba(245,245,250,0.97)', stickyBorder: 'rgba(0,0,0,0.1)', stickyText: '#374151',
    painBg: '#eeeef6', painStrip: 'rgba(0,0,0,0.08)', phoneBg: '#fff', phoneBorder: 'rgba(0,0,0,0.12)',
    dashBg: '#f0f0f7',
  },
}

export default function Home() {
  const observerRef = useRef(null)
  const [showSticky, setShowSticky] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const saved = localStorage.getItem('billmate-lp-theme')
    if (saved === 'light' || saved === 'dark') setTheme(saved)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('billmate-lp-theme', next)
  }

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        } else {
          entry.target.classList.remove('visible')
          if (entry.boundingClientRect.top < 0) {
            entry.target.classList.add('from-above')
          } else {
            entry.target.classList.remove('from-above')
          }
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.reveal, .stagger').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('visible')
      } else {
        observerRef.current.observe(el)
      }
    })

    const onScroll = () => setShowSticky(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observerRef.current?.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const t = themes[theme]

  const sectionLabel = (text) => (
    <p className="reveal" style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7c5cfc', textAlign: 'center', marginBottom: '0.6rem' }}>{text}</p>
  )
  const sectionHeading = (text) => (
    <h2 className="reveal" style={{ color: t.text, fontWeight: 800, fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', letterSpacing: '-0.03em', textAlign: 'center', marginBottom: '0.6rem', lineHeight: 1.2 }} dangerouslySetInnerHTML={{ __html: text }} />
  )
  const sectionSub = (text) => (
    <p className="reveal" style={{ color: '#6b7280', fontSize: '1rem', textAlign: 'center', marginBottom: '2.5rem' }}>{text}</p>
  )
  const divider = () => (
    <div style={{ borderTop: `1px solid ${t.divider}`, marginBottom: '5rem' }} />
  )

  const faqs = [
    { q: 'Is BillMate really free?', a: 'Yes — the Free plan is free forever. No credit card required to sign up. You get unlimited invoices, GST calculation, PDF export, and payment tracking at no cost.' },
    { q: 'Does it work on my phone?', a: 'Absolutely. BillMate is built mobile-first. Invoice on-site, send before you leave the driveway — all from your phone without needing a laptop.' },
    { q: 'Do I need to be registered for GST?', a: 'No. You can use BillMate whether or not you\'re GST-registered. If you\'re not registered, GST simply won\'t be added to your totals.' },
    { q: 'Can I customise invoices with my logo?', a: 'Custom branding including your logo is available on the Pro plan (A$7/month). The Free plan generates clean, professional invoices with the BillMate template.' },
    { q: 'Is my data safe?', a: 'Yes. Your data is stored securely and never shared with third parties. BillMate is an Australian-owned product (ABN 46 849 678 875).' },
    { q: 'Can I cancel Pro anytime?', a: 'Yes — cancel any time, no lock-in, no cancellation fees. You\'ll drop back to the free plan and keep all your existing invoices.' },
  ]

  const svgIcon = (path, viewBox = '0 0 24 24') => (
    <svg viewBox={viewBox} style={{ width: 22, height: 22, stroke: 'currentColor', fill: 'none', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }} dangerouslySetInnerHTML={{ __html: path }} />
  )

  return (
    <div style={{ minHeight: '100vh', background: t.bg }}>
      <style>{`
        /* Keyframes */
        @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes glowPulse{ 0%,100%{opacity:0.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.15)} }
        @keyframes badgePop { 0%{opacity:0;transform:scale(0.85) translateY(6px)} 100%{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer  { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
        @keyframes spin     { to{transform:rotate(360deg)} }

        /* Hero entrance */
        .hero-badge { animation: badgePop 0.55s cubic-bezier(0.34,1.56,0.64,1) both; }
        .hero-h1    { animation: fadeUp 0.65s ease both 0.1s; }
        .hero-sub   { animation: fadeUp 0.65s ease both 0.2s; }
        .hero-cta   { animation: fadeUp 0.65s ease both 0.3s; }
        .hero-proof { animation: fadeUp 0.65s ease both 0.4s; }
        .phone-wrap { animation: float 5s ease-in-out infinite; }
        .hero-glow  { animation: glowPulse 6s ease-in-out infinite; }

        /* Scroll-reveal */
        .reveal { opacity:0; transform:translateY(28px); transition:opacity 0.6s ease,transform 0.6s ease; }
        .reveal.from-above { transform:translateY(-28px); }
        .reveal.visible    { opacity:1; transform:translateY(0); }
        .stagger > * { opacity:0; transform:translateY(20px); transition:opacity 0.5s ease,transform 0.5s ease; }
        .stagger.from-above > * { transform:translateY(-20px); }
        .stagger.visible > *:nth-child(1){ opacity:1;transform:none;transition-delay:0s; }
        .stagger.visible > *:nth-child(2){ opacity:1;transform:none;transition-delay:0.1s; }
        .stagger.visible > *:nth-child(3){ opacity:1;transform:none;transition-delay:0.2s; }
        .stagger.visible > *:nth-child(4){ opacity:1;transform:none;transition-delay:0.3s; }

        /* Hover states */
        .hover-card { transition:border-color 0.2s,transform 0.2s,box-shadow 0.2s; }
        .hover-card:hover { border-color:rgba(124,92,252,0.45)!important; transform:translateY(-3px); box-shadow:0 8px 32px rgba(124,92,252,0.12); }
        .hover-card:hover .icon-box { background:rgba(124,92,252,0.22)!important; border-color:rgba(124,92,252,0.5)!important; transform:scale(1.08); }
        .icon-box { transition:background 0.25s,border-color 0.25s,transform 0.25s; }
        .nav-cta:hover  { background:#6a4ae8!important; transform:translateY(-1px); }
        .btn-primary    { position:relative; overflow:hidden; transition:background 0.2s,transform 0.15s; }
        .btn-primary:hover { background:#6a4ae8!important; transform:translateY(-2px); }
        .btn-primary::after { content:''; position:absolute;top:0;left:0;width:100%;height:100%; background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.12) 50%,transparent 100%); background-size:400px 100%; opacity:0; transition:opacity 0.2s; }
        .btn-primary:hover::after { opacity:1; animation:shimmer 0.7s ease forwards; }
        .btn-ghost:hover  { border-color:rgba(124,92,252,0.4)!important; transform:translateY(-2px); }
        .industry-pill:hover { border-color:rgba(124,92,252,0.45)!important; color:#a78bfa!important; }
        .stat-cell { transition:background 0.2s,box-shadow 0.2s; }
        .stat-cell:hover { background:${t.statHover}!important; box-shadow:inset 0 0 40px rgba(124,92,252,0.12); }
        .pain-item { transition:background 0.2s; }
        .pain-strip-outer { margin-left:-24px; margin-right:-24px; }
        @media(max-width:640px){ .pain-strip-outer{margin-left:-20px!important;margin-right:-20px!important;} }
        .theme-toggle-btn:hover { border-style:dashed!important; border-color:rgba(124,92,252,0.6)!important; box-shadow:0 0 10px rgba(124,92,252,0.35)!important; color:#c4b5fd!important; }
        .faq-item { transition:border-color 0.2s; }
        .faq-item:hover { border-color:rgba(124,92,252,0.3)!important; }
        .sticky-cta { position:fixed;bottom:0;left:0;right:0;z-index:200; background:${t.stickyBg};backdrop-filter:blur(12px); border-top:1px solid ${t.stickyBorder}; padding:12px 20px;display:flex;justify-content:space-between;align-items:center;gap:12px; transition:transform 0.3s ease,opacity 0.3s ease; }
        .sticky-cta.hidden { transform:translateY(100%);opacity:0;pointer-events:none; }
        @media(min-width:641px){ .sticky-cta{display:none!important;} }
        @media(max-width:900px){ .hero-grid{grid-template-columns:1fr!important;padding-bottom:32px!important;} .phone-wrap{display:none!important;} }
        @media(max-width:640px){
          .lp-nav{padding:14px 20px!important;}
          .lp-main{padding-left:20px!important;padding-right:20px!important;}
          .stats-bar{grid-template-columns:repeat(2,1fr)!important;}
          .steps-grid{grid-template-columns:1fr!important;}
          .features-grid{grid-template-columns:1fr!important;}
          .lp-cta-row{flex-direction:column!important;align-items:stretch!important;}
          .lp-cta-row a,.lp-cta-row button{text-align:center!important;}
          .pricing-grid{grid-template-columns:1fr!important;}
          .testimonials-grid{grid-template-columns:1fr!important;}
          .compare-table th,.compare-table td{padding:10px 8px!important;font-size:0.78rem!important;}
          .footer-inner{flex-direction:column!important;align-items:flex-start!important;}
          .pain-strip-inner{grid-template-columns:repeat(2,1fr)!important;}
          .dash-body{grid-template-columns:1fr!important;}
          .dash-sidebar{display:none!important;}
        }
      `}</style>

      {/* Sticky mobile CTA */}
      <div className={`sticky-cta${showSticky ? '' : ' hidden'}`}>
        <p style={{ color: t.stickyText, fontSize: '0.88rem', fontWeight: 500, margin: 0 }}>Free to start. No credit card.</p>
        <Link href="/signup" style={{ background: '#7c5cfc', color: '#fff', fontWeight: 700, fontSize: '0.88rem', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
          Try Free →
        </Link>
      </div>

      {/* Nav */}
      <nav className="lp-nav" style={{ position: 'sticky', top: 0, zIndex: 50, background: t.navBg, backdropFilter: 'blur(14px)', borderBottom: `1px solid ${t.navBorder}`, padding: '16px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ color: t.text, fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.03em', textDecoration: 'none' }}>
          Bill<span style={{ color: '#7c5cfc' }}>Mate</span>
        </Link>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle theme"
            style={{ width: 40, height: 40, borderRadius: '50%', background: 'transparent', border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.25)'}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'box-shadow 0.2s,border-color 0.2s,border-style 0.2s', flexShrink: 0, fontSize: 20, lineHeight: 1, color: theme === 'dark' ? '#ffffff' : '#111827' }}>
            {theme === 'dark' ? '☀' : '☽'}
          </button>
          <Link href="/login" style={{ color: t.navLogin, fontSize: '0.88rem', fontWeight: 500, padding: '8px 14px', textDecoration: 'none' }}>Log in</Link>
          <Link href="/signup" className="nav-cta" style={{ background: '#7c5cfc', color: '#fff', fontSize: '0.88rem', fontWeight: 600, padding: '9px 22px', borderRadius: '8px', textDecoration: 'none', transition: 'background 0.2s,transform 0.15s', display: 'inline-block' }}>
            Try Free
          </Link>
        </div>
      </nav>

      <main className="lp-main" style={{ paddingTop: '80px', paddingLeft: '24px', paddingRight: '24px', paddingBottom: '0' }}>

        {/* Hero glow */}
        <div className="hero-glow" style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', width: '700px', height: '500px', background: 'radial-gradient(ellipse at center, rgba(124,92,252,0.13) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

        {/* Hero — 2 column */}
        <div className="hero-grid" style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center', position: 'relative', zIndex: 10, paddingBottom: '64px' }}>
          <div>
            <div className="hero-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(124,92,252,0.1)', border: '1px solid rgba(124,92,252,0.25)', borderRadius: '100px', padding: '6px 16px', fontSize: '0.8rem', color: '#a78bfa', fontWeight: 600, marginBottom: '1.6rem' }}>
              <span style={{ fontSize: '11px' }}>✦</span> Made in Australia, for Australian tradies
            </div>
            <h1 className="hero-h1" style={{ fontSize: 'clamp(2.4rem, 4vw, 3.4rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, color: t.text, marginBottom: '1.2rem' }}>
              Stop doing invoices<br />
              <span style={{ background: 'linear-gradient(90deg, #7c5cfc, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>at night.</span>
            </h1>
            <p className="hero-sub" style={{ fontSize: '1.05rem', color: '#6b7280', maxWidth: '480px', marginBottom: '2rem', lineHeight: 1.75 }}>
              Invoice before you leave the driveway. GST sorted automatically, PDF ready in seconds, track who's paid — all from your phone.
            </p>
            <div className="lp-cta-row hero-cta" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '1.4rem' }}>
              <Link href="/signup" className="btn-primary" style={{ background: '#7c5cfc', color: '#fff', fontWeight: 700, fontSize: '0.95rem', padding: '13px 36px', borderRadius: '10px', textDecoration: 'none', display: 'inline-block' }}>
                Create Your First Invoice Free →
              </Link>
              <button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} className="btn-ghost" style={{ background: 'transparent', color: '#9ca3af', fontWeight: 600, fontSize: '0.95rem', padding: '13px 28px', borderRadius: '10px', border: '1px solid rgba(156,163,175,0.3)', cursor: 'pointer', transition: 'border-color 0.2s,transform 0.15s' }}>
                See how it works
              </button>
            </div>
            <div className="hero-proof" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex' }}>
                {[['#7c5cfc','D'],['#a78bfa','T'],['#6a4ae8','S']].map(([bg, letter]) => (
                  <div key={letter} style={{ width: 28, height: 28, borderRadius: '50%', background: bg, border: `2px solid ${t.bg}`, marginLeft: letter === 'D' ? 0 : -8, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>{letter}</div>
                ))}
              </div>
              <span style={{ color: '#6b7280', fontSize: '0.82rem' }}>Joined by <strong style={{ color: '#a78bfa' }}>Australian tradies</strong> · Free to start</span>
            </div>
          </div>

          {/* Phone mockup */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -30, right: -30, width: 200, height: 200, background: 'radial-gradient(ellipse, rgba(124,92,252,0.2) 0%, transparent 70%)', pointerEvents: 'none', borderRadius: '50%', animation: 'glowPulse 4s ease-in-out infinite' }} />
            <div className="phone-wrap" style={{ width: 260, height: 520, background: t.phoneBg, border: `2px solid ${t.phoneBorder}`, borderRadius: 40, padding: 16, boxShadow: `0 40px 80px rgba(0,0,0,0.5), 0 0 60px rgba(124,92,252,0.15)` }}>
              <div style={{ width: 80, height: 6, background: t.border, borderRadius: 3, margin: '0 auto 16px' }} />
              <div style={{ background: t.bg, borderRadius: 24, height: 'calc(100% - 22px)', padding: '16px 12px', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <span style={{ fontWeight: 800, fontSize: '1rem', color: t.text }}>Bill<span style={{ color: '#7c5cfc' }}>Mate</span></span>
                  <div style={{ width: 28, height: 28, background: '#7c5cfc', borderRadius: '50%' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: t.border, borderRadius: 10, overflow: 'hidden', marginBottom: 12 }}>
                  {[['$8,200','Total','#fff'],['$5,400','Paid','#4ade80'],['$2,800','Owed','#fbbf24']].map(([val,lbl,col])=>(
                    <div key={lbl} style={{ background: t.card, padding: '10px 6px', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 800, color: col }}>{val}</div>
                      <div style={{ fontSize: '0.55rem', color: '#6b7280', marginTop: 2 }}>{lbl}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: '#7c5cfc', color: '#fff', fontWeight: 700, fontSize: '0.75rem', padding: 10, borderRadius: 8, textAlign: 'center', marginBottom: 12 }}>+ New Invoice</div>
                {[['ABC Plumbing','INV-0042 · Today','$1,430','unpaid'],['Dan\'s Electrics','INV-0041 · May 9','$880','paid'],['Harbour Builds','INV-0040 · May 7','$3,200','paid']].map(([client,num,amt,status])=>(
                  <div key={client} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 10, padding: 12, marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '0.72rem', fontWeight: 600, color: t.text }}>{client}</div>
                      <div style={{ fontSize: '0.6rem', color: '#6b7280' }}>{num}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#7c5cfc' }}>{amt}</div>
                      <div style={{ fontSize: '0.5rem', padding: '3px 7px', borderRadius: 999, fontWeight: 700, background: status === 'paid' ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)', color: status === 'paid' ? '#4ade80' : '#fbbf24' }}>{status.toUpperCase()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pain strip */}
        <div className="reveal pain-strip-outer" style={{ background: t.painBg, borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}`, padding: '32px 24px', marginBottom: '5rem' }}>
          <div className="pain-strip-inner stagger" style={{ maxWidth: '700px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: t.painStrip, borderRadius: 14, overflow: 'hidden' }}>
            {[
              { path: '<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 12"/>', label: 'Sick of Sunday night paperwork?', desc: 'Invoice on-site, before you leave the driveway.' },
              { path: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>', label: 'Chasing unpaid invoices?', desc: 'See exactly who owes you and how long it\'s been.' },
              { path: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>', label: 'Getting GST wrong?', desc: 'Calculated automatically. Every invoice, every time.' },
              { path: '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>', label: 'Paying $30+/month for Xero?', desc: 'BillMate is free. Forever. No credit card.' },
            ].map(({ path, label, desc }) => (
              <div key={label} className="pain-item" style={{ background: t.card, padding: '24px 16px', textAlign: 'center' }} onMouseEnter={e => e.currentTarget.style.background = t.statHover} onMouseLeave={e => e.currentTarget.style.background = t.card}>
                <div style={{ width: 44, height: 44, background: 'rgba(124,92,252,0.12)', border: '1px solid rgba(124,92,252,0.2)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: '#a78bfa' }}>
                  <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, stroke: 'currentColor', fill: 'none', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }} dangerouslySetInnerHTML={{ __html: path }} />
                </div>
                <strong style={{ color: t.text, display: 'block', fontSize: '0.88rem', marginBottom: 4 }}>{label}</strong>
                <p style={{ fontSize: '0.82rem', color: '#6b7280', lineHeight: 1.5, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div className="stats-bar reveal" style={{ maxWidth: '700px', margin: '0 auto 5rem', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: t.border, border: `1px solid ${t.border}`, borderRadius: '14px', overflow: 'hidden', position: 'relative', zIndex: 10 }}>
          {[{ value: '30s', label: 'To create an invoice' },{ value: 'Auto', label: 'GST calculated' },{ value: '1-tap', label: 'Quote to invoice' },{ value: 'Free', label: 'To get started' }].map(({ value, label }) => (
            <div key={value} className="stat-cell" style={{ background: t.card, padding: '1.6rem 1rem', textAlign: 'center' }}>
              <p style={{ color: t.text, fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.03em', marginBottom: '4px' }}>{value}</p>
              <p style={{ color: '#6b7280', fontSize: '0.78rem', fontWeight: 500 }}>{label}</p>
            </div>
          ))}
        </div>

        <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          {divider()}

          {/* How it works */}
          <div id="how-it-works" className="reveal" style={{ marginBottom: '5rem' }}>
            {sectionLabel('How it works')}
            {sectionHeading('Invoice before you leave the site.')}
            {sectionSub('Three taps. Done. No laptop needed.')}
            <div className="steps-grid stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' }}>
              {[{ step: '01', title: 'Fill in the job', desc: 'Client name, job details, line items. Takes 30 seconds on your phone.' },{ step: '02', title: 'GST sorted automatically', desc: 'No maths. No second-guessing. Your invoice is ATO-compliant by default.' },{ step: '03', title: 'Send & get paid', desc: 'Email a PDF or share a link. See when it\'s paid. Chase what\'s overdue.' }].map(({ step, title, desc }) => (
                <div key={step} className="hover-card" style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: '14px', padding: '1.6rem' }}>
                  <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', color: '#7c5cfc', marginBottom: '0.8rem' }}>STEP {step}</p>
                  <p style={{ color: t.text, fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.5rem' }}>{title}</p>
                  <p style={{ color: '#6b7280', fontSize: '0.85rem', lineHeight: 1.65, margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {divider()}
        </div>

        {/* Big app preview */}
        <div className="reveal" style={{ maxWidth: '1100px', margin: '0 auto 5rem', padding: '0 24px' }}>
          {sectionLabel('See BillMate in action')}
          {sectionHeading('Your invoicing dashboard.')}
          {sectionSub('Everything you need. Nothing you don\'t.')}
          <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 20, overflow: 'hidden', boxShadow: `0 40px 80px rgba(0,0,0,0.3), 0 0 60px rgba(124,92,252,0.08)` }}>
            <div style={{ background: t.dashBg, borderBottom: `1px solid ${t.border}`, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
              {[['#ff5f57'],['#febc2e'],['#28c840']].map(([bg])=><div key={bg} style={{ width: 10, height: 10, borderRadius: '50%', background: bg }} />)}
              <span style={{ color: '#4b5563', fontSize: '0.78rem', marginLeft: 8 }}>bill-mate.com.au/dashboard</span>
            </div>
            <div className="dash-body" style={{ padding: 32, display: 'grid', gridTemplateColumns: '260px 1fr', gap: 24, minHeight: 420 }}>
              <div className="dash-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <p style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.03em', color: t.text, marginBottom: 16 }}>Bill<span style={{ color: '#7c5cfc' }}>Mate</span></p>
                {[
                  { icon: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>', label: 'Dashboard', active: true },
                  { icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>', label: 'Invoices', active: false },
                  { icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>', label: 'Clients', active: false },
                  { icon: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>', label: 'Settings', active: false },
                ].map(({ icon, label, active }) => (
                  <div key={label} style={{ padding: '11px 16px', borderRadius: 10, fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, background: active ? 'rgba(124,92,252,0.15)' : 'transparent', color: active ? '#a78bfa' : '#6b7280' }}>
                    <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, stroke: 'currentColor', fill: 'none', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', flexShrink: 0 }} dangerouslySetInnerHTML={{ __html: icon }} />
                    {label}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ color: t.text, fontWeight: 700, fontSize: '1.1rem', margin: 0 }}>Welcome back 👋</p>
                    <p style={{ color: '#6b7280', fontSize: '0.82rem', margin: 0 }}>Monday, 12 May 2026</p>
                  </div>
                  <div style={{ background: '#7c5cfc', color: '#fff', fontWeight: 700, fontSize: '0.85rem', padding: '10px 20px', borderRadius: 10 }}>+ New Invoice</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: t.border, borderRadius: 12, overflow: 'hidden' }}>
                  {[['Total invoiced','$12,840',t.text],['Paid','$9,640','#4ade80'],['Outstanding','$3,200','#fbbf24']].map(([lbl,val,col])=>(
                    <div key={lbl} style={{ background: t.dashBg, padding: '18px 16px' }}>
                      <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{lbl}</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, color: col }}>{val}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: t.dashBg, borderRadius: 12, overflow: 'hidden' }}>
                  <div style={{ padding: '14px 20px', borderBottom: `1px solid ${t.border}` }}>
                    <p style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6b7280', margin: 0 }}>Unpaid Invoices</p>
                  </div>
                  {[['ABC Plumbing Co.','INV-0042','unpaid','$1,430.00'],['Harbour Constructions','INV-0041','unpaid','$3,200.00'],['Metro Electrical','INV-0040','paid','$880.00']].map(([client,num,status,amt])=>(
                    <div key={num} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: `1px solid ${t.border}` }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: t.text }}>{client}</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: 2 }}>{num} · 12 May 2026</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <span style={{ fontSize: '0.65rem', padding: '3px 10px', borderRadius: 999, fontWeight: 700, background: status === 'paid' ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)', color: status === 'paid' ? '#4ade80' : '#fbbf24' }}>{status.toUpperCase()}</span>
                        <span style={{ fontWeight: 800, fontSize: '1rem', color: t.text }}>{amt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          {divider()}

          {/* Features */}
          <div className="reveal" style={{ marginBottom: '5rem' }}>
            {sectionLabel('Features')}
            {sectionHeading("Everything a tradie needs.<br />Nothing they don't.")}
            {sectionSub("Built lean. No bloat. No modules you'll never touch.")}
            <div className="features-grid stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1rem' }}>
              {[
                { path: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>', title: 'Payment tracking', desc: 'See who\'s paid and who owes you at a glance. No spreadsheets.' },
                { path: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>', title: 'Australian GST built-in', desc: 'Auto-calculated on every invoice. ATO-compliant by default.' },
                { path: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="12" x2="12" y2="18"/><polyline points="9 15 12 18 15 15"/>', title: 'One-click PDF export', desc: 'Professional invoices, instantly. Send from the job site.' },
                { path: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>', title: 'Business profile', desc: 'Set your ABN, business name, and payment terms once. Pre-filled every time.' },
              ].map(({ path, title, desc }) => (
                <div key={title} className="hover-card" style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: '14px', padding: '1.6rem' }}>
                  <div className="icon-box" style={{ width: 46, height: 46, background: 'rgba(124,92,252,0.12)', border: '1px solid rgba(124,92,252,0.25)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: '#a78bfa' }}>
                    <svg viewBox="0 0 24 24" style={{ width: 22, height: 22, stroke: 'currentColor', fill: 'none', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }} dangerouslySetInnerHTML={{ __html: path }} />
                  </div>
                  <p style={{ color: t.text, fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.4rem' }}>{title}</p>
                  <p style={{ color: '#6b7280', fontSize: '0.85rem', lineHeight: 1.65, margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {divider()}

          {/* Testimonials */}
          <div className="reveal" style={{ marginBottom: '5rem' }}>
            {sectionLabel('Reviews')}
            {sectionHeading('Be the first to review.')}
            {sectionSub('Early access is open. Try it free and let us know what you think.')}
            <div style={{ background: t.card, border: `1px dashed rgba(124,92,252,0.35)`, borderRadius: '20px', padding: '3rem 2rem', textAlign: 'center' }}>
              <div style={{ width: 56, height: 56, background: 'rgba(124,92,252,0.1)', border: '1px solid rgba(124,92,252,0.25)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.2rem' }}>
                <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, stroke: '#a78bfa', fill: 'none', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <p style={{ color: t.text, fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.5rem' }}>No reviews yet — yours could be first.</p>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: 420, margin: '0 auto 1.8rem' }}>
                BillMate is free to try. Sign up, create your first invoice, and tell us what you think.
              </p>
              <p style={{ color: '#fbbf24', fontSize: '1.1rem', letterSpacing: 3, margin: '0 0 1.8rem' }}>★★★★★</p>
              <a href="mailto:khenz.dev@gmail.com?subject=BillMate%20Review" style={{ display: 'inline-block', background: 'rgba(124,92,252,0.12)', border: '1px solid rgba(124,92,252,0.35)', color: '#a78bfa', fontWeight: 600, fontSize: '0.9rem', padding: '11px 28px', borderRadius: '10px', textDecoration: 'none' }}>
                Send your review →
              </a>
            </div>
          </div>


        </div>

        {/* Pricing */}
        <div id="pricing" style={{ maxWidth: '700px', margin: '0 auto 5rem', position: 'relative', zIndex: 10 }}>
          {divider()}
          {sectionLabel('Pricing')}
          {sectionHeading('Simple, honest pricing.')}
          {sectionSub('No lock-in contracts. No surprise fees.')}
          <div className="pricing-grid reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1rem' }}>
            <div className="hover-card" style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: '20px', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
              <p style={{ color: '#a78bfa', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>Free</p>
              <p style={{ color: t.text, fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '0.25rem' }}>A$0</p>
              <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Forever free — no credit card needed</p>
              <ul style={{ listStyle: 'none', flex: 1, marginBottom: '1.5rem' }}>
                {['Unlimited invoices','PDF export','GST auto-calculation','Track payments'].map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0.35rem 0', borderBottom: `1px solid ${t.border}`, fontSize: '0.88rem', color: t.textSecondary }}>
                    <span style={{ color: '#7c5cfc', fontWeight: 700, fontSize: '0.78rem' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" style={{ display: 'block', textAlign: 'center', border: '1px solid rgba(124,92,252,0.4)', color: '#a78bfa', borderRadius: '10px', padding: '12px', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>
                Get started free
              </Link>
            </div>
            <div className="hover-card" style={{ background: t.card, border: '2px solid #7c5cfc', borderRadius: '20px', padding: '2rem', display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: '0 0 40px rgba(124,92,252,0.12)' }}>
              <div style={{ position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)', background: '#7c5cfc', color: '#fff', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '4px 14px', borderRadius: '100px', whiteSpace: 'nowrap' }}>Most popular</div>
              <p style={{ color: '#a78bfa', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>Pro</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '0.25rem' }}>
                <p style={{ color: t.text, fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, margin: 0 }}>A$7</p>
                <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: 0 }}>/month</p>
              </div>
              <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Billed monthly. Cancel anytime.</p>
              <ul style={{ listStyle: 'none', flex: 1, marginBottom: '1.5rem' }}>
                {['Everything in Free','Custom logo & branding','Overdue reminders','Client portal link','Priority support'].map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0.35rem 0', borderBottom: `1px solid ${t.border}`, fontSize: '0.88rem', color: t.textSecondary }}>
                    <span style={{ color: '#7c5cfc', fontWeight: 700, fontSize: '0.78rem' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" style={{ display: 'block', textAlign: 'center', background: '#7c5cfc', color: '#fff', borderRadius: '10px', padding: '12px', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>
                Go Pro — A$7/mo
              </Link>
            </div>
          </div>
          <p style={{ textAlign: 'center', color: t.textDim, fontSize: '0.8rem', marginTop: 16 }}>Australian GST included · Stripe-secured payments · Cancel anytime</p>
        </div>

        {/* Comparison table */}
        <div style={{ maxWidth: '700px', margin: '0 auto 5rem', position: 'relative', zIndex: 10 }}>
          {divider()}
          {sectionLabel('Why BillMate')}
          {sectionHeading('Built for tradies. Not accountants.')}
          {sectionSub('See how BillMate stacks up against the alternatives.')}
          <div className="reveal" style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: '16px', overflow: 'hidden' }}>
            <table className="compare-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${t.border}` }}>
                  <th style={{ padding: '14px 20px', textAlign: 'left', color: '#6b7280', fontSize: '0.82rem', fontWeight: 600 }}>Feature</th>
                  <th style={{ padding: '14px 16px', textAlign: 'center', color: '#a78bfa', fontSize: '0.82rem', fontWeight: 700, background: 'rgba(124,92,252,0.05)' }}>BillMate</th>
                  <th style={{ padding: '14px 16px', textAlign: 'center', color: '#6b7280', fontSize: '0.82rem', fontWeight: 600 }}>Xero</th>
                  <th style={{ padding: '14px 16px', textAlign: 'center', color: '#6b7280', fontSize: '0.82rem', fontWeight: 600 }}>MYOB</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Built for tradies',       bm: true,    xero: false,      myob: false },
                  { feature: 'Free plan',               bm: true,    xero: false,      myob: false },
                  { feature: 'No credit card to start', bm: true,    xero: false,      myob: false },
                  { feature: 'Mobile-first quoting',    bm: true,    xero: false,      myob: false },
                  { feature: 'Auto GST calculation',    bm: true,    xero: true,       myob: true },
                  { feature: 'PDF export',              bm: true,    xero: true,       myob: true },
                  { feature: 'Setup time',              bm: '2 mins', xero: 'Hours',   myob: 'Hours' },
                  { feature: 'Entry price',             bm: 'A$0',   xero: 'A$34/mo', myob: 'A$27/mo' },
                ].map(({ feature, bm, xero, myob }, i) => (
                  <tr key={feature} style={{ borderBottom: i < 7 ? `1px solid ${t.border}` : 'none' }}>
                    <td style={{ padding: '12px 20px', color: t.textSecondary, fontSize: '0.88rem' }}>{feature}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'center', background: 'rgba(124,92,252,0.03)' }}>
                      {typeof bm === 'boolean' ? <span style={{ color: bm ? '#7c5cfc' : '#9ca3af', fontWeight: 700, fontSize: '1rem' }}>{bm ? '✓' : '✗'}</span> : <span style={{ color: '#7c5cfc', fontWeight: 700, fontSize: '0.85rem' }}>{bm}</span>}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      {typeof xero === 'boolean' ? <span style={{ color: xero ? '#6b7280' : '#ef4444', fontSize: '1rem' }}>{xero ? '✓' : '✗'}</span> : <span style={{ color: '#6b7280', fontSize: '0.85rem' }}>{xero}</span>}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      {typeof myob === 'boolean' ? <span style={{ color: myob ? '#6b7280' : '#ef4444', fontSize: '1rem' }}>{myob ? '✓' : '✗'}</span> : <span style={{ color: '#6b7280', fontSize: '0.85rem' }}>{myob}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ maxWidth: '700px', margin: '0 auto 5rem', position: 'relative', zIndex: 10 }}>
          {divider()}
          {sectionLabel('FAQ')}
          {sectionHeading('Questions tradies ask.')}
          {sectionSub('Straight answers. No fluff.')}
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item" onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: '12px', overflow: 'hidden', cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.1rem 1.4rem', gap: '1rem' }}>
                  <p style={{ color: t.text, fontWeight: 600, fontSize: '0.92rem', margin: 0 }}>{faq.q}</p>
                  <span style={{ color: '#7c5cfc', fontWeight: 700, fontSize: '1.1rem', flexShrink: 0, transition: 'transform 0.25s', transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)', display: 'inline-block' }}>+</span>
                </div>
                {openFaq === i && (
                  <div style={{ padding: '0 1.4rem 1.1rem', borderTop: `1px solid ${t.border}` }}>
                    <p style={{ color: '#6b7280', fontSize: '0.88rem', lineHeight: 1.7, margin: '0.8rem 0 0' }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Final CTA */}
      <section style={{ background: 'linear-gradient(135deg, rgba(124,92,252,0.12) 0%, rgba(124,92,252,0.04) 100%)', borderTop: '1px solid rgba(124,92,252,0.15)', borderBottom: '1px solid rgba(124,92,252,0.15)', padding: '96px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '300px', background: 'radial-gradient(ellipse at center, rgba(124,92,252,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="reveal" style={{ maxWidth: '520px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 style={{ color: '#fff', fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', letterSpacing: '-0.03em', marginBottom: '0.8rem', lineHeight: 1.2 }}>
            Invoice before you<br />leave the driveway.
          </h2>
          <p style={{ color: '#9ca3af', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', marginBottom: '2.5rem' }}>
            Free forever. No credit card. Built for Australian tradies.
          </p>
          <Link href="/signup" className="btn-primary" style={{ display: 'inline-block', background: '#7c5cfc', color: '#fff', padding: '14px 48px', borderRadius: '12px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none' }}>
            Start Free in 30 Seconds →
          </Link>
          <p style={{ color: '#4b5563', fontSize: '0.82rem', marginTop: '1.2rem' }}>
            Australian-owned · ABN 46 849 678 875 · No credit card needed
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: t.bg, borderTop: `1px solid ${t.footerBorder}`, padding: '48px 24px 36px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div className="footer-inner" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '32px', marginBottom: '40px' }}>
            <div>
              <p style={{ color: t.text, fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em', marginBottom: '4px' }}>Bill<span style={{ color: '#7c5cfc' }}>Mate</span></p>
              <p style={{ color: t.textDim, fontSize: '0.8rem', margin: '0 0 2px' }}>ABN 46 849 678 875</p>
              <a href="mailto:khenz.dev@gmail.com" style={{ color: t.textDim, fontSize: '0.8rem', textDecoration: 'none' }}>khenz.dev@gmail.com</a>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 32px' }}>
              {[{ label: 'Privacy Policy', href: '/privacy' },{ label: 'Terms', href: '/terms' },{ label: 'Contact', href: 'mailto:khenz.dev@gmail.com' },{ label: 'Feedback', href: 'mailto:khenz.dev@gmail.com?subject=BillMate%20Feedback' }].map(({ label, href }) => (
                <a key={label} href={href} style={{ color: '#6b7280', fontSize: '0.85rem', textDecoration: 'none', transition: 'color 0.2s' }}>{label}</a>
              ))}
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${t.border}`, paddingTop: '24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
            <p style={{ color: '#6b7280', fontSize: '0.8rem', margin: 0 }}>© 2026 BillMate. All rights reserved.</p>
            <p style={{ color: t.textDim, fontSize: '0.8rem', margin: 0 }}>Built in Australia 🇦🇺</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
