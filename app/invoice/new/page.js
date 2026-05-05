'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewInvoice() {
  const router = useRouter()
  const [lines, setLines] = useState([{ id: 1, desc: '', qty: 1, price: '' }])
  const [form, setForm] = useState({
    bizName: '', bizEmail: '', clientName: '', clientEmail: '',
    num: 'INV-001', due: '', notes: ''
  })

  const updateForm = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const addLine = () => setLines(l => [...l, { id: Date.now(), desc: '', qty: 1, price: '' }])
  const removeLine = (id) => setLines(l => l.filter(x => x.id !== id))
  const updateLine = (id, k, v) => setLines(l => l.map(x => x.id === id ? { ...x, [k]: v } : x))

  const subtotal = lines.reduce((s, l) => s + ((parseFloat(l.qty) || 0) * (parseFloat(l.price) || 0)), 0)
  const gst = subtotal * 0.1
  const total = subtotal + gst

  const save = () => {
    if (!form.clientName) { alert('Please enter a client name'); return }
    const invoices = JSON.parse(localStorage.getItem('billmate_invoices') || '[]')
    const inv = { ...form, id: Date.now(), lines, subtotal, gst, total, status: 'unpaid', date: new Date().toISOString().split('T')[0] }
    invoices.unshift(inv)
    localStorage.setItem('billmate_invoices', JSON.stringify(invoices))
    router.push('/dashboard')
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] p-6 relative overflow-hidden">
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">New invoice</h1>
            <p className="text-gray-500 text-sm">Fill in the details below</p>
          </div>
          <button onClick={() => router.push('/dashboard')} className="text-sm text-gray-500 hover:text-white transition bg-transparent">
            ← Back
          </button>
        </div>

        {/* Business details */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Your details</p>
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Business name" value={form.bizName} onChange={e => updateForm('bizName', e.target.value)} className="bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-xl px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none" />
            <input placeholder="Your email" value={form.bizEmail} onChange={e => updateForm('bizEmail', e.target.value)} className="bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-xl px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none" />
          </div>
        </div>

        {/* Client details */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Client details</p>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <input placeholder="Client name" value={form.clientName} onChange={e => updateForm('clientName', e.target.value)} className="bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-xl px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none" />
            <input placeholder="Client email" value={form.clientEmail} onChange={e => updateForm('clientEmail', e.target.value)} className="bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-xl px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Invoice number" value={form.num} onChange={e => updateForm('num', e.target.value)} className="bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-xl px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none" />
            <input type="date" value={form.due} onChange={e => updateForm('due', e.target.value)} className="bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-xl px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none" />
          </div>
        </div>

        {/* Line items */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Line items</p>
          <div className="grid grid-cols-12 gap-2 mb-2 text-xs text-gray-600 px-1">
            <span className="col-span-6">Description</span>
            <span className="col-span-2">Qty</span>
            <span className="col-span-3">Price</span>
          </div>
          {lines.map(l => (
            <div key={l.id} className="grid grid-cols-12 gap-2 mb-2">
              <input className="col-span-6 bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-xl px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none" placeholder="Description" value={l.desc} onChange={e => updateLine(l.id, 'desc', e.target.value)} />
              <input className="col-span-2 bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-xl px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none" type="number" placeholder="1" value={l.qty} onChange={e => updateLine(l.id, 'qty', e.target.value)} />
              <input className="col-span-3 bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-xl px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none" type="number" placeholder="0.00" value={l.price} onChange={e => updateLine(l.id, 'price', e.target.value)} />
              <button onClick={() => removeLine(l.id)} className="col-span-1 text-gray-600 hover:text-red-400 bg-transparent text-lg leading-none transition">×</button>
            </div>
          ))}
          <button onClick={addLine} className="text-sm text-indigo-400 hover:text-indigo-300 bg-transparent mt-1 transition">+ Add item</button>

          <div className="mt-4 pt-4 border-t border-white/10 text-sm text-right space-y-1">
            <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-gray-500"><span>GST (10%)</span><span>${gst.toFixed(2)}</span></div>
            <div className="flex justify-between font-semibold text-white text-base mt-2"><span>Total</span><span>${total.toFixed(2)}</span></div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Notes</p>
          <textarea placeholder="Payment terms, bank details, thank you message..." value={form.notes} onChange={e => updateForm('notes', e.target.value)} rows={3} className="bg-white/5 border border-white/10 text-white placeholder-gray-600 rounded-xl px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none w-full resize-none" />
        </div>

        <button onClick={save} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-semibold transition text-base">
          Save invoice
        </button>
      </div>
    </main>
  )
}