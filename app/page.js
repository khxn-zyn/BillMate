'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <div style={{minHeight:'100vh', background:'#0a0a0f'}}>
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
      <main className="lp-main flex flex-col items-center pb-16 relative" style={{paddingTop:'96px', paddingLeft:'24px', paddingRight:'24px'}}>

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
            Made in Australia, for Australian tradies
          </div>

          <h1 className="font-bold text-white mb-5 leading-tight tracking-tight" style={{fontSize:'clamp(28px, 5vw, 48px)', position:'relative', zIndex:1}}>
            Invoicing built for<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c5cfc] to-purple-400">
              Australian tradies.
            </span>
          </h1>

          <p className="text-gray-400 mb-10 leading-relaxed" style={{fontSize:'clamp(15px, 2vw, 18px)', position:'relative', zIndex:1, wordBreak:'break-word', overflowWrap:'break-word', maxWidth:'100%'}}>
            Quote on-site, convert to an invoice in one tap, and get paid faster — with GST sorted automatically. No accountant needed.
          </p>

          <div className="lp-cta-row" style={{display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap', position:'relative', zIndex:1, marginTop:'20px'}}>
            <Link href="/signup" className="text-white rounded-xl font-semibold transition text-base" style={{background:'#7c5cfc', padding:'12px 36px', whiteSpace:'nowrap'}}>
              Try BillMate Free
            </Link>
            <button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} className="text-white rounded-xl font-medium transition text-base" style={{border:'1px solid rgba(255,255,255,0.25)', padding:'12px 36px', whiteSpace:'nowrap', cursor:'pointer', background:'transparent'}}>
              See how it works
            </button>
          </div>

          <p className="text-gray-500 text-sm" style={{position:'relative', zIndex:1, marginTop:'20px', marginBottom:'80px'}}>
            Australian-owned&nbsp;&nbsp;•&nbsp;&nbsp;Free to start&nbsp;&nbsp;•&nbsp;&nbsp;No credit card needed
          </p>

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

          {/* How it works */}
          <div id="how-it-works" style={{marginTop:'80px', marginBottom:'48px'}}>
            <h2 style={{color:'#fff', fontWeight:'700', fontSize:'clamp(20px, 3vw, 28px)', marginBottom:'8px', textAlign:'center'}}>
              How it works
            </h2>
            <p style={{color:'#6b7280', fontSize:'15px', textAlign:'center', marginBottom:'40px'}}>
              From job site to payment in three steps.
            </p>
            <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>
              {[
                {step:'1', title:'Create a quote on-site', desc:'Fill in the job details and send a professional quote before you leave the driveway.'},
                {step:'2', title:'Convert it to an invoice in one tap', desc:"Once the job's done, hit convert. Your quote becomes a tax invoice — GST and all."},
                {step:'3', title:'Get paid faster', desc:'Send the invoice by email or link. See exactly who has paid and chase what\'s outstanding.'},
              ].map(({step, title, desc}) => (
                <div key={step} style={{background:'#13131a', border:'1px solid #2a2a3d', borderRadius:'16px', padding:'24px', display:'flex', alignItems:'flex-start', gap:'20px'}}>
                  <div style={{width:'40px', height:'40px', minWidth:'40px', background:'rgba(124,92,252,0.15)', border:'1px solid rgba(124,92,252,0.3)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                    <span style={{color:'#7c5cfc', fontWeight:'700', fontSize:'16px'}}>{step}</span>
                  </div>
                  <div style={{minWidth:0}}>
                    <p style={{color:'#fff', fontWeight:'600', fontSize:'15px', marginBottom:'6px'}}>{title}</p>
                    <p style={{color:'#6b7280', fontSize:'14px', lineHeight:'1.6', margin:0}}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Who it's for */}
          <div style={{marginTop:'80px', marginBottom:'48px'}}>
            <h2 style={{color:'#fff', fontWeight:'700', fontSize:'clamp(20px, 3vw, 28px)', marginBottom:'8px', textAlign:'center'}}>
              Who it&apos;s for
            </h2>
            <p style={{color:'#6b7280', fontSize:'15px', textAlign:'center', marginBottom:'40px'}}>
              Built for any tradie who wants to get paid on time.
            </p>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(160px, 1fr))', gap:'16px'}}>
              {[
                {initial:'B', trade:'Builders',      line:'Quote jobs and invoice before you leave the site.'},
                {initial:'E', trade:'Electricians',  line:'Log callouts, parts, and labour in seconds.'},
                {initial:'P', trade:'Plumbers',      line:'From service call to paid invoice, fast.'},
                {initial:'L', trade:'Landscapers',   line:'Quote ongoing work and one-off jobs easily.'},
                {initial:'C', trade:'Contractors',   line:'Keep every job tracked and every invoice sent.'},
                {initial:'H', trade:'Handymen',      line:'No job too small — quote and invoice any fix-up fast.'},
              ].map(({initial, trade, line}) => (
                <div key={trade} className="stat-card" style={{background:'#13131a', border:'1px solid #2a2a3d', borderRadius:'16px', padding:'20px', display:'flex', flexDirection:'column', gap:'12px'}}>
                  <div style={{width:'40px', height:'40px', background:'rgba(124,92,252,0.15)', border:'1px solid rgba(124,92,252,0.3)', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                    <span style={{color:'#7c5cfc', fontWeight:'700', fontSize:'15px'}}>{initial}</span>
                  </div>
                  <div>
                    <p style={{color:'#fff', fontWeight:'600', fontSize:'15px', marginBottom:'4px'}}>{trade}</p>
                    <p style={{color:'#6b7280', fontSize:'13px', lineHeight:'1.6', margin:0}}>{line}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Founder section */}
          <div style={{marginTop:'80px', marginBottom:'48px', background:'#13131a', border:'1px solid #2a2a3d', borderRadius:'20px', padding:'32px'}}>
            <div style={{display:'flex', alignItems:'center', gap:'16px', marginBottom:'20px'}}>
              <div style={{width:'48px', height:'48px', minWidth:'48px', background:'rgba(124,92,252,0.15)', border:'1px solid rgba(124,92,252,0.3)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <span style={{color:'#7c5cfc', fontWeight:'700', fontSize:'18px'}}>K</span>
              </div>
              <div>
                <p style={{color:'#fff', fontWeight:'600', fontSize:'15px', margin:0}}>Khenz</p>
                <p style={{color:'#6b7280', fontSize:'13px', margin:0}}>Founder, BillMate</p>
              </div>
            </div>
            <p style={{color:'#d1d5db', fontSize:'15px', lineHeight:'1.8', marginBottom:'16px'}}>
              I built BillMate because I was sick of watching tradies get slugged by overpriced invoicing software designed for office workers, not people on the tools.
            </p>
            <p style={{color:'#d1d5db', fontSize:'15px', lineHeight:'1.8', marginBottom:'24px'}}>
              BillMate is simple, fast, and built specifically for Australian tradies. No bloat, no lock-in, no nonsense. Just quote, invoice, and get paid.
            </p>
            <div style={{borderTop:'1px solid #2a2a3d', paddingTop:'20px', display:'flex', flexWrap:'wrap', gap:'16px', alignItems:'center'}}>
              <span style={{background:'rgba(124,92,252,0.1)', border:'1px solid rgba(124,92,252,0.25)', color:'#a78bfa', fontSize:'12px', fontWeight:'500', padding:'4px 12px', borderRadius:'999px'}}>
                Australian-owned
              </span>
              <span style={{color:'#4b5563', fontSize:'13px'}}>ABN 46 849 678 875</span>
            </div>
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
