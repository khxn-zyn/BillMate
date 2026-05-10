'use client'
import { useState, useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const themes = {
  dark: {
    bg: '#0a0a0f',
    glow: 'rgba(124,92,252,0.12)',
    card: '#13131a',
    cardBorder: '#1e1e30',
    rowBorder: '#1a1a28',
    rowHover: 'rgba(124,92,252,0.04)',
    text: '#fff',
    textMuted: '#6b7280',
    input: '#0d0d16',
    inputBorder: '#1e1e30',
    inputColor: '#fff',
    dropdown: '#13131a',
    dropdownBorder: '#1e1e30',
    dropdownHover: 'rgba(124,92,252,0.07)',
    tabActive: 'rgba(124,92,252,0.15)',
    tabActiveFg: '#a78bfa',
    tabInactiveFg: '#6b7280',
    divider: '#1e1e30',
  },
  light: {
    bg: '#f0f0f7',
    glow: 'rgba(124,92,252,0.07)',
    card: '#fff',
    cardBorder: 'rgba(0,0,0,0.08)',
    rowBorder: 'rgba(0,0,0,0.06)',
    rowHover: 'rgba(124,92,252,0.04)',
    text: '#111827',
    textMuted: '#6b7280',
    input: '#fff',
    inputBorder: 'rgba(0,0,0,0.12)',
    inputColor: '#111827',
    dropdown: '#fff',
    dropdownBorder: 'rgba(0,0,0,0.1)',
    dropdownHover: 'rgba(0,0,0,0.04)',
    tabActive: 'rgba(124,92,252,0.12)',
    tabActiveFg: '#7c5cfc',
    tabInactiveFg: '#6b7280',
    divider: 'rgba(0,0,0,0.07)',
  },
}

export default function Dashboard() {
  const [invoices, setInvoices] = useState([])
  const [loadingInvoices, setLoadingInvoices] = useState(true)
  const [tab, setTab] = useState('active')
  const [searchTerm, setSearchTerm] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [theme, setTheme] = useState('dark')
  const router = useRouter()
  const dropdownRef = useRef(null)

  useEffect(() => {
    const saved = localStorage.getItem('billmate-theme')
    if (saved === 'light' || saved === 'dark') setTheme(saved)
  }, [])

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserEmail(user.email)
        const name = user.user_metadata?.full_name || user.email?.split('@')[0] || ''
        setUserName(name)
      }
    }
    getUser()
  }, [])

  useEffect(() => {
    const fetchInvoices = async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from('invoices')
        .select('id, status, data')
        .order('created_at', { ascending: false })
      if (data) setInvoices(data.map(row => ({ ...row.data, id: row.id, status: row.status })))
      setLoadingInvoices(false)
    }
    fetchInvoices()
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('billmate-theme', next)
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.replace('/login')
  }

  const handleUpgrade = async () => {
    try {
      const response = await fetch('/api/checkout', { method: 'POST' })
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert(`Upgrade failed: ${data.error ?? 'Unknown error'}`)
      }
    } catch {
      alert('Something went wrong. Please try again.')
    }
  }

  const t = themes[theme]
  const initial = userEmail ? userEmail[0].toUpperCase() : '?'

  const total = invoices.reduce((s, i) => s + (i.total || 0), 0)
  const paid = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + (i.total || 0), 0)
  const outstanding = total - paid

  const activeInvoices = invoices.filter(i => i.status !== 'paid')
  const paidInvoices = invoices.filter(i => i.status === 'paid')

  const filteredInvoices = useMemo(() => {
    const list = tab === 'active' ? activeInvoices : paidInvoices
    if (!searchTerm) return list
    return list.filter(inv =>
      inv.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.num?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [activeInvoices, paidInvoices, tab, searchTerm])

  const SkeletonRow = () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: `1px solid ${t.rowBorder}` }}>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
      <div>
        <div style={{ width: 140, height: 13, background: t.rowBorder, borderRadius: 6, marginBottom: 9, animation: 'pulse 1.5s ease-in-out infinite' }} />
        <div style={{ width: 100, height: 11, background: t.rowBorder, borderRadius: 6, animation: 'pulse 1.5s ease-in-out infinite 0.2s' }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <div style={{ width: 52, height: 20, background: t.rowBorder, borderRadius: 999, animation: 'pulse 1.5s ease-in-out infinite 0.1s' }} />
        <div style={{ width: 60, height: 16, background: t.rowBorder, borderRadius: 6, animation: 'pulse 1.5s ease-in-out infinite 0.3s' }} />
      </div>
    </div>
  )

  const InvoiceRow = ({ inv }) => (
    <div
      onClick={() => router.push(`/invoice/${inv.id}`)}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderBottom: `1px solid ${t.rowBorder}`, cursor: 'pointer', transition: 'background 0.15s' }}
      onMouseEnter={e => e.currentTarget.style.background = t.rowHover}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <div>
        <p style={{ color: t.text, fontWeight: 600, fontSize: 15, margin: 0 }}>{inv.clientName}</p>
        <p style={{ color: t.textMuted, fontSize: 12, marginTop: 3, margin: 0 }}>{inv.num} · {inv.date}</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <span style={{
          fontSize: 10, padding: '4px 10px', borderRadius: 999, fontWeight: 700, letterSpacing: '0.06em',
          background: inv.status === 'paid' ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)',
          color: inv.status === 'paid' ? '#4ade80' : '#fbbf24',
        }}>
          {inv.status === 'paid' ? 'PAID' : 'UNPAID'}
        </span>
        <span style={{ color: t.text, fontWeight: 700, fontSize: 16 }}>${inv.total.toFixed(2)}</span>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: t.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 20px 100px' }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>

      <div style={{ position: 'fixed', top: -150, left: '50%', transform: 'translateX(-50%)', width: 600, height: 500, background: `radial-gradient(ellipse, ${t.glow} 0%, transparent 70%)`, pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 560, position: 'relative', zIndex: 10 }}>

        {/* Header */}
        <div style={{ position: 'relative', textAlign: 'center', marginBottom: 36 }}>

          {/* Avatar + dropdown */}
          <div ref={dropdownRef} style={{ position: 'absolute', top: 4, right: 0, zIndex: 20 }}>
            <button
              onClick={() => setDropdownOpen(o => !o)}
              style={{ width: 38, height: 38, borderRadius: '50%', background: '#7c5cfc', color: 'white', fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {initial}
            </button>

            {dropdownOpen && (
              <div style={{ position: 'absolute', top: 46, right: 0, width: 220, background: t.dropdown, border: `1px solid ${t.dropdownBorder}`, borderRadius: 14, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
                <div style={{ padding: '12px 16px', borderBottom: `1px solid ${t.divider}` }}>
                  <p style={{ color: t.textMuted, fontSize: 12, margin: 0, wordBreak: 'break-all' }}>{userEmail}</p>
                </div>
                <button
                  onClick={toggleTheme}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', padding: '12px 16px', background: 'transparent', border: 'none', borderBottom: `1px solid ${t.divider}`, cursor: 'pointer', color: t.text, fontSize: 13, fontWeight: 600 }}
                  onMouseEnter={e => e.currentTarget.style.background = t.dropdownHover}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  {theme === 'dark' ? '☀️  Light mode' : '🌙  Dark mode'}
                </button>
                <a
                  href="mailto:support@bill-mate.com.au?subject=BillMate%20Feedback"
                  style={{ width: '100%', display: 'flex', alignItems: 'center', padding: '12px 16px', background: 'transparent', borderBottom: `1px solid ${t.divider}`, cursor: 'pointer', color: t.text, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}
                  onMouseEnter={e => e.currentTarget.style.background = t.dropdownHover}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  Send feedback
                </a>
                <button
                  onClick={handleLogout}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', padding: '12px 16px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#f87171', fontSize: 13, fontWeight: 600 }}
                  onMouseEnter={e => e.currentTarget.style.background = t.dropdownHover}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  Log out
                </button>
              </div>
            )}
          </div>

          <Link href="/" style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.04em', textDecoration: 'none' }}>
            <span style={{ color: t.text }}>Bill</span><span style={{ color: '#7c5cfc' }}>Mate</span>
          </Link>
          <p style={{ color: t.textMuted, fontSize: 15, marginTop: 6 }}>
            Welcome back 👋
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1px', background: t.cardBorder, border: `1px solid ${t.cardBorder}`, borderRadius: 16, overflow: 'hidden', marginBottom: 12 }}>
          {[
            { label: 'Total', value: `$${total.toFixed(2)}`, color: t.text },
            { label: 'Paid', value: `$${paid.toFixed(2)}`, color: '#4ade80' },
            { label: 'Outstanding', value: `$${outstanding.toFixed(2)}`, color: '#fbbf24' },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ background: t.card, padding: '18px 12px', textAlign: 'center' }}>
              <p style={{ color: t.textMuted, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>{label}</p>
              <p style={{ color, fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em' }}>{value}</p>
            </div>
          ))}
        </div>

        {/* New Invoice */}
        <Link href="/invoice/new" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', background: '#7c5cfc', color: 'white', textAlign: 'center', padding: '13px', borderRadius: 12, fontWeight: 700, fontSize: 14, marginBottom: 12, textDecoration: 'none', transition: 'background 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.background = '#6a4ae8'}
          onMouseLeave={e => e.currentTarget.style.background = '#7c5cfc'}
        >
          + New Invoice
        </Link>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by client or invoice number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', background: t.input, border: `1px solid ${t.inputBorder}`, borderRadius: 12, padding: '13px 18px', color: t.inputColor, fontSize: 14, marginBottom: 12, outline: 'none', boxSizing: 'border-box' }}
          onFocus={e => e.target.style.borderColor = 'rgba(124,92,252,0.5)'}
          onBlur={e => e.target.style.borderColor = t.inputBorder}
        />

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
          {[
            { id: 'active', label: `Active (${activeInvoices.length})` },
            { id: 'history', label: `History (${paidInvoices.length})` },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => { setTab(id); setSearchTerm('') }}
              style={{ padding: '9px 18px', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none', background: tab === id ? t.tabActive : 'transparent', color: tab === id ? t.tabActiveFg : t.tabInactiveFg, transition: 'background 0.2s, color 0.2s' }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Invoice list */}
        <div style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 16, overflow: 'hidden', marginBottom: 12 }}>
          <div style={{ padding: '14px 24px', borderBottom: `1px solid ${t.divider}` }}>
            <h2 style={{ color: t.textMuted, fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
              {tab === 'active' ? 'Unpaid Invoices' : 'Paid Invoices'}
            </h2>
          </div>
          {loadingInvoices ? (
            [0, 1, 2].map(i => <SkeletonRow key={i} />)
          ) : filteredInvoices.length === 0 ? (
            <div style={{ padding: '56px 24px', textAlign: 'center' }}>
              <p style={{ color: t.textMuted, marginBottom: 20, fontSize: 14 }}>
                {searchTerm ? 'No matching invoices' : tab === 'active' ? 'No active invoices yet' : 'No paid invoices yet'}
              </p>
              {tab === 'active' && !searchTerm && (
                <Link href="/invoice/new" style={{ background: '#7c5cfc', color: 'white', padding: '10px 24px', borderRadius: 10, fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
                  Create your first invoice
                </Link>
              )}
            </div>
          ) : (
            filteredInvoices.map(inv => <InvoiceRow key={inv.id} inv={inv} />)
          )}
        </div>

        {/* Upgrade Banner */}
        <div style={{ background: 'linear-gradient(135deg, rgba(124,92,252,0.12), rgba(167,139,250,0.08))', border: '1px solid rgba(124,92,252,0.25)', borderRadius: 16, padding: 24, textAlign: 'center' }}>
          <p style={{ color: t.text, fontWeight: 700, fontSize: 16, marginBottom: 6 }}>Upgrade to Pro</p>
          <p style={{ color: t.textMuted, fontSize: 13, marginBottom: 18 }}>Custom branding, priority support & early access to new features</p>
          <button
            onClick={handleUpgrade}
            style={{ width: '100%', background: '#7c5cfc', color: 'white', padding: '13px', borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: 'pointer', border: 'none', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#6a4ae8'}
            onMouseLeave={e => e.currentTarget.style.background = '#7c5cfc'}
          >
            Go Pro — A$7/month →
          </button>
        </div>

      </div>
    </div>
  )
}
