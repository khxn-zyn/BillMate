'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function ShareInvoice({ params }) {
  const [invoice, setInvoice] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const load = async () => {
      const { id } = await params
      const supabase = createClient()
      const { data, error } = await supabase
        .from('invoices')
        .select('id, status, data')
        .eq('id', id)
        .single()

      if (error || !data) { setNotFound(true); setLoading(false); return }
      setInvoice({ ...data.data, id: data.id, status: data.status })
      setLoading(false)
    }
    load()
  }, [params])

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#f5f5fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ width: 28, height: 28, border: '2px solid rgba(124,92,252,0.3)', borderTop: '2px solid #7c5cfc', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
    </div>
  )

  if (notFound) return (
    <div style={{ minHeight: '100vh', background: '#f5f5fa', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, fontFamily: '-apple-system, sans-serif' }}>
      <p style={{ fontSize: '2rem' }}>🔍</p>
      <p style={{ fontWeight: 700, color: '#111827', fontSize: '1.1rem' }}>Invoice not found</p>
      <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>This link may be invalid or expired.</p>
    </div>
  )

  const d = invoice
  const isPaid = d.status === 'paid'

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5fa', padding: '48px 20px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      <style>{`@media print { .no-print { display: none !important; } body { background: #fff !important; } }`}</style>

      {/* Print button */}
      <div className="no-print" style={{ maxWidth: 680, margin: '0 auto 20px', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={() => window.print()}
          style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.1)', color: '#374151', fontWeight: 600, fontSize: 13, padding: '9px 18px', borderRadius: 8, cursor: 'pointer' }}
        >
          Print / Save PDF
        </button>
      </div>

      {/* Invoice card */}
      <div style={{ maxWidth: 680, margin: '0 auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', overflow: 'hidden' }}>

        {/* Purple header */}
        <div style={{ background: '#7c5cfc', padding: '28px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            {d.logoUrl ? (
              <img src={d.logoUrl} alt="Logo" style={{ height: 48, objectFit: 'contain', borderRadius: 6 }} />
            ) : (
              <p style={{ color: '#fff', fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.03em' }}>
                {d.bizName || 'BillMate'}
              </p>
            )}
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Invoice</p>
            <p style={{ color: '#fff', fontWeight: 800, fontSize: '1.2rem' }}>{d.num}</p>
            <span style={{
              display: 'inline-block', marginTop: 8,
              background: isPaid ? 'rgba(74,222,128,0.25)' : 'rgba(251,191,36,0.25)',
              color: isPaid ? '#86efac' : '#fde68a',
              fontWeight: 700, fontSize: '0.7rem', padding: '3px 12px', borderRadius: 999, letterSpacing: '0.08em'
            }}>
              {isPaid ? 'PAID' : 'UNPAID'}
            </span>
          </div>
        </div>

        <div style={{ padding: '36px 40px' }}>

          {/* From / To */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 32 }}>
            <div>
              <p style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9ca3af', marginBottom: 8 }}>From</p>
              <p style={{ fontWeight: 700, color: '#111827', fontSize: '0.95rem', marginBottom: 2 }}>{d.bizName || '—'}</p>
              <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>{d.bizEmail}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9ca3af', marginBottom: 8 }}>To</p>
              <p style={{ fontWeight: 700, color: '#111827', fontSize: '0.95rem', marginBottom: 2 }}>{d.clientName || '—'}</p>
              <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>{d.clientEmail}</p>
            </div>
          </div>

          {/* Dates */}
          {(d.date || d.due) && (
            <div style={{ display: 'flex', gap: 32, marginBottom: 32 }}>
              {d.date && (
                <div>
                  <p style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9ca3af', marginBottom: 4 }}>Issue date</p>
                  <p style={{ color: '#374151', fontSize: '0.88rem', fontWeight: 600 }}>{d.date}</p>
                </div>
              )}
              {d.due && (
                <div>
                  <p style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9ca3af', marginBottom: 4 }}>Due date</p>
                  <p style={{ color: '#374151', fontSize: '0.88rem', fontWeight: 600 }}>{d.due}</p>
                </div>
              )}
            </div>
          )}

          {/* Line items */}
          <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #e5e7eb', marginBottom: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1fr 1fr', background: '#f9fafb', padding: '10px 16px', borderBottom: '1px solid #e5e7eb' }}>
              {['Description', 'Qty', 'Unit price', 'Amount'].map(h => (
                <p key={h} style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9ca3af', margin: 0 }}>{h}</p>
              ))}
            </div>
            {(d.lines || []).map((line, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1fr 1fr', padding: '14px 16px', borderBottom: i < (d.lines.length - 1) ? '1px solid #f3f4f6' : 'none', alignItems: 'center', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                <p style={{ color: '#111827', fontSize: '0.9rem', fontWeight: 500, margin: 0 }}>{line.desc || '—'}</p>
                <p style={{ color: '#6b7280', fontSize: '0.88rem', margin: 0 }}>{line.qty}</p>
                <p style={{ color: '#6b7280', fontSize: '0.88rem', margin: 0 }}>${Number(line.price || 0).toFixed(2)}</p>
                <p style={{ color: '#111827', fontSize: '0.9rem', fontWeight: 600, margin: 0 }}>${(Number(line.qty || 0) * Number(line.price || 0)).toFixed(2)}</p>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div style={{ maxWidth: 260, marginLeft: 'auto', marginBottom: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <p style={{ color: '#6b7280', fontSize: '0.88rem', margin: 0 }}>Subtotal</p>
              <p style={{ color: '#374151', fontSize: '0.88rem', fontWeight: 600, margin: 0 }}>${Number(d.subtotal || 0).toFixed(2)}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid #e5e7eb' }}>
              <p style={{ color: '#6b7280', fontSize: '0.88rem', margin: 0 }}>GST (10%)</p>
              <p style={{ color: '#374151', fontSize: '0.88rem', fontWeight: 600, margin: 0 }}>${Number(d.gst || 0).toFixed(2)}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p style={{ color: '#111827', fontSize: '1rem', fontWeight: 800, margin: 0 }}>Total (AUD)</p>
              <p style={{ color: '#7c5cfc', fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>${Number(d.total || 0).toFixed(2)}</p>
            </div>
          </div>

          {/* Notes */}
          {d.notes && (
            <div style={{ background: '#f9fafb', borderRadius: 10, padding: '16px 20px', borderLeft: '3px solid #7c5cfc', marginBottom: 24 }}>
              <p style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9ca3af', marginBottom: 6 }}>Notes</p>
              <p style={{ color: '#374151', fontSize: '0.88rem', lineHeight: 1.7, margin: 0, whiteSpace: 'pre-line' }}>{d.notes}</p>
            </div>
          )}

          {/* Footer */}
          <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ color: '#9ca3af', fontSize: '0.78rem', margin: 0 }}>Thank you for your business.</p>
            <p style={{ color: '#9ca3af', fontSize: '0.78rem', margin: 0 }}>
              Powered by <span style={{ color: '#7c5cfc', fontWeight: 700 }}>BillMate</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
