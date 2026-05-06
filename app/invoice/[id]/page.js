'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function ViewInvoice() {
  const { id } = useParams()
  const router = useRouter()
  const [inv, setInv] = useState(null)

  useEffect(() => {
    const invoices = JSON.parse(localStorage.getItem('billmate_invoices') || '[]')
    const found = invoices.find(i => String(i.id) === String(id))
    setInv(found)
  }, [id])

  const markPaid = () => {
    const invoices = JSON.parse(localStorage.getItem('billmate_invoices') || '[]')
    const updated = invoices.map(i => String(i.id) === String(id) ? { ...i, status: i.status === 'paid' ? 'unpaid' : 'paid' } : i)
    localStorage.setItem('billmate_invoices', JSON.stringify(updated))
    setInv(v => ({ ...v, status: v.status === 'paid' ? 'unpaid' : 'paid' }))
  }

  const deleteInvoice = () => {
    if (confirm('Delete this invoice?')) {
      const invoices = JSON.parse(localStorage.getItem('billmate_invoices') || '[]')
      localStorage.setItem('billmate_invoices', JSON.stringify(invoices.filter(i => String(i.id) !== String(id))))
      router.push('/dashboard')
    }
  }

  if (!inv) return <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center text-gray-400">Invoice not found</div>

  return (
    <main className="min-h-screen bg-[#0a0a0f] p-6 relative overflow-hidden flex justify-center">
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-3xl px-8 py-12 relative z-10">
        {/* Action buttons - hidden on print */}
        <div className="flex justify-between items-center mb-8 print:hidden">
          <button onClick={() => router.push('/dashboard')} className="text-sm text-gray-500 hover:text-white transition bg-transparent">
            ← Back
          </button>
          <div className="flex gap-3">
            <button onClick={markPaid} className={`text-sm px-4 py-2 rounded-xl font-medium transition ${inv.status === 'paid' ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30' : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'}`}>
              {inv.status === 'paid' ? 'Mark unpaid' : 'Mark paid'}
            </button>
            <button onClick={() => window.print()} className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-4 py-2 rounded-xl font-medium transition">
              Print / PDF
            </button>
            <button onClick={deleteInvoice} className="bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm px-4 py-2 rounded-xl font-medium transition">
              Delete
            </button>
          </div>
        </div>

        {/* Invoice document */}
        <div id="invoice-doc" className="bg-white text-black p-12 rounded-none shadow-2xl">
          
          {/* Header */}
          <div className="flex justify-between items-start mb-10">
            <div>
              <p className="text-xl font-bold text-gray-800">{inv.bizName || 'Your Business'}</p>
              <p className="text-sm text-gray-500 mt-1">{inv.bizEmail}</p>
            </div>
            <div className="text-right">
              <h1 className="text-4xl font-bold text-indigo-600 tracking-widest">INVOICE</h1>
            </div>
          </div>

          {/* Bill to + invoice details */}
          <div className="flex justify-between mb-10">
            <div>
              <p className="text-xs font-bold text-indigo-600 uppercase mb-2">Bill To</p>
              <p className="text-lg font-semibold text-gray-800">{inv.clientName}</p>
              <p className="text-sm text-gray-500">{inv.clientEmail}</p>
            </div>
            <div className="text-right">
              <table className="text-sm">
  <tbody>
    <tr>
      <td className="text-indigo-600 font-semibold py-1" style={{paddingRight: '2rem'}}>Invoice #</td>
      <td className="text-gray-700">{inv.num}</td>
    </tr>
    <tr>
      <td className="text-indigo-600 font-semibold py-1" style={{paddingRight: '2rem'}}>Invoice date</td>
      <td className="text-gray-700">{inv.date}</td>
    </tr>
    <tr>
      <td className="text-indigo-600 font-semibold py-1" style={{paddingRight: '2rem'}}>Due date</td>
      <td className="text-gray-700">{inv.due || 'On receipt'}</td>
    </tr>
  </tbody>
</table>
            </div>
          </div>

          {/* Line items table */}
          <table className="w-full mb-8 text-sm">
            <thead>
              <tr className="text-white" style={{backgroundColor: '#60a5fa'}}>
                <th className="text-left py-3 px-4 font-semibold">QTY</th>
                <th className="text-left py-3 px-4 font-semibold">Description</th>
                <th className="text-right py-3 px-4 font-semibold">Unit Price</th>
                <th className="text-right py-3 px-4 font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              {inv.lines.map((l, i) => (
                <tr key={l.id} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-3 px-4 text-gray-700">{l.qty}</td>
                  <td className="py-3 px-4 text-gray-700">{l.desc}</td>
                  <td className="py-3 px-4 text-right text-gray-700">${parseFloat(l.price || 0).toFixed(2)}</td>
                  <td className="py-3 px-4 text-right text-gray-700">${((l.qty || 0) * (l.price || 0)).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-64">
              <div className="flex justify-between py-2 text-sm text-gray-600 border-b border-gray-100">
                <span>Subtotal</span>
                <span>${inv.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 text-sm text-gray-600 border-b border-gray-100">
                <span>GST (10%)</span>
                <span>${inv.gst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 font-bold text-indigo-600 text-base">
                <span>Total (AUD)</span>
                <span>${inv.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {inv.notes && (
            <div className="border-t border-gray-100 pt-6">
              <p className="text-xs font-bold text-indigo-600 uppercase mb-2">Notes</p>
              <p className="text-sm text-gray-600">{inv.notes}</p>
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-400">Thank you for your business!</p>
            <p className="text-lg font-bold text-indigo-600">BillMate</p>
          </div>
        </div>
      </div>
    </main>
  )
}