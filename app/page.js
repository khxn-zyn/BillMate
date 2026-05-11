'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const themes = {
  dark: {
    bg: '#0a0a0f',
    card: '#13131a',
    border: '#1e1e30',
    footerBorder: '#1a1a2e',
    divider: '#1e1e30',
    text: '#fff',
    textSecondary: '#d1d5db',
    textDim: '#4b5563',
    navBg: 'rgba(10,10,15,0.92)',
    navBorder: '#1e1e30',
    navLogin: '#6b7280',
    statHover: '#16162a',
    tableAlt: 'rgba(255,255,255,0.01)',
    stickyBg: 'rgba(13,13,20,0.96)',
    stickyBorder: '#1e1e30',
    stickyText: '#d1d5db',
  },
  light: {
    bg: '#f5f5fa',
    card: '#ffffff',
    border: 'rgba(0,0,0,0.09)',
    footerBorder: 'rgba(0,0,0,0.08)',
    divider: 'rgba(0,0,0,0.09)',
    text: '#111827',
    textSecondary: '#374151',
    textDim: '#6b7280',
    navBg: 'rgba(245,245,250,0.95)',
    navBorder: 'rgba(0,0,0,0.1)',
    navLogin: '#6b7280',
    statHover: '#ededf7',
    tableAlt: 'rgba(0,0,0,0.02)',
    stickyBg: 'rgba(245,245,250,0.97)',
    stickyBorder: 'rgba(0,0,0,0.1)',
    stickyText: '#374151',
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
          entry.target.style.opacity = '1'
          entry.target.style.transform = 'translateY(0)'
          observerRef.current.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.fade-up').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
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
    <p className="fade-up" style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7c5cfc', textAlign: 'center', marginBottom: '0.6rem' }}>{text}</p>
  )

  const sectionHeading = (text) => (
    <h2 className="fade-up" style={{ color: t.text, fontWeight: 800, fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', letterSpacing: '-0.03em', textAlign: 'center', marginBottom: '0.6rem', lineHeight: 1.2 }} dangerouslySetInnerHTML={{ __html: text }} />
  )

  const sectionSub = (text) => (
    <p className="fade-up" style={{ color: '#6b7280', fontSize: '1rem', textAlign: 'center', marginBottom: '2.5rem' }}>{text}</p>
  )

  const divider = () => (
    <div style={{ borderTop: `1px solid ${t.divider}`, marginBottom: '5rem' }} />
  )

  const faqs = [
    { q: 'Is BillMate really free?', a: 'Yes — the Free plan is free forever. No credit card required to sign up. You get unlimited invoices, GST calculation, PDF export, and payment tracking at no cost.' },
    { q: 'Does it work on my phone?', a: 'Absolutely. BillMate is built mobile-first. Quote on-site, convert to invoice, and send — all from your phone without needing a laptop.' },
    { q: 'Is GST automatically calculated?', a: 'Yes. Every invoice automatically calculates GST at the current Australian rate (10%). No manual maths needed.' },
    { q: 'Can I customise my invoices with my logo?', a: 'Custom branding including your logo is available on the Pro plan (A$7/month). The Free plan generates clean, professional invoices with the BillMate template.' },
    { q: 'Is my data safe?', a: 'Yes. Your data is stored securely and never shared with third parties. BillMate is an Australian-owned product (ABN 46 849 678 875).' },
    { q: 'Do I need to know accounting to use it?', a: "Not at all. BillMate handles the numbers. You just fill in the job details — it sorts the GST, totals, and invoice format automatically." },
  ]

  return (
    <div style={{ minHeight: '100vh', background: t.bg }}>
      <style>{`
        .fade-up { opacity: 0; transform: translateY(24px); transition: opacity 0.55s ease, transform 0.55s ease; }
        .hover-card { transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease; }
        .hover-card:hover { border-color: rgba(124,92,252,0.45) !important; transform: translateY(-2px); box-shadow: 0 8px 32px rgba(124,92,252,0.12); }
        .nav-cta:hover { background: #6a4ae8 !important; transform: translateY(-1px); }
        .btn-primary:hover { background: #6a4ae8 !important; transform: translateY(-2px); }
        .btn-ghost:hover { border-color: rgba(124,92,252,0.4) !important; transform: translateY(-2px); }
        .industry-pill:hover { border-color: rgba(124,92,252,0.45) !important; color: #a78bfa !important; }
        .stat-cell { transition: background 0.2s, box-shadow 0.2s; }
        .stat-cell:hover { background: ${t.statHover} !important; box-shadow: inset 0 0 40px rgba(124,92,252,0.12); }
        .theme-btn:hover { color: #7c5cfc !important; }
        .faq-item { transition: border-color 0.2s; }
        .faq-item:hover { border-color: rgba(124,92,252,0.3) !important; }
        .sticky-cta {
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 200;
          background: ${t.stickyBg}; backdrop-filter: blur(12px);
          border-top: 1px solid ${t.stickyBorder};
          padding: 12px 20px; display: flex; justify-content: space-between; align-items: center; gap: 12px;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .sticky-cta.hidden { transform: translateY(100%); opacity: 0; pointer-events: none; }
        @media (min-width: 641px) { .sticky-cta { display: none !important; } }
        @media (max-width: 640px) {
          .lp-nav { padding: 14px 20px !important; }
          .lp-main { padding-left: 20px !important; padding-right: 20px !important; }
          .stats-bar { grid-template-columns: repeat(2, 1fr) !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .features-grid { grid-template-columns: 1fr !important; }
          .lp-cta-row { flex-direction: column !important; align-items: stretch !important; }
          .lp-cta-row a, .lp-cta-row button { text-align: center !important; }
          .pricing-grid { grid-template-columns: 1fr !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
          .compare-table th, .compare-table td { padding: 10px 8px !important; font-size: 0.78rem !important; }
          .footer-inner { flex-direction: column !important; align-items: flex-start !important; }
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
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <button
            onClick={toggleTheme}
            className="theme-btn"
            aria-label="Toggle theme"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#6b7280', fontSize: '1.05rem', padding: '7px 9px', lineHeight: 1, display: 'flex', alignItems: 'center', transition: 'color 0.2s', borderRadius: 8 }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <Link href="/login" style={{ color: t.navLogin, fontSize: '0.88rem', fontWeight: 500, padding: '8px 14px', textDecoration: 'none' }}>Log in</Link>
          <Link href="/signup" className="nav-cta" style={{ background: '#7c5cfc', color: '#fff', fontSize: '0.88rem', fontWeight: 600, padding: '9px 22px', borderRadius: '8px', textDecoration: 'none', transition: 'background 0.2s, transform 0.15s', display: 'inline-block' }}>
            Try Free
          </Link>
        </div>
      </nav>

      <main className="lp-main" style={{ paddingTop: '96px', paddingLeft: '24px', paddingRight: '24px', paddingBottom: '0' }}>

        <div style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', width: '700px', height: '500px', background: 'radial-gradient(ellipse at center, rgba(124,92,252,0.13) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

        {/* Hero */}
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <div className="fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(124,92,252,0.1)', border: '1px solid rgba(124,92,252,0.25)', borderRadius: '100px', padding: '6px 16px', fontSize: '0.8rem', color: '#a78bfa', fontWeight: 600, marginBottom: '1.8rem' }}>
            <span style={{ fontSize: '11px' }}>✦</span>
            Made in Australia, for Australian tradies
          </div>

          <h1 className="fade-up" style={{ fontSize: 'clamp(2.4rem, 6vw, 3.8rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, color: t.text, marginBottom: '1.2rem' }}>
            Invoicing built for<br />
            <span style={{ background: 'linear-gradient(90deg, #7c5cfc, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Australian tradies.
            </span>
          </h1>

          <p className="fade-up" style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: '#6b7280', maxWidth: '520px', margin: '0 auto 2.2rem', lineHeight: 1.75 }}>
            Quote on-site, convert to an invoice in one tap, and get paid faster — with GST sorted automatically. No accountant needed.
          </p>

          <div className="lp-cta-row fade-up" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.4rem' }}>
            <Link href="/signup" className="btn-primary" style={{ background: '#7c5cfc', color: '#fff', fontWeight: 700, fontSize: '0.95rem', padding: '12px 36px', borderRadius: '10px', textDecoration: 'none', display: 'inline-block', transition: 'background 0.2s, transform 0.15s' }}>
              Try BillMate Free
            </Link>
            <button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} className="btn-ghost" style={{ background: 'transparent', color: '#9ca3af', fontWeight: 600, fontSize: '0.95rem', padding: '12px 32px', borderRadius: '10px', border: '1px solid rgba(156,163,175,0.3)', cursor: 'pointer', transition: 'border-color 0.2s, transform 0.15s' }}>
              See how it works
            </button>
          </div>

          <p className="fade-up" style={{ color: t.textDim, fontSize: '0.82rem', marginBottom: '4rem' }}>
            Australian-owned&nbsp;&nbsp;•&nbsp;&nbsp;Free to start&nbsp;&nbsp;•&nbsp;&nbsp;No credit card needed
          </p>
        </div>

        {/* Stats bar */}
        <div className="stats-bar fade-up" style={{ maxWidth: '700px', margin: '0 auto 5rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: t.border, border: `1px solid ${t.border}`, borderRadius: '14px', overflow: 'hidden', position: 'relative', zIndex: 10 }}>
          {[
            { value: '30s',   label: 'To create an invoice' },
            { value: 'Auto',  label: 'GST calculated' },
            { value: '1-tap', label: 'Quote to invoice' },
            { value: 'Free',  label: 'To get started' },
          ].map(({ value, label }) => (
            <div key={value} className="stat-cell" style={{ background: t.card, padding: '1.6rem 1rem', textAlign: 'center' }}>
              <p style={{ color: t.text, fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.03em', marginBottom: '4px' }}>{value}</p>
              <p style={{ color: '#6b7280', fontSize: '0.78rem', fontWeight: 500 }}>{label}</p>
            </div>
          ))}
        </div>

        <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 10 }}>

          {divider()}

          {/* How it works */}
          <div id="how-it-works" style={{ marginBottom: '5rem' }}>
            {sectionLabel('How it works')}
            {sectionHeading('Three steps. Zero headaches.')}
            {sectionSub('No training required. If you can use your phone, you can use BillMate.')}
            <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              {[
                { step: '01', title: 'Create a quote on-site', desc: "Fill in the job details and send a professional quote before you leave the driveway." },
                { step: '02', title: 'Convert to invoice in one tap', desc: "Once the job's done, hit convert. Your quote becomes a tax invoice — GST and all." },
                { step: '03', title: 'Get paid faster', desc: "Send by email or link. See exactly who's paid and chase what's outstanding." },
              ].map(({ step, title, desc }) => (
                <div key={step} className="hover-card fade-up" style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: '14px', padding: '1.6rem' }}>
                  <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', color: '#7c5cfc', marginBottom: '0.8rem' }}>STEP {step}</p>
                  <p style={{ color: t.text, fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.5rem' }}>{title}</p>
                  <p style={{ color: '#6b7280', fontSize: '0.85rem', lineHeight: 1.65, margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {divider()}

          {/* Features */}
          <div style={{ marginBottom: '5rem' }}>
            {sectionLabel('Features')}
            {sectionHeading("Everything a tradie needs.<br />Nothing they don't.")}
            {sectionSub("Built lean. No bloat. No modules you'll never touch.")}
            <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {[
                { icon: '📊', title: 'Payment tracking', desc: 'See who has paid and who still owes you at a glance. No spreadsheets, no chasing paper.' },
                { icon: '🇦🇺', title: 'Australian GST built-in', desc: 'GST is automatically calculated on every invoice. Fully compliant. No manual maths.' },
                { icon: '📄', title: 'One-click PDF export', desc: 'Download or print professional invoices instantly. Send them straight from the job site.' },
                { icon: '🚀', title: 'Free to start', desc: "Get started for free. Upgrade when you're ready to grow. No credit card required." },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="hover-card fade-up" style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: '14px', padding: '1.6rem' }}>
                  <span style={{ fontSize: '1.4rem', display: 'block', marginBottom: '0.8rem' }}>{icon}</span>
                  <p style={{ color: t.text, fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.4rem' }}>{title}</p>
                  <p style={{ color: '#6b7280', fontSize: '0.85rem', lineHeight: 1.65, margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {divider()}

          {/* Who it's for */}
          <div style={{ marginBottom: '5rem' }}>
            {sectionLabel("Who it's for")}
            {sectionHeading('Built for people on the tools.')}
            {sectionSub('Not office workers. Not accountants. Tradies.')}
            <div className="fade-up" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.7rem', justifyContent: 'center' }}>
              {[
                { emoji: '🔨', label: 'Builders' },
                { emoji: '⚡', label: 'Electricians' },
                { emoji: '🔧', label: 'Plumbers' },
                { emoji: '🌿', label: 'Landscapers' },
                { emoji: '🏗️', label: 'Contractors' },
                { emoji: '🔩', label: 'Handymen' },
                { emoji: '🎨', label: 'Painters' },
                { emoji: '🪵', label: 'Carpenters' },
                { emoji: '🏠', label: 'Roofers' },
                { emoji: '🪨', label: 'Concreters' },
                { emoji: '🔲', label: 'Tilers' },
                { emoji: '🌡️', label: 'Air Con & HVAC' },
              ].map(({ emoji, label }) => (
                <span key={label} className="industry-pill" style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: '100px', padding: '0.5rem 1.2rem', fontSize: '0.88rem', color: t.textSecondary, fontWeight: 500, cursor: 'default', transition: 'border-color 0.2s, color 0.2s' }}>
                  {emoji} {label}
                </span>
              ))}
            </div>
          </div>

          {divider()}

          {/* Testimonials */}
          <div style={{ marginBottom: '5rem' }}>
            {sectionLabel('What tradies say')}
            {sectionHeading('Real feedback from the tools.')}
            {sectionSub('From the job site, not the boardroom.')}
            <div className="testimonials-grid fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              {[
                { quote: "Used to spend Sunday nights doing invoices. Now I send them before I leave the job. Game changer.", name: 'Damien C.', trade: 'Electrician, NSW' },
                { quote: "Tried Xero, tried MYOB — too complicated, too expensive. BillMate just works. Set it up in 10 minutes.", name: 'Travis M.', trade: 'Plumber, QLD' },
                { quote: "The GST sorting alone saves me an hour a week. No more second-guessing my totals.", name: 'Scott A.', trade: 'Builder, VIC' },
              ].map(({ quote, name, trade }) => (
                <div key={name} className="hover-card" style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: '14px', padding: '1.6rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <p style={{ color: t.textSecondary, fontSize: '0.9rem', lineHeight: 1.7, flex: 1, margin: 0 }}>
                    <span style={{ color: '#7c5cfc', fontSize: '1.2rem', lineHeight: 0, verticalAlign: '-0.3rem', marginRight: '3px' }}>&ldquo;</span>
                    {quote}
                    <span style={{ color: '#7c5cfc', fontSize: '1.2rem', lineHeight: 0, verticalAlign: '-0.3rem', marginLeft: '3px' }}>&rdquo;</span>
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderTop: `1px solid ${t.border}`, paddingTop: '1rem' }}>
                    <div style={{ width: '32px', height: '32px', background: 'rgba(124,92,252,0.15)', border: '1px solid rgba(124,92,252,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ color: '#7c5cfc', fontWeight: 700, fontSize: '0.78rem' }}>{name[0]}</span>
                    </div>
                    <div>
                      <p style={{ color: t.text, fontWeight: 600, fontSize: '0.85rem', margin: 0 }}>{name}</p>
                      <p style={{ color: '#6b7280', fontSize: '0.75rem', margin: 0 }}>{trade}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {divider()}

          {/* Founder */}
          <div className="fade-up" style={{ marginBottom: '5rem', background: t.card, border: `1px solid ${t.border}`, borderRadius: '20px', padding: '2.5rem', textAlign: 'center' }}>
            <p style={{ color: t.textSecondary, fontSize: '1.1rem', lineHeight: 1.8, fontStyle: 'italic', maxWidth: '560px', margin: '0 auto 1.6rem' }}>
              <span style={{ color: '#7c5cfc', fontSize: '1.6rem', lineHeight: 0, verticalAlign: '-0.4rem', marginRight: '4px' }}>&ldquo;</span>
              I built BillMate because I was sick of watching tradies get slugged by overpriced invoicing software designed for office workers, not people on the tools.
              <span style={{ color: '#7c5cfc', fontSize: '1.6rem', lineHeight: 0, verticalAlign: '-0.4rem', marginLeft: '4px' }}>&rdquo;</span>
            </p>
            <a href="https://portfolio-6yp743eos-khxn-zyns-projects.vercel.app" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem', textDecoration: 'none' }}>
              <div style={{ width: '40px', height: '40px', background: 'rgba(124,92,252,0.15)', border: '1px solid rgba(124,92,252,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: '#7c5cfc', fontWeight: 700, fontSize: '0.9rem' }}>K</span>
              </div>
              <div style={{ textAlign: 'left' }}>
                <p style={{ color: t.text, fontWeight: 600, fontSize: '0.9rem', margin: 0 }}>Khenz ↗</p>
                <p style={{ color: '#6b7280', fontSize: '0.78rem', margin: 0 }}>Founder, BillMate</p>
              </div>
            </a>
            <div style={{ borderTop: `1px solid ${t.border}`, paddingTop: '1.2rem', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ background: 'rgba(124,92,252,0.1)', border: '1px solid rgba(124,92,252,0.25)', color: '#a78bfa', fontSize: '0.75rem', fontWeight: 500, padding: '4px 12px', borderRadius: '100px' }}>Australian-owned</span>
              <span style={{ color: t.text, fontSize: '0.8rem' }}>ABN 46 849 678 875</span>
            </div>
          </div>

        </div>

        {/* Pricing */}
        <div id="pricing" style={{ maxWidth: '700px', margin: '0 auto 5rem', position: 'relative', zIndex: 10 }}>
          {divider()}
          {sectionLabel('Pricing')}
          {sectionHeading('Simple, honest pricing.')}
          {sectionSub('No lock-in contracts. No surprise fees.')}
          <div className="pricing-grid fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>

            <div className="hover-card" style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: '20px', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
              <p style={{ color: '#a78bfa', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>Free</p>
              <p style={{ color: t.text, fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '0.25rem' }}>A$0</p>
              <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Forever free — no credit card needed</p>
              <ul style={{ listStyle: 'none', flex: 1, marginBottom: '1.5rem' }}>
                {['Unlimited invoices', 'PDF export', 'GST auto-calculation', 'Track payments'].map(f => (
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
              <div style={{ position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)', background: '#7c5cfc', color: '#fff', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '4px 14px', borderRadius: '100px', whiteSpace: 'nowrap' }}>
                Most popular
              </div>
              <p style={{ color: '#a78bfa', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>Pro</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '0.25rem' }}>
                <p style={{ color: t.text, fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, margin: 0 }}>A$7</p>
                <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: 0 }}>/month</p>
              </div>
              <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Billed monthly. Cancel anytime.</p>
              <ul style={{ listStyle: 'none', flex: 1, marginBottom: '1.5rem' }}>
                {['Everything in Free', 'Custom logo & branding', 'Priority support', 'Early access to new features'].map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0.35rem 0', borderBottom: `1px solid ${t.border}`, fontSize: '0.88rem', color: t.textSecondary }}>
                    <span style={{ color: '#7c5cfc', fontWeight: 700, fontSize: '0.78rem' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" style={{ display: 'block', textAlign: 'center', background: '#7c5cfc', color: '#fff', borderRadius: '10px', padding: '12px', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>
                Go Pro
              </Link>
            </div>

          </div>
        </div>

        {/* Comparison table */}
        <div style={{ maxWidth: '700px', margin: '0 auto 5rem', position: 'relative', zIndex: 10 }}>
          {divider()}
          {sectionLabel('Why BillMate')}
          {sectionHeading('Built for tradies. Not accountants.')}
          {sectionSub('See how BillMate stacks up against the alternatives.')}
          <div className="fade-up" style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: '16px', overflow: 'hidden' }}>
            <table className="compare-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${t.border}` }}>
                  <th style={{ padding: '14px 20px', textAlign: 'left', color: '#6b7280', fontSize: '0.82rem', fontWeight: 600 }}>Feature</th>
                  <th style={{ padding: '14px 16px', textAlign: 'center', color: '#a78bfa', fontSize: '0.82rem', fontWeight: 700 }}>BillMate</th>
                  <th style={{ padding: '14px 16px', textAlign: 'center', color: '#6b7280', fontSize: '0.82rem', fontWeight: 600 }}>Xero</th>
                  <th style={{ padding: '14px 16px', textAlign: 'center', color: '#6b7280', fontSize: '0.82rem', fontWeight: 600 }}>MYOB</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Built for tradies', bm: true, xero: false, myob: false },
                  { feature: 'Free plan', bm: true, xero: false, myob: false },
                  { feature: 'Mobile-first quoting', bm: true, xero: false, myob: false },
                  { feature: 'Auto GST calculation', bm: true, xero: true, myob: true },
                  { feature: 'PDF export', bm: true, xero: true, myob: true },
                  { feature: 'Setup in under 5 mins', bm: true, xero: false, myob: false },
                  { feature: 'Price (entry)', bm: 'A$0', xero: 'A$32/mo', myob: 'A$27/mo' },
                ].map(({ feature, bm, xero, myob }, i) => (
                  <tr key={feature} style={{ borderBottom: i < 6 ? `1px solid ${t.border}` : 'none', background: i % 2 === 0 ? 'transparent' : t.tableAlt }}>
                    <td style={{ padding: '12px 20px', color: t.textSecondary, fontSize: '0.88rem' }}>{feature}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      {typeof bm === 'boolean'
                        ? <span style={{ color: bm ? '#7c5cfc' : '#9ca3af', fontWeight: 700, fontSize: '1rem' }}>{bm ? '✓' : '✗'}</span>
                        : <span style={{ color: '#7c5cfc', fontWeight: 700, fontSize: '0.85rem' }}>{bm}</span>}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      {typeof xero === 'boolean'
                        ? <span style={{ color: xero ? '#6b7280' : '#9ca3af', fontSize: '1rem' }}>{xero ? '✓' : '✗'}</span>
                        : <span style={{ color: '#6b7280', fontSize: '0.85rem' }}>{xero}</span>}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      {typeof myob === 'boolean'
                        ? <span style={{ color: myob ? '#6b7280' : '#9ca3af', fontSize: '1rem' }}>{myob ? '✓' : '✗'}</span>
                        : <span style={{ color: '#6b7280', fontSize: '0.85rem' }}>{myob}</span>}
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
          {sectionHeading('Common questions.')}
          {sectionSub("Everything you'd want to know before signing up.")}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item" onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: '12px', overflow: 'hidden', cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.1rem 1.4rem', gap: '1rem' }}>
                  <p style={{ color: t.text, fontWeight: 600, fontSize: '0.92rem', margin: 0 }}>{faq.q}</p>
                  <span style={{ color: '#7c5cfc', fontWeight: 700, fontSize: '1.1rem', flexShrink: 0, transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
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
        <div className="fade-up" style={{ maxWidth: '520px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 style={{ color: t.text, fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', letterSpacing: '-0.03em', marginBottom: '0.8rem', lineHeight: 1.2 }}>
            Ready to get paid faster?
          </h2>
          <p style={{ color: '#9ca3af', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', marginBottom: '2.5rem' }}>
            Join Australian tradies already using BillMate.
          </p>
          <Link href="/signup" className="btn-primary" style={{ display: 'inline-block', background: '#7c5cfc', color: '#fff', padding: '14px 48px', borderRadius: '12px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none', transition: 'background 0.2s, transform 0.15s' }}>
            Try BillMate Free →
          </Link>
          <p style={{ color: t.textDim, fontSize: '0.82rem', marginTop: '1.2rem' }}>
            Australian-owned&nbsp;&nbsp;•&nbsp;&nbsp;Free to start&nbsp;&nbsp;•&nbsp;&nbsp;No credit card needed
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: t.bg, borderTop: `1px solid ${t.footerBorder}`, padding: '48px 24px 36px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div className="footer-inner" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '32px', marginBottom: '40px' }}>
            <div>
              <p style={{ color: t.text, fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em', marginBottom: '4px' }}>Bill<span style={{ color: '#7c5cfc' }}>Mate</span></p>
              <p style={{ color: t.textDim, fontSize: '0.8rem', margin: 0 }}>ABN 46 849 678 875</p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 32px' }}>
              {[
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms', href: '/terms' },
                { label: 'Contact', href: 'mailto:support@bill-mate.com.au' },
                { label: 'Feedback', href: 'mailto:support@bill-mate.com.au?subject=BillMate%20Feedback' },
              ].map(({ label, href }) => (
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
