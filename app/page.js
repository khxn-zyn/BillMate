import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center px-6 pb-16 relative overflow-hidden" style={{paddingTop:'96px'}}>

      {/* Glow effects */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#7c5cfc]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-200px] left-1/4 w-[400px] h-[400px] bg-[#7c5cfc]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 backdrop-blur-md z-10" style={{background:'rgba(10,10,15,0.85)', borderBottom:'1px solid #2a2a3d', padding:'16px 48px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <Link href="/" className="text-white font-bold text-xl">BillMate</Link>
        <div style={{display:'flex', gap:'12px', alignItems:'center'}}>
          <Link href="/dashboard" className="text-gray-400 hover:text-white text-sm transition" style={{padding:'8px 16px', whiteSpace:'nowrap'}}>Log in</Link>
          <Link href="/dashboard" className="text-white text-sm font-medium rounded-lg transition" style={{background:'#7c5cfc', padding:'9px 24px', whiteSpace:'nowrap'}}>
            Sign up
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-2xl w-full text-center relative z-10">
        <div className="inline-flex items-center gap-2 border text-xs font-medium px-4 py-1.5 rounded-full mb-8" style={{background:'rgba(124,92,252,0.1)', borderColor:'rgba(124,92,252,0.25)', color:'#a78bfa'}}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{background:'#7c5cfc'}}></span>
          Built for Australian small businesses
        </div>

        <h1 className="font-bold text-white mb-5 leading-tight tracking-tight" style={{fontSize:'clamp(26px, 4.5vw, 40px)'}}>
          Get paid faster.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c5cfc] to-purple-400">
            Stress less.
          </span>
        </h1>

        <p className="text-gray-400 mb-10 leading-relaxed" style={{fontSize:'clamp(14px, 2vw, 17px)'}}>
          Create professional invoices in 30 seconds. Auto-calculate GST. Export to PDF. Track who owes you money.
        </p>

        <div style={{display:'flex', gap:'12px', justifyContent:'center', marginBottom:'80px', flexWrap:'wrap'}}>
          <Link href="/dashboard" className="text-white rounded-xl font-semibold transition text-base" style={{background:'#7c5cfc', padding:'12px 36px', whiteSpace:'nowrap'}}>
            Start for free
          </Link>
          <Link href="/dashboard" className="text-white rounded-xl font-medium transition text-base" style={{border:'1px solid #2a2a3d', padding:'12px 36px', whiteSpace:'nowrap'}}>
            See how it works
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-5 mb-20">
          <div className="rounded-2xl border transition" style={{background:'#13131a', borderColor:'#2a2a3d', padding:'24px'}}>
            <p className="text-3xl font-bold text-white mb-1">30s</p>
            <p className="text-gray-500 text-sm">To create an invoice</p>
          </div>
          <div className="rounded-2xl border transition" style={{background:'#13131a', borderColor:'#2a2a3d', padding:'24px'}}>
            <p className="text-3xl font-bold text-white mb-1">GST</p>
            <p className="text-gray-500 text-sm">Auto calculated</p>
          </div>
          <div className="rounded-2xl border transition" style={{background:'#13131a', borderColor:'#2a2a3d', padding:'24px'}}>
            <p className="text-3xl font-bold text-white mb-1">PDF</p>
            <p className="text-gray-500 text-sm">One click export</p>
          </div>
        </div>

        {/* Features */}
        <div style={{display:'grid', gridTemplateColumns:'1fr', gap:'16px', textAlign:'left'}}>
          {[
            {icon:'$', color:'#7c5cfc', title:'Track payments', desc:'See who has paid and who still owes you at a glance.'},
            {icon:'✓', color:'#a78bfa', title:'GST ready', desc:'Australian GST automatically calculated on every invoice.'},
            {icon:'↓', color:'#c4b5fd', title:'PDF export', desc:'Download or print professional invoices instantly.'},
            {icon:'∞', color:'#7c5cfc', title:'Free to start', desc:"Get started for free. Upgrade when you're ready to grow."},
          ].map(({icon, color, title, desc}) => (
            <div key={title} style={{background:'#13131a', border:'1px solid #2a2a3d', borderRadius:'16px', padding:'20px 24px', display:'flex', alignItems:'flex-start', gap:'16px'}}>
              <div style={{width:'40px', height:'40px', minWidth:'40px', background:'rgba(124,92,252,0.15)', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                <span style={{color, fontWeight:'600', fontSize:'16px'}}>{icon}</span>
              </div>
              <div>
                <p style={{color:'#fff', fontWeight:'600', marginBottom:'4px', fontSize:'15px'}}>{title}</p>
                <p style={{color:'#6b7280', fontSize:'14px', lineHeight:'1.6', margin:0}}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-gray-600 text-xs mt-12">No credit card required · Cancel anytime · Made in Australia</p>
      </div>
    </main>
  )
}
