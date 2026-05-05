'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [invoices, setInvoices] = useState([])
  const router = useRouter()

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('billmate_invoices') || '[]')
    setInvoices(saved)
  }, [])

  const total = invoices.reduce((s, i) => s + (i.total || 0), 0)
  const paid = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + (i.total || 0), 0)
  const outstanding = total - paid

  const handleUpgrade = async () => {
    const response = await fetch('/api/checkout', { method: 'POST' })
    const data = await response.json()
    if (data.url) window.location.href = data.url
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] relative overflow-hidden flex justify-center">
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-3xl px-8 py-12 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white">BillMate</h1>
            <p className="text-gray-500 text-sm mt-1">Welcome back 👋</p>
          </div>
          <Link href="/invoice/new" className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition">
            + New invoice
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-xs text-gray-500 mb-2">Total invoiced</p>
            <p className="text-2xl font-semibold text-white">${total.toFixed(2)}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-xs text-gray-500 mb-2">Paid</p>
            <p className="text-2xl font-semibold text-green-400">${paid.toFixed(2)}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-xs text-gray-500 mb-2">Outstanding</p>
            <p className="text-2xl font-semibold text-amber-400">${outstanding.toFixed(2)}</p>
          </div>
        </div>

        {/* Upgrade banner */}
        <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-2xl p-5 mb-6 flex justify-between items-center">
          <div>
            <p className="text-white font-medium">Upgrade to Pro</p>
            <p className="text-gray-400 text-sm mt-1">Unlimited invoices, email sending & more</p>
          </div>
          <button onClick={handleUpgrade} className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition">
            $7/month →
          </button>
        </div>

        {/* Invoice list */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="font-medium text-white">Invoices</h2>
          </div>
          {invoices.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-500 text-sm mb-4">No invoices yet</p>
              <Link href="/invoice/new" className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition">
                Create your first invoice
              </Link>
            </div>
          ) : (
            invoices.map(inv => (
              <div
                key={inv.id}
                onClick={() => router.push(`/invoice/${inv.id}`)}
                className="flex items-center justify-between px-6 py-4 border-b border-white/5 hover:bg-white/5 transition cursor-pointer"
              >
                <div>
                  <p className="font-medium text-white text-sm">{inv.clientName}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{inv.num} · {inv.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${inv.status === 'paid' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>
                    {inv.status === 'paid' ? 'Paid' : 'Unpaid'}
                  </span>
                  <span className="font-medium text-white text-sm">${inv.total.toFixed(2)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  )
}