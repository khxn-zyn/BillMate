import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center p-8 pt-16 relative overflow-hidden">

      {/* Glow effects */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#7c5cfc]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-200px] left-1/4 w-[400px] h-[400px] bg-[#7c5cfc]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 flex justify-between items-center px-8 py-4 border-b border-[#2a2a3d] backdrop-blur-md z-10" style={{background:'rgba(10,10,15,0.85)'}}>
        <span className="text-white font-bold text-xl">BillMate</span>
        <div className="flex gap-3">
          <Link href="/dashboard" className="text-gray-400 hover:text-white text-sm transition px-4 py-2">Log in</Link>
          <Link href="/dashboard" className="text-white text-sm font-medium px-4 py-2 rounded-lg transition" style={{background:'#7c5cfc'}}>
            Get started free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-2xl w-full text-center relative z-10">
        <div className="inline-flex items-center gap-2 border text-xs font-medium px-4 py-1.5 rounded-full mb-8" style={{background:'rgba(124,92,252,0.1)', borderColor:'rgba(124,92,252,0.25)', color:'#a78bfa'}}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{background:'#7c5cfc'}}></span>
          Built for Australian small businesses
        </div>

        <h1 className="text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
          Get paid faster.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c5cfc] to-purple-400">
            Stress less.
          </span>
        </h1>

        <p className="text-gray-400 text-xl mb-10 leading-relaxed">
          Create professional invoices in 30 seconds. Auto-calculate GST. Export to PDF. Track who owes you money.
        </p>

        <div className="flex gap-3 justify-center mb-16">
          <Link href="/dashboard" className="text-white py-3 px-8 rounded-xl font-semibold transition text-base" style={{background:'#7c5cfc'}}>
            Start for free
          </Link>
          <Link href="/dashboard" className="border border-[#2a2a3d] hover:border-[#3a3a5c] text-white py-3 px-8 rounded-xl font-medium transition text-base hover:bg-white/5">
            See how it works
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-16">
          <div className="rounded-2xl p-5 border transition" style={{background:'#13131a', borderColor:'#2a2a3d'}}>
            <p className="text-3xl font-bold text-white mb-1">30s</p>
            <p className="text-gray-500 text-sm">To create an invoice</p>
          </div>
          <div className="rounded-2xl p-5 border transition" style={{background:'#13131a', borderColor:'#2a2a3d'}}>
            <p className="text-3xl font-bold text-white mb-1">GST</p>
            <p className="text-gray-500 text-sm">Auto calculated</p>
          </div>
          <div className="rounded-2xl p-5 border transition" style={{background:'#13131a', borderColor:'#2a2a3d'}}>
            <p className="text-3xl font-bold text-white mb-1">PDF</p>
            <p className="text-gray-500 text-sm">One click export</p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4 text-left">
          <div className="rounded-2xl p-5 border" style={{background:'#13131a', borderColor:'#2a2a3d'}}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{background:'rgba(124,92,252,0.15)'}}>
              <span className="text-sm" style={{color:'#7c5cfc'}}>$</span>
            </div>
            <p className="text-white font-medium mb-1">Track payments</p>
            <p className="text-gray-500 text-sm">See who has paid and who still owes you at a glance.</p>
          </div>
          <div className="rounded-2xl p-5 border" style={{background:'#13131a', borderColor:'#2a2a3d'}}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{background:'rgba(124,92,252,0.15)'}}>
              <span className="text-sm" style={{color:'#a78bfa'}}>✓</span>
            </div>
            <p className="text-white font-medium mb-1">GST ready</p>
            <p className="text-gray-500 text-sm">Australian GST automatically calculated on every invoice.</p>
          </div>
          <div className="rounded-2xl p-5 border" style={{background:'#13131a', borderColor:'#2a2a3d'}}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{background:'rgba(124,92,252,0.15)'}}>
              <span className="text-sm" style={{color:'#c4b5fd'}}>↓</span>
            </div>
            <p className="text-white font-medium mb-1">PDF export</p>
            <p className="text-gray-500 text-sm">Download or print professional invoices instantly.</p>
          </div>
          <div className="rounded-2xl p-5 border" style={{background:'#13131a', borderColor:'#2a2a3d'}}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{background:'rgba(124,92,252,0.15)'}}>
              <span className="text-sm" style={{color:'#7c5cfc'}}>∞</span>
            </div>
            <p className="text-white font-medium mb-1">Free to start</p>
            <p className="text-gray-500 text-sm">Get started for free. Upgrade when you're ready to grow.</p>
          </div>
        </div>

        <p className="text-gray-600 text-xs mt-10">No credit card required · Cancel anytime · Made in Australia</p>
      </div>
    </main>
  )
}
