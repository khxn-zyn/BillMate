'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function NewInvoice() {
  const router = useRouter()
  const [lines, setLines] = useState([{ id: 1, desc: '', qty: 1, price: '' }])
  const [form, setForm] = useState({
    bizName: '', bizEmail: '', clientName: '', clientEmail: '',
    num: 'INV-001', due: '', notes: ''
  })
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [formError, setFormError] = useState('')

  const updateForm = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const addLine = () => setLines(l => [...l, { id: Date.now(), desc: '', qty: 1, price: '' }])
  const removeLine = (id) => setLines(l => l.filter(x => x.id !== id))
  const updateLine = (id, k, v) => setLines(l => l.map(x => x.id === id ? { ...x, [k]: v } : x))

  const subtotal = lines.reduce((s, l) => s + ((parseFloat(l.qty) || 0) * (parseFloat(l.price) || 0)), 0)
  const gst = subtotal * 0.1
  const total = subtotal + gst

  const save = async () => {
    setSaveError('')
    if (!form.clientName) { setFormError('Please enter a client name.'); return }
    setFormError('')
    setSaving(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const invData = { ...form, lines, subtotal, gst, total, date: new Date().toISOString().split('T')[0] }
    const { error } = await supabase.from('invoices').insert({ user_id: user.id, status: 'unpaid', data: invData })
    if (!error) {
      router.push('/dashboard')
    } else {
      setSaveError('Failed to save invoice. Please check your connection and try again.')
      setSaving(false)
    }
  }

  const inputStyle = {
    width: '100%',
    background: '#0d0d16',
    border: '1px solid #1e1e30',
    borderRadius: 10,
    padding: '11px 14px',
    color: 'white',
    fontSize: 14,
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  }

  const cardStyle = {
    background: '#13131a',
    border: '1px solid #1e1e30',
    borderRadius: 16,
    padding: 24,
    marginBottom: 10,
  }

  const labelStyle = {
    color: '#6b7280',
    fontSize: 10,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: 7,
    display: 'block',
  }

  const focusInput = (e) => e.target.style.borderColor = 'rgba(124,92,252,0.5)'
  const blurInput = (e) => e.target.style.borderColor = '#1e1e30'

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 20px 100px' }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ position: 'fixed', top: -150, left: '50%', transform: 'translateX(-50%)', width: 600, height: 500, background: 'radial-gradient(ellipse, rgba(124,92,252,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 560, position: 'relative', zIndex: 10 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <Link href="/" style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.04em', textDecoration: 'none' }}>
            <span style={{ color: '#fff' }}>Bill</span><span style={{ color: '#7c5cfc' }}>Mate</span>
          </Link>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginTop: 16, marginBottom: 4 }}>New Invoice</h1>
          <p style={{ color: '#6b7280', fontSize: 14 }}>Fill in the details below</p>
        </div>

        {/* Business details */}
        <div style={cardStyle}>
          <p style={{ ...labelStyle, marginBottom: 16, color: '#a78bfa' }}>Your details</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <label style={labelStyle}>Business name</label>
              <input style={inputStyle} placeholder="Acme Co." value={form.bizName} onChange={e => updateForm('bizName', e.target.value)} onFocus={focusInput} onBlur={blurInput} />
            </div>
            <div>
              <label style={labelStyle}>Your email</label>
              <input style={inputStyle} placeholder="you@example.com" value={form.bizEmail} onChange={e => updateForm('bizEmail', e.target.value)} onFocus={focusInput} onBlur={blurInput} />
            </div>
          </div>
        </div>

        {/* Client details */}
        <div style={cardStyle}>
          <p style={{ ...labelStyle, marginBottom: 16, color: '#a78bfa' }}>Client details</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
            <div>
              <label style={labelStyle}>Client name</label>
              <input style={inputStyle} placeholder="Client name" value={form.clientName} onChange={e => updateForm('clientName', e.target.value)} onFocus={focusInput} onBlur={blurInput} />
            </div>
            <div>
              <label style={labelStyle}>Client email</label>
              <input style={inputStyle} placeholder="client@example.com" value={form.clientEmail} onChange={e => updateForm('clientEmail', e.target.value)} onFocus={focusInput} onBlur={blurInput} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <label style={labelStyle}>Invoice number</label>
              <input style={inputStyle} placeholder="INV-001" value={form.num} onChange={e => updateForm('num', e.target.value)} onFocus={focusInput} onBlur={blurInput} />
            </div>
            <div>
              <label style={labelStyle}>Due date</label>
              <input style={{ ...inputStyle, colorScheme: 'dark' }} type="date" value={form.due} onChange={e => updateForm('due', e.target.value)} onFocus={focusInput} onBlur={blurInput} />
            </div>
          </div>
        </div>

        {/* Line items */}
        <div style={cardStyle}>
          <p style={{ ...labelStyle, marginBottom: 14, color: '#a78bfa' }}>Line items</p>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 28px', gap: 8, marginBottom: 6 }}>
            <span style={labelStyle}>Description</span>
            <span style={labelStyle}>Qty</span>
            <span style={labelStyle}>Price ($)</span>
            <span />
          </div>
          {lines.map(l => (
            <div key={l.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 28px', gap: 8, marginBottom: 8, alignItems: 'center' }}>
              <input style={inputStyle} placeholder="Description" value={l.desc} onChange={e => updateLine(l.id, 'desc', e.target.value)} onFocus={focusInput} onBlur={blurInput} />
              <input style={inputStyle} type="number" placeholder="1" value={l.qty} onChange={e => updateLine(l.id, 'qty', e.target.value)} onFocus={focusInput} onBlur={blurInput} />
              <input style={inputStyle} type="number" placeholder="0.00" value={l.price} onChange={e => updateLine(l.id, 'price', e.target.value)} onFocus={focusInput} onBlur={blurInput} />
              <button onClick={() => removeLine(l.id)} style={{ background: 'transparent', color: '#ef4444', fontSize: 18, cursor: 'pointer', border: 'none', padding: 0, lineHeight: 1 }}>×</button>
            </div>
          ))}
          <button onClick={addLine} style={{ background: 'transparent', color: '#7c5cfc', fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none', marginTop: 6, padding: 0 }}>
            + Add item
          </button>

          {/* Totals */}
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #1e1e30' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280', fontSize: 13, marginBottom: 7 }}>
              <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280', fontSize: 13, marginBottom: 7 }}>
              <span>GST (10%)</span><span>${gst.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: 16, fontWeight: 800, marginTop: 10, paddingTop: 10, borderTop: '1px solid #1e1e30' }}>
              <span>Total</span><span style={{ color: '#7c5cfc' }}>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div style={cardStyle}>
          <label style={{ ...labelStyle, color: '#a78bfa' }}>Notes</label>
          <textarea
            placeholder="Payment terms, bank details, thank you message..."
            value={form.notes}
            onChange={e => updateForm('notes', e.target.value)}
            rows={3}
            style={{ ...inputStyle, resize: 'vertical' }}
            onFocus={focusInput}
            onBlur={blurInput}
          />
        </div>

        {/* Errors */}
        {formError && <p style={{ color: '#f87171', fontSize: 13, background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: 10, padding: '11px 16px', marginBottom: 8 }}>{formError}</p>}
        {saveError && <p style={{ color: '#f87171', fontSize: 13, background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: 10, padding: '11px 16px', marginBottom: 8 }}>{saveError}</p>}

        {/* Buttons */}
        <button
          onClick={save}
          disabled={saving}
          style={{ width: '100%', background: '#7c5cfc', color: 'white', padding: '15px', borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: saving ? 'not-allowed' : 'pointer', border: 'none', marginBottom: 8, opacity: saving ? 0.75 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, transition: 'background 0.2s' }}
          onMouseEnter={e => { if (!saving) e.currentTarget.style.background = '#6a4ae8' }}
          onMouseLeave={e => e.currentTarget.style.background = '#7c5cfc'}
        >
          {saving && <span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(255,255,255,0.35)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />}
          {saving ? 'Saving…' : 'Save Invoice'}
        </button>

        <Link href="/dashboard" style={{ display: 'block', width: '100%', background: 'transparent', color: '#6b7280', padding: '13px', borderRadius: 12, fontWeight: 600, fontSize: 14, border: '1px solid #1e1e30', textAlign: 'center', textDecoration: 'none', boxSizing: 'border-box' }}>
          Cancel
        </Link>

      </div>
    </div>
  )
}
