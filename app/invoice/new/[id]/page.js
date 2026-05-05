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

  if (!inv) return <div className="p-8 text-center text-gray-400">Invoice not found</div>

  return (
    <main className="min-h-screen p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6 print:hidden">
        <button onClick={() => router.push('/dashboard')} className="text-sm text-gray-500 hover:text-gray-700 bg-transparent">Back</button>
        <div className="flex gap-3">
          <button onClick={markPaid} className={`text-sm px-4 py-2 rounded-xl font-medium ${inv.status === 'paid' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
            {inv.status === 'paid' ? 'Mark unpaid' : 'Mark paid'}
          </button>
          <button onClick={() => window.print()} className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-xl font-medium hover:bg-indigo-700 transition">
            Print / PDF
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Invoice</h1>
            <p className="text-gray-400 text-sm">{inv.num}</p>
          </div>
          <div className="text-right text-sm text-gray-500">
            <p className="font-semibold text-gray-800 text-base">{inv.bizName}</p>
            <p>{inv.bizEmail}</p>
            <p className="mt-2">Date: {inv.date}</p>
            <p>Due: {inv.due || 'On receipt'}</p>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-xs text-gray-400 uppercase mb-1">Bill to</p>
          <p className="font-medium">{inv.clientName}</p>
          <p className="text-sm text-gray-500">{inv.clientEmail}</p>
        </div>

        <table className="w-full text-sm mb-6">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left text-xs text-gray-400 font-medium pb-2">Description</th>
              <th className="text-left text-xs text-gray-400 font-medium pb-2">Qty</th>
              <th className="text-left text-xs text-gray-400 font-medium pb-2">Price</th>
              <th className="text-right text-xs text-gray-400 font-medium pb-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {inv.lines.map(l => (
              <tr key={l.id} className="border-b border-gray-50">
                <td className="py-3">{l.desc}</td>
                <td className="py-3">{l.qty}</td>
                <td className="py-3">${parseFloat(l.price || 0).toFixed(2)}</td>
                <td className="py-3 text-right">${((l.qty || 0) * (l.price || 0)).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-sm text-right space-y-1 mb-6">
          <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>${inv.subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between text-gray-500"><span>GST (10%)</span><span>${inv.gst.toFixed(2)}</span></div>
          <div className="flex justify-between font-semibold text-base mt-2 pt-2 border-t border-gray-100"><span>Total due</span><span>${inv.total.toFixed(2)}</span></div>
        </div>

        {inv.notes && (
          <div className="pt-4 border-t border-gray-100 text-sm text-gray-500">
            {inv.notes}
          </div>
        )}
      </div>
    </main>
  )
}