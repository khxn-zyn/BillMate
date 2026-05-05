import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center p-8 pt-16 relative overflow-hidden">
      
      {/* Glow effects */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-200px] left-1/4 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 flex justify-between items-center px-8 py-4 border-b border-white/5 backdrop-blur-md z-10">
        <span className="text-white font-bold text-xl">BillMate</span>
        <div className="flex gap-3">
          <Link href="/dashboard" className="text-gray-400 hover:text-white text-sm transition px-4 py-2">Log in</Link>
          <Link href="/dashboard" className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
            Get started free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-2xl w-full text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium px-4 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse inline-block"></span>
          Built for Australian small businesses
        </div>

        <h1 className="text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
          Get paid faster.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            Stress less.
          </span>
        </h1>

        <p className="text-gray-400 text-xl mb-10 leading-relaxed">
          Create professional invoices in 30 seconds. Auto-calculate GST. Export to PDF. Track who owes you money.
        </p>

        <div className="flex gap-3 justify-center mb-16">
          <Link href="/dashboard" className="bg-indigo-600 hover:bg-indigo-500 text-white py-3 px-8 rounded-xl font-semibold transition text-base">
            Start for free
          </Link>
          <Link href="/dashboard" className="border border-white/10 hover:border-white/20 text-white py-3 px-8 rounded-xl font-medium transition text-base hover:bg-white/5">
            See how it works
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-16">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 transition">
            <p className="text-3xl font-bold text-white mb-1">30s</p>
            <p className="text-gray-500 text-sm">To create an invoice</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 transition">
            <p className="text-3xl font-bold text-white mb-1">GST</p>
            <p className="text-gray-500 text-sm">Auto calculated</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 transition">
            <p className="text-3xl font-bold text-white mb-1">PDF</p>
            <p className="text-gray-500 text-sm">One click export</p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4 text-left">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-3">
              <span className="text-indigo-400 text-sm">$</span>
            </div>
            <p className="text-white font-medium mb-1">Track payments</p>
            <p className="text-gray-500 text-sm">See who has paid and who still owes you at a glance.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mb-3">
              <span className="text-purple-400 text-sm">✓</span>
            </div>
            <p className="text-white font-medium mb-1">GST ready</p>
            <p className="text-gray-500 text-sm">Australian GST automatically calculated on every invoice.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center mb-3">
              <span className="text-pink-400 text-sm">↓</span>
            </div>
            <p className="text-white font-medium mb-1">PDF export</p>
            <p className="text-gray-500 text-sm">Download or print professional invoices instantly.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mb-3">
              <span className="text-green-400 text-sm">∞</span>
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