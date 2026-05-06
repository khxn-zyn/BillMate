'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewInvoice() {
  const router = useRouter()
  const [invoice, setInvoice] = useState({
    clientName: '',
    clientEmail: '',
    date: new Date().toISOString().split('T')[0],
    num: 'INV-001',
    items: [{ id: 1, description: '', qty: 1, price: 0 }],
    notes: ''
  })

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [...invoice.items, { id: Date.now(), description: '', qty: 1, price: 0 }]
    })
  }

  const updateItem = (id, field, value) => {
    const newItems = invoice.items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    )
    setInvoice({ ...invoice, items: newItems })
  }

  const subtotal = invoice.items.reduce((acc, item) => acc + (item.qty * item.price), 0)
  const gst = subtotal * 0.1
  const total = subtotal + gst

  const saveInvoice = () => {
    const saved = JSON.parse(localStorage.getItem('billmate_invoices') || '[]')
    const newInv = { ...invoice, id: Date.now(), total: total, status: 'unpaid' }
    localStorage.setItem('billmate_invoices', JSON.stringify([newInv, ...saved]))
    router.push('/dashboard')
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white py-20 px-6">
      {/* Centered Container */}
      <div className="max-w-3xl mx-auto">
        
        {/* Header Area */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">New invoice</h1>
            <p className="text-gray-500 mt-1">Fill in the details below</p>
          </div>
          <Link href="/dashboard" className="text-gray-500 hover:text-white transition text-sm flex items-center gap-2">
            ← Back
          </Link>
        </div>

        <div className="space-y-6">
          {/* Your Details */}
          <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Your Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Business name" className="bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-indigo-500 transition" />
              <input type="email" placeholder="Your email" className="bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-indigo-500 transition" />
            </div>
          </section>

          {/* Client Details */}
          <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Client Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input 
                type="text" 
                placeholder="Client name" 
                className="bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-indigo-500 transition"
                onChange={(e) => setInvoice({...invoice, clientName: e.target.value})}
              />
              <input 
                type="email" 
                placeholder="Client email" 
                className="bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-indigo-500 transition"
                onChange={(e) => setInvoice({...invoice, clientEmail: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" 
                value={invoice.num}
                className="bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-indigo-500 transition"
                onChange={(e) => setInvoice({...invoice, num: e.target.value})}
              />
              <input 
                type="date" 
                value={invoice.date}
                className="bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-indigo-500 transition text-white"
                onChange={(e) => setInvoice({...invoice, date: e.target.value})}
              />
            </div>
          </section>

          {/* Line Items */}
          <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Line Items</h2>
            {invoice.items.map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-4 mb-4 items-center">
                <div className="col-span-6">
                  <input 
                    type="text" 
                    placeholder="Description" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-indigo-500 transition"
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <input 
                    type="number" 
                    value={item.qty}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-indigo-500 transition text-center"
                    onChange={(e) => updateItem(item.id, 'qty', parseInt(e.target.value))}
                  />
                </div>
                <div className="col-span-3">
                  <input 
                    type="number" 
                    placeholder="0.00"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-indigo-500 transition"
                    onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value))}
                  />
                </div>
                <div className="col-span-1 text-right">
                  <button className="text-gray-600 hover:text-red-500 transition">×</button>
                </div>
              </div>
            ))}
            <button 
              onClick={addItem}
              className="text-indigo-400 hover:text-indigo-300 font-bold text-sm mt-2"
            >
              + Add item
            </button>

            {/* Totals Section */}
            <div className="mt-10 pt-10 border-t border-white/10 space-y-3">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>GST (10%)</span>
                <span>${gst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-2xl font-bold text-white pt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </section>

          {/* Notes */}
          <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Notes</h2>
            <textarea 
              placeholder="Payment terms, bank details, thank you message..."
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-indigo-500 transition resize-none"
              onChange={(e) => setInvoice({...invoice, notes: e.target.value})}
            />
          </section>

          <button 
            onClick={saveInvoice}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-5 rounded-2xl transition shadow-xl shadow-indigo-500/20 text-lg"
          >
            Save invoice
          </button>
        </div>
      </div>
    </main>
  )
}