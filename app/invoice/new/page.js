'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
    const invData = {
      ...form,
      lines,
      subtotal,
      gst,
      total,
      date: new Date().toISOString().split('T')[0],
    }
    const { error } = await supabase.from('invoices').insert({
      user_id: user.id,
      status: 'unpaid',
      data: invData,
    })
    if (!error) {
      router.push('/dashboard')
    } else {
      setSaveError('Failed to save invoice. Please check your connection and try again.')
      setSaving(false)
    }
  }

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: '12px 16px',
    color: 'white',
    fontSize: 14,
    outline: 'none',
  }

  const cardStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 24,
    marginBottom: 12,
  }

  const labelStyle = {
    color: '#6b7280',
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
    display: 'block',
  }

  return (
    <div style={{minHeight:'100vh', background:'#0a0a0f', display:'flex', flexDirection:'column', alignItems:'center', padding:'60px 20px'}}>
      <div style={{position:'fixed', top:-200, left:'50%', transform:'translateX(-50%)', width:600, height:600, background:'rgba(99,102,241,0.15)', borderRadius:'50%', filter:'blur(100px)', pointerEvents:'none'}} />

      <div style={{width:'100%', maxWidth:560, position:'relative', zIndex:10}}>

        {/* Header */}
        <div style={{textAlign:'center', marginBottom:40}}>
          <h1 style={{fontSize:36, fontWeight:700, color:'white', letterSpacing:'-1px'}}>New Invoice</h1>
          <p style={{color:'#6b7280', fontSize:15, marginTop:8}}>Fill in the details below</p>
        </div>

        {/* Business details */}
        <div style={cardStyle}>
          <p style={{...labelStyle, marginBottom:16}}>Your details</p>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
            <div>
              <label style={labelStyle}>Business name</label>
              <input style={inputStyle} placeholder="Acme Co." value={form.bizName} onChange={e => updateForm('bizName', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Your email</label>
              <input style={inputStyle} placeholder="you@example.com" value={form.bizEmail} onChange={e => updateForm('bizEmail', e.target.value)} />
            </div>
          </div>
        </div>

        {/* Client details */}
        <div style={cardStyle}>
          <p style={{...labelStyle, marginBottom:16}}>Client details</p>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:12}}>
            <div>
              <label style={labelStyle}>Client name</label>
              <input style={inputStyle} placeholder="Client name" value={form.clientName} onChange={e => updateForm('clientName', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Client email</label>
              <input style={inputStyle} placeholder="client@example.com" value={form.clientEmail} onChange={e => updateForm('clientEmail', e.target.value)} />
            </div>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
            <div>
              <label style={labelStyle}>Invoice number</label>
              <input style={inputStyle} placeholder="INV-001" value={form.num} onChange={e => updateForm('num', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Due date</label>
              <input style={{...inputStyle, colorScheme:'dark'}} type="date" value={form.due} onChange={e => updateForm('due', e.target.value)} />
            </div>
          </div>
        </div>

        {/* Line items */}
        <div style={cardStyle}>
          <p style={{...labelStyle, marginBottom:16}}>Line items</p>
          <div style={{display:'grid', gridTemplateColumns:'2fr 1fr 1fr 32px', gap:8, marginBottom:8}}>
            <span style={labelStyle}>Description</span>
            <span style={labelStyle}>Qty</span>
            <span style={labelStyle}>Price</span>
            <span></span>
          </div>
          {lines.map(l => (
            <div key={l.id} style={{display:'grid', gridTemplateColumns:'2fr 1fr 1fr 32px', gap:8, marginBottom:8}}>
              <input style={inputStyle} placeholder="Description" value={l.desc} onChange={e => updateLine(l.id, 'desc', e.target.value)} />
              <input style={inputStyle} type="number" placeholder="1" value={l.qty} onChange={e => updateLine(l.id, 'qty', e.target.value)} />
              <input style={inputStyle} type="number" placeholder="0.00" value={l.price} onChange={e => updateLine(l.id, 'price', e.target.value)} />
              <button onClick={() => removeLine(l.id)} style={{background:'transparent', color:'#ef4444', fontSize:18, cursor:'pointer', border:'none', padding:0}}>×</button>
            </div>
          ))}
          <button onClick={addLine} style={{background:'transparent', color:'#818cf8', fontSize:13, fontWeight:600, cursor:'pointer', border:'none', marginTop:8, padding:0}}>
            + Add item
          </button>

          {/* Totals */}
          <div style={{marginTop:20, paddingTop:16, borderTop:'1px solid rgba(255,255,255,0.08)'}}>
            <div style={{display:'flex', justifyContent:'space-between', color:'#6b7280', fontSize:13, marginBottom:6}}>
              <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', color:'#6b7280', fontSize:13, marginBottom:6}}>
              <span>GST (10%)</span><span>${gst.toFixed(2)}</span>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', color:'white', fontSize:16, fontWeight:700, marginTop:8, paddingTop:8, borderTop:'1px solid rgba(255,255,255,0.08)'}}>
              <span>Total</span><span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div style={cardStyle}>
          <label style={labelStyle}>Notes</label>
          <textarea
            placeholder="Payment terms, bank details, thank you message..."
            value={form.notes}
            onChange={e => updateForm('notes', e.target.value)}
            rows={3}
            style={{...inputStyle, resize:'vertical'}}
          />
        </div>

        {/* Buttons */}
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        {formError && <p style={{color:'#f87171', fontSize:13, background:'rgba(248,113,113,0.1)', border:'1px solid rgba(248,113,113,0.2)', borderRadius:12, padding:'12px 16px', marginBottom:8}}>{formError}</p>}
        {saveError && <p style={{color:'#f87171', fontSize:13, background:'rgba(248,113,113,0.1)', border:'1px solid rgba(248,113,113,0.2)', borderRadius:12, padding:'12px 16px', marginBottom:8}}>{saveError}</p>}
        <button
          onClick={save}
          disabled={saving}
          style={{width:'100%', background:'#4f46e5', color:'white', padding:'16px', borderRadius:16, fontWeight:700, fontSize:15, cursor:saving?'not-allowed':'pointer', border:'none', marginBottom:8, opacity:saving?0.7:1, display:'flex', alignItems:'center', justifyContent:'center', gap:10}}
        >
          {saving && <span style={{display:'inline-block', width:16, height:16, border:'2px solid rgba(255,255,255,0.35)', borderTop:'2px solid white', borderRadius:'50%', animation:'spin 0.7s linear infinite'}} />}
          {saving ? 'Saving…' : 'Save Invoice'}
        </button>
        <button onClick={() => router.push('/dashboard')} style={{width:'100%', background:'rgba(255,255,255,0.05)', color:'#6b7280', padding:'14px', borderRadius:16, fontWeight:600, fontSize:14, cursor:'pointer', border:'1px solid rgba(255,255,255,0.1)'}}>
          Cancel
        </button>

      </div>
    </div>
  )
}
