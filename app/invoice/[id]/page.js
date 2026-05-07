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

  if (!inv) return <div style={{minHeight:'100vh', background:'#0a0a0f', display:'flex', alignItems:'center', justifyContent:'center', color:'#9ca3af'}}>Invoice not found</div>

  return (
    <div style={{minHeight:'100vh', background:'#0a0a0f', position:'relative', overflow:'hidden', display:'flex', justifyContent:'center'}} className="p-4 sm:p-10">
      <div style={{position:'fixed', top:-200, left:'50%', transform:'translateX(-50%)', width:600, height:600, background:'rgba(99,102,241,0.1)', borderRadius:'50%', filter:'blur(120px)', pointerEvents:'none'}} />

      <div style={{width:'100%', maxWidth:768, position:'relative', zIndex:10}} className="py-8 sm:py-12">
        {/* Action buttons - hidden on print */}
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:32}} className="print:hidden">
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
        <style>{`
          .inv-accent { color: #7c5cfc !important; }
        `}</style>
        <div id="invoice-doc" className="bg-white text-black rounded-none shadow-2xl" style={{padding:'40px'}}>

          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start mb-10 gap-4">
            <div>
              <p className="text-xl font-bold text-gray-800">{inv.bizName || 'Your Business'}</p>
              <p className="text-sm text-gray-500 mt-1">{inv.bizEmail}</p>
            </div>
            <div className="sm:text-right">
              <h1 className="text-4xl font-bold tracking-widest inv-accent">INVOICE</h1>
            </div>
          </div>

          {/* Bill to + invoice details */}
          <div className="flex flex-col sm:flex-row justify-between mb-10 gap-6">
            <div>
              <p className="text-xs font-bold uppercase mb-2 inv-accent">Bill To</p>
              <p className="text-lg font-semibold text-gray-800">{inv.clientName}</p>
              <p className="text-sm text-gray-500">{inv.clientEmail}</p>
            </div>
            <div className="sm:text-right">
              <table className="text-sm">
  <tbody>
    <tr>
      <td className="font-semibold py-1 inv-accent" style={{paddingRight: '2rem'}}>Invoice #</td>
      <td className="text-gray-700">{inv.num}</td>
    </tr>
    <tr>
      <td className="font-semibold py-1 inv-accent" style={{paddingRight: '2rem'}}>Invoice date</td>
      <td className="text-gray-700">{inv.date}</td>
    </tr>
    <tr>
      <td className="font-semibold py-1 inv-accent" style={{paddingRight: '2rem'}}>Due date</td>
      <td className="text-gray-700">{inv.due || 'On receipt'}</td>
    </tr>
  </tbody>
</table>
            </div>
          </div>

          {/* Line items table */}
          <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm" style={{minWidth:400}}>
            <thead>
              <tr className="text-white" style={{backgroundColor: '#a78bfa'}}>
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
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-full sm:w-64">
              <div className="flex justify-between py-2 text-sm text-gray-600 border-b border-gray-100">
                <span>Subtotal</span>
                <span>${inv.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 text-sm text-gray-600 border-b border-gray-100">
                <span>GST (10%)</span>
                <span>${inv.gst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 font-bold text-base inv-accent">
                <span>Total (AUD)</span>
                <span>${inv.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {inv.notes && (
            <div className="border-t border-gray-100 pt-6">
              <p className="text-xs font-bold uppercase mb-2 inv-accent">Notes</p>
              <p className="text-sm text-gray-600">{inv.notes}</p>
            </div>
          )}

          {/* Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-10 pt-6 border-t border-gray-100 gap-2">
            <p className="text-xs text-gray-400">Thank you for your business!</p>
            <p className="text-lg font-bold inv-accent">BillMate</p>
          </div>
        </div>
      </div>
    </div>
  )
}