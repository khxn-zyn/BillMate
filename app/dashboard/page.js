'use client'
import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [invoices, setInvoices] = useState([])
  const [tab, setTab] = useState('active')
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('billmate_invoices') || '[]')
    setInvoices(saved)
  }, [])

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

  const handleUpgrade = async () => {
    const response = await fetch('/api/checkout', { method: 'POST' })
    const data = await response.json()
    if (data.url) window.location.href = data.url
  }

  const InvoiceRow = ({ inv }) => (
    <div
      onClick={() => router.push(`/invoice/${inv.id}`)}
      style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'20px 24px', borderBottom:'1px solid rgba(255,255,255,0.08)', cursor:'pointer'}}
      onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.03)'}
      onMouseLeave={e => e.currentTarget.style.background='transparent'}
    >
      <div>
        <p style={{color:'white', fontWeight:600, fontSize:16}}>{inv.clientName}</p>
        <p style={{color:'#6b7280', fontSize:13, marginTop:4}}>{inv.num} · {inv.date}</p>
      </div>
      <div style={{display:'flex', alignItems:'center', gap:24}}>
        <span style={{
          fontSize:11, padding:'4px 12px', borderRadius:999, fontWeight:700,
          background: inv.status === 'paid' ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)',
          color: inv.status === 'paid' ? '#4ade80' : '#fbbf24'
        }}>
          {inv.status === 'paid' ? 'PAID' : 'UNPAID'}
        </span>
        <span style={{color:'white', fontWeight:700, fontSize:18}}>${inv.total.toFixed(2)}</span>
      </div>
    </div>
  )

  return (
    <div style={{minHeight:'100vh', background:'#0a0a0f', display:'flex', flexDirection:'column', alignItems:'center', padding:'60px 20px'}}>

      {/* Glow */}
      <div style={{position:'fixed', top:-200, left:'50%', transform:'translateX(-50%)', width:600, height:600, background:'rgba(99,102,241,0.15)', borderRadius:'50%', filter:'blur(100px)', pointerEvents:'none'}} />

      {/* All content in one fixed-width column */}
      <div style={{width:'100%', maxWidth:560, position:'relative', zIndex:10}}>

        {/* Header */}
        <div style={{textAlign:'center', marginBottom:40}}>
          <Link href="/" style={{fontSize:48, fontWeight:700, color:'white', letterSpacing:'-2px', textDecoration:'none'}}>BillMate</Link>
          <p style={{color:'#6b7280', fontSize:16, marginTop:8}}>Welcome back 👋</p>
        </div>

        {/* Stats */}
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12, marginBottom:12}}>
          <div style={{background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:16, padding:'20px 16px', textAlign:'center'}}>
            <p style={{color:'#6b7280', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:1, marginBottom:8}}>Total</p>
            <p style={{color:'white', fontSize:22, fontWeight:700}}>${total.toFixed(2)}</p>
          </div>
          <div style={{background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:16, padding:'20px 16px', textAlign:'center'}}>
            <p style={{color:'#6b7280', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:1, marginBottom:8}}>Paid</p>
            <p style={{color:'#4ade80', fontSize:22, fontWeight:700}}>${paid.toFixed(2)}</p>
          </div>
          <div style={{background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:16, padding:'20px 16px', textAlign:'center'}}>
            <p style={{color:'#6b7280', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:1, marginBottom:8}}>Outstanding</p>
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
          style={{width:'100%', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:16, padding:'14px 20px', color:'white', fontSize:14, marginBottom:12, outline:'none'}}
        />

        {/* Tabs */}
        <div style={{display:'flex', gap:8, marginBottom:12}}>
          <button
            onClick={() => { setTab('active'); setSearchTerm('') }}
            style={{padding:'10px 20px', borderRadius:12, fontSize:13, fontWeight:600, cursor:'pointer', background: tab === 'active' ? 'rgba(255,255,255,0.1)' : 'transparent', color: tab === 'active' ? 'white' : '#6b7280', border:'none'}}
          >
            Active ({activeInvoices.length})
          </button>
          <button
            onClick={() => { setTab('history'); setSearchTerm('') }}
            style={{padding:'10px 20px', borderRadius:12, fontSize:13, fontWeight:600, cursor:'pointer', background: tab === 'history' ? 'rgba(255,255,255,0.1)' : 'transparent', color: tab === 'history' ? 'white' : '#6b7280', border:'none'}}
          >
            History ({paidInvoices.length})
          </button>
        </div>

        {/* Invoice List */}
        <div style={{background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:16, overflow:'hidden', marginBottom:12}}>
          <div style={{padding:'16px 24px', borderBottom:'1px solid rgba(255,255,255,0.08)', textAlign:'center'}}>
            <h2 style={{color:'white', fontWeight:700, fontSize:13, textTransform:'uppercase', letterSpacing:2}}>
              {tab === 'active' ? 'Unpaid Invoices' : 'Paid Invoices'}
            </h2>
          </div>
          {filteredInvoices.length === 0 ? (
            <div style={{padding:'60px 24px', textAlign:'center'}}>
              <p style={{color:'#6b7280', marginBottom:20}}>
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
          <p style={{color:'white', fontWeight:700, fontSize:18, marginBottom:8}}>Upgrade to Pro</p>
          <p style={{color:'#9ca3af', fontSize:14, marginBottom:20}}>Unlimited invoices, email sending & more</p>
          <button onClick={handleUpgrade} style={{width:'100%', background:'#4f46e5', color:'white', padding:'14px', borderRadius:12, fontWeight:700, fontSize:14, cursor:'pointer', border:'none'}}>
            $7/month →
          </button>
        </div>

      </div>
    </div>
  )
}