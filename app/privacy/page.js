import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy — BillMate',
  description: 'How BillMate collects, uses, and protects your personal information.',
}

const Section = ({ title, children }) => (
  <div style={{marginBottom:'40px'}}>
    <h2 style={{color:'#fff', fontWeight:'600', fontSize:'18px', marginBottom:'12px'}}>{title}</h2>
    <div style={{color:'#9ca3af', fontSize:'15px', lineHeight:'1.8'}}>{children}</div>
  </div>
)

export default function PrivacyPolicy() {
  return (
    <div style={{minHeight:'100vh', background:'#0a0a0f'}}>

      {/* Nav */}
      <nav style={{position:'sticky', top:0, zIndex:50, background:'rgba(10,10,15,0.95)', borderBottom:'1px solid #2a2a3d', padding:'16px 48px', display:'flex', justifyContent:'space-between', alignItems:'center', backdropFilter:'blur(12px)'}}>
        <Link href="/" style={{color:'#fff', fontWeight:'700', fontSize:'20px', textDecoration:'none'}}>BillMate</Link>
        <div style={{display:'flex', gap:'12px', alignItems:'center'}}>
          <Link href="/login" style={{color:'#9ca3af', fontSize:'14px', textDecoration:'none', padding:'8px 16px'}}>Log in</Link>
          <Link href="/signup" style={{background:'#7c5cfc', color:'#fff', fontSize:'14px', fontWeight:'500', textDecoration:'none', padding:'9px 24px', borderRadius:'8px'}}>Sign up</Link>
        </div>
      </nav>

      <main style={{maxWidth:'720px', margin:'0 auto', padding:'72px 24px 96px'}}>

        {/* Header */}
        <div style={{marginBottom:'56px'}}>
          <Link href="/" style={{color:'#6b7280', fontSize:'14px', textDecoration:'none', display:'inline-flex', alignItems:'center', gap:'6px', marginBottom:'32px'}}>
            ← Back to home
          </Link>
          <h1 style={{color:'#fff', fontWeight:'700', fontSize:'clamp(24px, 4vw, 36px)', marginBottom:'12px'}}>Privacy Policy</h1>
          <p style={{color:'#6b7280', fontSize:'14px'}}>Last updated: 10 May 2026</p>
        </div>

        <Section title="1. Who we are">
          <p>BillMate is operated by an Australian sole trader (ABN 46 849 678 875). We provide online invoicing software designed for Australian tradies and small businesses. You can contact us at <a href="mailto:support@bill-mate.com.au" style={{color:'#a78bfa'}}>support@bill-mate.com.au</a>.</p>
        </Section>

        <Section title="2. What information we collect">
          <p style={{marginBottom:'12px'}}>We collect information you provide directly:</p>
          <ul style={{paddingLeft:'20px', marginBottom:'12px'}}>
            <li style={{marginBottom:'8px'}}>Account details — your name and email address when you sign up</li>
            <li style={{marginBottom:'8px'}}>Business details — your business name, ABN, and address as entered in your profile</li>
            <li style={{marginBottom:'8px'}}>Invoice data — client names, contact details, job descriptions, and amounts you enter</li>
            <li style={{marginBottom:'8px'}}>Payment information — handled directly by Stripe; we do not store card numbers</li>
          </ul>
          <p>We also collect basic usage data (pages visited, features used) and technical information (browser type, IP address) to keep the service running and improve it.</p>
        </Section>

        <Section title="3. How we use your information">
          <ul style={{paddingLeft:'20px'}}>
            <li style={{marginBottom:'8px'}}>To provide, operate, and improve BillMate</li>
            <li style={{marginBottom:'8px'}}>To send transactional emails (invoice confirmations, account notices)</li>
            <li style={{marginBottom:'8px'}}>To process payments via Stripe</li>
            <li style={{marginBottom:'8px'}}>To respond to your support requests</li>
            <li style={{marginBottom:'8px'}}>To comply with Australian legal obligations</li>
          </ul>
          <p style={{marginTop:'12px'}}>We do not sell your data. We do not use your invoice data for advertising.</p>
        </Section>

        <Section title="4. Who we share data with">
          <p style={{marginBottom:'12px'}}>We share data only with the third-party services required to operate BillMate:</p>
          <ul style={{paddingLeft:'20px'}}>
            <li style={{marginBottom:'8px'}}><strong style={{color:'#d1d5db'}}>Supabase</strong> — database and authentication, hosted in the Sydney region (ap-southeast-2)</li>
            <li style={{marginBottom:'8px'}}><strong style={{color:'#d1d5db'}}>Stripe</strong> — payment processing for Pro subscriptions</li>
            <li style={{marginBottom:'8px'}}><strong style={{color:'#d1d5db'}}>Vercel</strong> — application hosting</li>
            <li style={{marginBottom:'8px'}}><strong style={{color:'#d1d5db'}}>Anthropic</strong> — powers the in-app support chat (messages may be processed; do not include sensitive financial data in chat)</li>
          </ul>
          <p style={{marginTop:'12px'}}>We do not share your data with any other third parties unless required by law.</p>
        </Section>

        <Section title="5. Data storage and security">
          <p>Your data is stored in Supabase's Sydney data centre. We use row-level security to ensure users can only access their own data. Connections are encrypted in transit (TLS). We take reasonable steps to protect your information, but no internet service is 100% secure.</p>
        </Section>

        <Section title="6. Your rights">
          <p style={{marginBottom:'12px'}}>Under the Australian Privacy Act 1988 you have the right to:</p>
          <ul style={{paddingLeft:'20px'}}>
            <li style={{marginBottom:'8px'}}>Access the personal information we hold about you</li>
            <li style={{marginBottom:'8px'}}>Request corrections to inaccurate information</li>
            <li style={{marginBottom:'8px'}}>Request deletion of your account and associated data</li>
          </ul>
          <p style={{marginTop:'12px'}}>To exercise any of these rights, email us at <a href="mailto:support@bill-mate.com.au" style={{color:'#a78bfa'}}>support@bill-mate.com.au</a> and we will respond within 30 days.</p>
        </Section>

        <Section title="7. Cookies">
          <p>BillMate uses session cookies required for authentication. We do not use third-party advertising cookies or tracking pixels.</p>
        </Section>

        <Section title="8. Changes to this policy">
          <p>We may update this policy from time to time. We will notify you of material changes by email or by posting a notice in the app. Continued use of BillMate after changes constitutes acceptance of the updated policy.</p>
        </Section>

        <Section title="9. Contact">
          <p>Questions about this policy? Email us at <a href="mailto:support@bill-mate.com.au" style={{color:'#a78bfa'}}>support@bill-mate.com.au</a>.</p>
        </Section>

        {/* Footer rule */}
        <div style={{borderTop:'1px solid #2a2a3d', paddingTop:'32px', marginTop:'16px', display:'flex', gap:'24px'}}>
          <Link href="/terms" style={{color:'#6b7280', fontSize:'14px', textDecoration:'none'}}>Terms of Service</Link>
          <Link href="/" style={{color:'#6b7280', fontSize:'14px', textDecoration:'none'}}>Back to home</Link>
        </div>

      </main>
    </div>
  )
}
