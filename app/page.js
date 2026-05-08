'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <div style={{minHeight:'100vh', background:'#0a0a0f', overflowX:'hidden'}}>
      <style>{`
        .stat-card {
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .stat-card:hover {
          border-color: rgba(124, 92, 252, 0.5) !important;
          box-shadow: 0 0 24px rgba(124, 92, 252, 0.15);
        }
        @media (max-width: 640px) {
          .lp-nav { padding: 14px 20px !important; }
          .lp-main { padding-left: 20px !important; padding-right: 20px !important; }
          .stat-grid { gap: 8px !important; }
          .stat-card { padding: 12px 8px !important; }
          .stat-value { font-size: 1.1rem !important; }
          .stat-label { font-size: 0.65rem !important; }
          .lp-cta-row { flex-direction: column !important; align-items: stretch !important; }
          .lp-cta-row a, .lp-cta-row button { text-align: center !important; }
        }
      `}</style>

      {/* Nav */}
      <nav className="lp-nav backdrop-blur-md" style={{position:'sticky', top:0, zIndex:50, background:'rgba(10,10,15,0.95)', borderBottom:'1px solid #2a2a3d', padding:'16px 48px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <Link href="/" className="text-white font-bold text-xl">BillMate</Link>
        <div style={{display:'flex', gap:'12px', alignItems:'center'}}>
          <Link href="/login" className="text-gray-400 hover:text-white text-sm transition" style={{padding:'8px 16px', whiteSpace:'nowrap'}}>Log in</Link>
          <Link href="/signup" className="text-white text-sm font-medium rounded-lg transition" style={{background:'#7c5cfc', padding:'9px 24px', whiteSpace:'nowrap'}}>
            Sign up
          </Link>
        </div>
      </nav>

      {/* Page content */}
      <main className="lp-main flex flex-col items-center pb-16 relative" style={{paddingTop:'64px', paddingLeft:'24px', paddingRight:'24px', overflowX:'hidden'}}>

        {/* Background glow effects */}
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#7c5cfc]/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-200px] left-1/4 w-[400px] h-[400px] bg-[#7c5cfc]/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Hero */}
        <div style={{width:'100%', maxWidth:672, position:'relative', zIndex:10, textAlign:'center'}}>

          {/* Hero headline glow */}
          <div style={{position:'absolute', top:'-40px', left:'50%', transform:'translateX(-50%)', width:'480px', height:'240px', background:'radial-gradient(ellipse at center, rgba(124,92,252,0.22) 0%, transparent 70%)', pointerEvents:'none', zIndex:0}} />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 border text-xs font-medium px-4 py-1.5 rounded-full mb-8" style={{background:'rgba(124,92,252,0.1)', borderColor:'rgba(124,92,252,0.25)', color:'#a78bfa', position:'relative', zIndex:1}}>
            <span style={{color:'#a78bfa', fontSize:'12px', lineHeight:1}}>✦</span>
            Built for Australian small businesses
          </div>

          <h1 className="font-bold text-white mb-5 leading-tight tracking-tight" style={{fontSize:'clamp(26px, 4.5vw, 40px)', position:'relative', zIndex:1}}>
            Get paid faster.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c5cfc] to-purple-400">
              Stress less.
            </span>
          </h1>

          <p className="text-gray-400 mb-10 leading-relaxed" style={{fontSize:'clamp(14px, 2vw, 17px)', position:'relative', zIndex:1, wordBreak:'break-word', overflowWrap:'break-word', maxWidth:'100%'}}>
            Create professional invoices in 30 seconds. Auto-calculate GST. Export to PDF. Track who owes you money.
          </p>

          <div className="lp-cta-row" style={{display:'flex', gap:'12px', justifyContent:'center', marginBottom:'80px', flexWrap:'wrap', position:'relative', zIndex:1}}>
            <Link href="/signup" className="text-white rounded-xl font-semibold transition text-base" style={{background:'#7c5cfc', padding:'12px 36px', whiteSpace:'nowrap'}}>
              Start for free
            </Link>
            <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="text-white rounded-xl font-medium transition text-base" style={{border:'1px solid rgba(255,255,255,0.25)', padding:'12px 36px', whiteSpace:'nowrap', cursor:'pointer', background:'transparent'}}>
              See how it works
            </button>
          </div>

          {/* Stats */}
          <div id="features" className="stat-grid grid grid-cols-3 gap-5" style={{marginBottom:'48px'}}>
            {[
              {value:'30s', label:'To create an invoice'},
              {value:'GST', label:'Auto calculated'},
              {value:'PDF', label:'One click export'},
            ].map(({value, label}) => (
              <div key={value} className="stat-card rounded-2xl border" style={{background:'#13131a', borderColor:'#2a2a3d', padding:'24px'}}>
                <p className="stat-value text-3xl font-bold text-white mb-1">{value}</p>
                <p className="stat-label text-gray-500 text-sm">{label}</p>
              </div>
            ))}
          </div>

          {/* Features */}
          <div style={{display:'grid', gridTemplateColumns:'1fr', gap:'16px', textAlign:'left'}}>
            {[
              {icon:'$', color:'#7c5cfc', title:'Track payments', desc:'See who has paid and who still owes you at a glance.'},
              {icon:'✓', color:'#a78bfa', title:'GST ready', desc:'Australian GST automatically calculated on every invoice.'},
              {icon:'↓', color:'#c4b5fd', title:'PDF export', desc:'Download or print professional invoices instantly.'},
              {icon:'∞', color:'#7c5cfc', title:'Free to start', desc:"Get started for free. Upgrade when you're ready to grow."},
            ].map(({icon, color, title, desc}) => (
              <div key={title} style={{background:'#13131a', border:'1px solid #2a2a3d', borderLeft:'3px solid #7c5cfc', borderRadius:'16px', padding:'20px 24px', display:'flex', alignItems:'flex-start', gap:'16px', boxSizing:'border-box', minWidth:0}}>
                <div style={{width:'40px', height:'40px', minWidth:'40px', background:'rgba(124,92,252,0.15)', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                  <span style={{color, fontWeight:'600', fontSize:'16px'}}>{icon}</span>
                </div>
                <div style={{minWidth:0}}>
                  <p style={{color:'#fff', fontWeight:'600', marginBottom:'4px', fontSize:'15px'}}>{title}</p>
                  <p style={{color:'#6b7280', fontSize:'14px', lineHeight:'1.6', margin:0, wordBreak:'break-word'}}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-gray-600 text-xs mt-12">No credit card required · Cancel anytime · Made in Australia</p>
          <p className="text-gray-600 text-xs mt-3">
            <a href="mailto:support@bill-mate.com.au?subject=BillMate%20Feedback" style={{color:'#6b7280', textDecoration:'underline', textDecorationColor:'rgba(107,114,128,0.4)'}}>Feedback? Contact us</a>
          </p>
        </div>
      </main>
    </div>
  )
}
