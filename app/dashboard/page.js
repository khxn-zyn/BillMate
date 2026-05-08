'use client'
import { useState, useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const themes = {
  dark: {
    bg: '#0a0a0f',
    glow: 'rgba(99,102,241,0.15)',
    card: 'rgba(255,255,255,0.05)',
    cardBorder: 'rgba(255,255,255,0.1)',
    rowBorder: 'rgba(255,255,255,0.08)',
    rowHover: 'rgba(255,255,255,0.03)',
    text: 'white',
    textMuted: '#6b7280',
    input: 'rgba(255,255,255,0.05)',
    inputBorder: 'rgba(255,255,255,0.1)',
    inputColor: 'white',
    dropdown: '#1a1a2e',
    dropdownBorder: 'rgba(255,255,255,0.12)',
    dropdownHover: 'rgba(255,255,255,0.07)',
    tabActive: 'rgba(255,255,255,0.1)',
    tabActiveFg: 'white',
    tabInactiveFg: '#6b7280',
    divider: 'rgba(255,255,255,0.08)',
  },
  light: {
    bg: '#f0f0f7',
    glow: 'rgba(99,102,241,0.07)',
    card: 'white',
    cardBorder: 'rgba(0,0,0,0.08)',
    rowBorder: 'rgba(0,0,0,0.06)',
    rowHover: 'rgba(0,0,0,0.025)',
    text: '#111827',
    textMuted: '#6b7280',
    input: 'white',
    inputBorder: 'rgba(0,0,0,0.12)',
    inputColor: '#111827',
    dropdown: 'white',
    dropdownBorder: 'rgba(0,0,0,0.1)',
    dropdownHover: 'rgba(0,0,0,0.04)',
    tabActive: 'rgba(0,0,0,0.08)',
    tabActiveFg: '#111827',
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
      if (user) setUserEmail(user.email)
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
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
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
    router.push('/login')
  }

  const handleUpgrade = async () => {
    try {
      const response = await fetch('/api/checkout', { method: 'POST' })
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        console.error('Checkout error:', data.error)
        alert(`Upgrade failed: ${data.error ?? 'Unknown error'}`)
      }
    } catch (err) {
      console.error('Checkout fetch error:', err)
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
    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'20px 24px', borderBottom:`1px solid ${t.rowBorder}`}}>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
      <div>
        <div style={{width:140, height:13, background:t.rowBorder, borderRadius:6, marginBottom:9, animation:'pulse 1.5s ease-in-out infinite'}} />
        <div style={{width:100, height:11, background:t.rowBorder, borderRadius:6, animation:'pulse 1.5s ease-in-out infinite 0.2s'}} />
      </div>
      <div style={{display:'flex', alignItems:'center', gap:24}}>
        <div style={{width:52, height:20, background:t.rowBorder, borderRadius:999, animation:'pulse 1.5s ease-in-out infinite 0.1s'}} />
        <div style={{width:60, height:16, background:t.rowBorder, borderRadius:6, animation:'pulse 1.5s ease-in-out infinite 0.3s'}} />
      </div>
    </div>
  )

  const InvoiceRow = ({ inv }) => (
    <div
      onClick={() => router.push(`/invoice/${inv.id}`)}
      style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'20px 24px', borderBottom:`1px solid ${t.rowBorder}`, cursor:'pointer'}}
      onMouseEnter={e => e.currentTarget.style.background = t.rowHover}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <div>
        <p style={{color:t.text, fontWeight:600, fontSize:16}}>{inv.clientName}</p>
        <p style={{color:t.textMuted, fontSize:13, marginTop:4}}>{inv.num} · {inv.date}</p>
      </div>
      <div style={{display:'flex', alignItems:'center', gap:24}}>
        <span style={{
          fontSize:11, padding:'4px 12px', borderRadius:999, fontWeight:700,
          background: inv.status === 'paid' ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)',
          color: inv.status === 'paid' ? '#4ade80' : '#fbbf24',
        }}>
          {inv.status === 'paid' ? 'PAID' : 'UNPAID'}
        </span>
        <span style={{color:t.text, fontWeight:700, fontSize:18}}>${inv.total.toFixed(2)}</span>
      </div>
    </div>
  )

  return (
    <div style={{minHeight:'100vh', background:t.bg, display:'flex', flexDirection:'column', alignItems:'center', padding:'60px 20px'}}>

      <div style={{position:'fixed', top:-200, left:'50%', transform:'translateX(-50%)', width:600, height:600, background:t.glow, borderRadius:'50%', filter:'blur(100px)', pointerEvents:'none'}} />

      <div style={{width:'100%', maxWidth:560, position:'relative', zIndex:10}}>

        {/* Header */}
        <div style={{position:'relative', textAlign:'center', marginBottom:40}}>

          {/* Avatar + dropdown */}
          <div ref={dropdownRef} style={{position:'absolute', top:4, right:0, zIndex:20}}>
            <button
              onClick={() => setDropdownOpen(o => !o)}
              style={{width:38, height:38, borderRadius:'50%', background:'#7c5cfc', color:'white', fontWeight:700, fontSize:15, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}
            >
              {initial}
            </button>

            {dropdownOpen && (
              <div style={{position:'absolute', top:46, right:0, width:220, background:t.dropdown, border:`1px solid ${t.dropdownBorder}`, borderRadius:14, overflow:'hidden', boxShadow:'0 8px 32px rgba(0,0,0,0.25)'}}>
                <div style={{padding:'12px 16px', borderBottom:`1px solid ${t.divider}`}}>
                  <p style={{color:t.textMuted, fontSize:12, margin:0, wordBreak:'break-all'}}>{userEmail}</p>
                </div>

                <button
                  onClick={toggleTheme}
                  style={{width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 16px', background:'transparent', border:'none', borderBottom:`1px solid ${t.divider}`, cursor:'pointer', color:t.text, fontSize:13, fontWeight:600}}
                  onMouseEnter={e => e.currentTarget.style.background = t.dropdownHover}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span>{theme === 'dark' ? '☀️  Light mode' : '🌙  Dark mode'}</span>
                </button>

                <button
                  onClick={handleLogout}
                  style={{width:'100%', display:'flex', alignItems:'center', padding:'12px 16px', background:'transparent', border:'none', cursor:'pointer', color:'#f87171', fontSize:13, fontWeight:600}}
                  onMouseEnter={e => e.currentTarget.style.background = t.dropdownHover}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  Log out
                </button>
              </div>
            )}
          </div>

          <span style={{fontSize:48, fontWeight:700, color:t.text, letterSpacing:'-2px'}}>BillMate</span>
          <p style={{color:t.textMuted, fontSize:16, marginTop:8}}>Welcome back 👋</p>
        </div>

        {/* Stats */}
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12, marginBottom:12}}>
          <div style={{background:t.card, border:`1px solid ${t.cardBorder}`, borderRadius:16, padding:'20px 16px', textAlign:'center'}}>
            <p style={{color:t.textMuted, fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:1, marginBottom:8}}>Total</p>
            <p style={{color:t.text, fontSize:22, fontWeight:700}}>${total.toFixed(2)}</p>
          </div>
          <div style={{background:t.card, border:`1px solid ${t.cardBorder}`, borderRadius:16, padding:'20px 16px', textAlign:'center'}}>
            <p style={{color:t.textMuted, fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:1, marginBottom:8}}>Paid</p>
            <p style={{color:'#4ade80', fontSize:22, fontWeight:700}}>${paid.toFixed(2)}</p>
          </div>
          <div style={{background:t.card, border:`1px solid ${t.cardBorder}`, borderRadius:16, padding:'20px 16px', textAlign:'center'}}>
            <p style={{color:t.textMuted, fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:1, marginBottom:8}}>Outstanding</p>
            <p style={{color:'#fbbf24', fontSize:22, fontWeight:700}}>${outstanding.toFixed(2)}</p>
          </div>
        </div>

        {/* New Invoice */}
        <Link href="/invoice/new" style={{display:'block', width:'100%', background:'#4f46e5', color:'white', textAlign:'center', padding:'14px', borderRadius:16, fontWeight:700, fontSize:14, marginBottom:12, textDecoration:'none'}}>
          + New Invoice
        </Link>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by client or invoice number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{width:'100%', background:t.input, border:`1px solid ${t.inputBorder}`, borderRadius:16, padding:'14px 20px', color:t.inputColor, fontSize:14, marginBottom:12, outline:'none', boxSizing:'border-box'}}
        />

        {/* Tabs */}
        <div style={{display:'flex', gap:8, marginBottom:12}}>
          <button
            onClick={() => { setTab('active'); setSearchTerm('') }}
            style={{padding:'10px 20px', borderRadius:12, fontSize:13, fontWeight:600, cursor:'pointer', background: tab === 'active' ? t.tabActive : 'transparent', color: tab === 'active' ? t.tabActiveFg : t.tabInactiveFg, border:'none'}}
          >
            Active ({activeInvoices.length})
          </button>
          <button
            onClick={() => { setTab('history'); setSearchTerm('') }}
            style={{padding:'10px 20px', borderRadius:12, fontSize:13, fontWeight:600, cursor:'pointer', background: tab === 'history' ? t.tabActive : 'transparent', color: tab === 'history' ? t.tabActiveFg : t.tabInactiveFg, border:'none'}}
          >
            History ({paidInvoices.length})
          </button>
        </div>

        {/* Invoice List */}
        <div style={{background:t.card, border:`1px solid ${t.cardBorder}`, borderRadius:16, overflow:'hidden', marginBottom:12}}>
          <div style={{padding:'16px 24px', borderBottom:`1px solid ${t.divider}`, textAlign:'center'}}>
            <h2 style={{color:t.text, fontWeight:700, fontSize:13, textTransform:'uppercase', letterSpacing:2}}>
              {tab === 'active' ? 'Unpaid Invoices' : 'Paid Invoices'}
            </h2>
          </div>
          {loadingInvoices ? (
            [0, 1, 2].map(i => <SkeletonRow key={i} />)
          ) : filteredInvoices.length === 0 ? (
            <div style={{padding:'60px 24px', textAlign:'center'}}>
              <p style={{color:t.textMuted, marginBottom:20}}>
                {searchTerm ? 'No matching invoices' : tab === 'active' ? 'No active invoices yet' : 'No paid invoices yet'}
              </p>
              {tab === 'active' && !searchTerm && (
                <Link href="/invoice/new" style={{background:'#4f46e5', color:'white', padding:'10px 24px', borderRadius:12, fontWeight:700, fontSize:13, textDecoration:'none'}}>
                  Create Your First Invoice
                </Link>
              )}
            </div>
          ) : (
            filteredInvoices.map(inv => <InvoiceRow key={inv.id} inv={inv} />)
          )}
        </div>

        {/* Upgrade Banner */}
        <div style={{background:'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(168,85,247,0.1))', border:'1px solid rgba(99,102,241,0.3)', borderRadius:16, padding:24, textAlign:'center'}}>
          <p style={{color:t.text, fontWeight:700, fontSize:18, marginBottom:8}}>Upgrade to Pro</p>
          <p style={{color:t.textMuted, fontSize:14, marginBottom:20}}>Unlimited invoices, email sending & more</p>
          <button onClick={handleUpgrade} style={{width:'100%', background:'#4f46e5', color:'white', padding:'14px', borderRadius:12, fontWeight:700, fontSize:14, cursor:'pointer', border:'none'}}>
            $7/month →
          </button>
        </div>

      </div>
    </div>
  )
}
