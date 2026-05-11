import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service — BillMate',
  description: 'The terms that govern your use of BillMate.',
}

const Section = ({ title, children }) => (
  <div style={{marginBottom:'40px'}}>
    <h2 style={{color:'#fff', fontWeight:'600', fontSize:'18px', marginBottom:'12px'}}>{title}</h2>
    <div style={{color:'#9ca3af', fontSize:'15px', lineHeight:'1.8'}}>{children}</div>
  </div>
)

export default function TermsOfService() {
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
          <h1 style={{color:'#fff', fontWeight:'700', fontSize:'clamp(24px, 4vw, 36px)', marginBottom:'12px'}}>Terms of Service</h1>
          <p style={{color:'#6b7280', fontSize:'14px'}}>Last updated: 10 May 2026</p>
        </div>

        <Section title="1. Who these terms apply to">
          <p>These Terms of Service ("Terms") govern your use of BillMate, operated by an Australian sole trader (ABN 46 849 678 875, "we", "us"). By creating an account or using BillMate you agree to these Terms. If you do not agree, do not use the service.</p>
        </Section>

        <Section title="2. The service">
          <p>BillMate is an online invoicing tool for Australian tradies and small businesses. We provide tools to create quotes and invoices, calculate GST, export PDFs, and track payment status. We reserve the right to modify, suspend, or discontinue any part of the service at any time with reasonable notice.</p>
        </Section>

        <Section title="3. Your account">
          <ul style={{paddingLeft:'20px'}}>
            <li style={{marginBottom:'8px'}}>You must be at least 18 years old and have legal capacity to enter contracts under Australian law</li>
            <li style={{marginBottom:'8px'}}>You are responsible for keeping your login credentials secure</li>
            <li style={{marginBottom:'8px'}}>You are responsible for all activity that occurs under your account</li>
            <li style={{marginBottom:'8px'}}>You must provide accurate information and keep it up to date</li>
            <li style={{marginBottom:'8px'}}>One person or business entity per account — you may not share accounts</li>
          </ul>
        </Section>

        <Section title="4. Free and Pro plans">
          <p style={{marginBottom:'12px'}}>BillMate offers a free tier and a paid Pro plan (A$7/month, billed monthly).</p>
          <ul style={{paddingLeft:'20px'}}>
            <li style={{marginBottom:'8px'}}>Free plan features are available at no charge and may change at any time with notice</li>
            <li style={{marginBottom:'8px'}}>Pro plan fees are charged in advance. Payments are processed by Stripe</li>
            <li style={{marginBottom:'8px'}}>You may cancel your Pro subscription at any time. Access continues until the end of the paid period — no refunds for unused time</li>
            <li style={{marginBottom:'8px'}}>We may change Pro pricing with at least 30 days' notice to existing subscribers</li>
          </ul>
        </Section>

        <Section title="5. Acceptable use">
          <p style={{marginBottom:'12px'}}>You agree not to:</p>
          <ul style={{paddingLeft:'20px'}}>
            <li style={{marginBottom:'8px'}}>Use BillMate for any unlawful purpose or in violation of Australian law</li>
            <li style={{marginBottom:'8px'}}>Issue fraudulent or misleading invoices</li>
            <li style={{marginBottom:'8px'}}>Attempt to gain unauthorised access to any part of the service or another user's data</li>
            <li style={{marginBottom:'8px'}}>Reverse engineer, copy, or resell any part of BillMate</li>
            <li style={{marginBottom:'8px'}}>Use the service to send spam or unsolicited communications</li>
          </ul>
          <p style={{marginTop:'12px'}}>We may suspend or terminate accounts that breach these terms.</p>
        </Section>

        <Section title="6. Your data">
          <p>You own the data you enter into BillMate (invoices, client details, business information). You grant us a limited licence to store and process that data solely to provide the service. We will not use your invoice data for any other purpose. See our <Link href="/privacy" style={{color:'#a78bfa'}}>Privacy Policy</Link> for full details.</p>
        </Section>

        <Section title="7. Intellectual property">
          <p>All software, design, trademarks, and content comprising BillMate belong to us. These Terms do not transfer any intellectual property rights to you. The BillMate name and logo may not be used without our written permission.</p>
        </Section>

        <Section title="8. Limitation of liability">
          <p style={{marginBottom:'12px'}}>To the maximum extent permitted by Australian law:</p>
          <ul style={{paddingLeft:'20px'}}>
            <li style={{marginBottom:'8px'}}>BillMate is provided "as is" without warranties of any kind</li>
            <li style={{marginBottom:'8px'}}>We are not liable for any indirect, incidental, or consequential loss arising from your use of the service</li>
            <li style={{marginBottom:'8px'}}>Our total liability to you for any claim is limited to the amount you paid us in the 3 months before the claim arose</li>
          </ul>
          <p style={{marginTop:'12px'}}>Nothing in these Terms excludes rights you have under the Australian Consumer Law that cannot be excluded.</p>
        </Section>

        <Section title="9. Tax and compliance">
          <p>BillMate calculates GST automatically based on the rates you apply. You are solely responsible for the accuracy of your invoices, ABN usage, and compliance with your tax obligations. BillMate does not provide tax advice — consult a registered tax agent if needed.</p>
        </Section>

        <Section title="10. Termination">
          <p>You may close your account at any time by contacting us. We may suspend or terminate your account if you breach these Terms, fail to pay, or if we discontinue the service. On termination you may request an export of your data within 30 days.</p>
        </Section>

        <Section title="11. Governing law">
          <p>These Terms are governed by the laws of Queensland, Australia. Any disputes will be subject to the exclusive jurisdiction of the courts of Queensland.</p>
        </Section>

        <Section title="12. Changes to these terms">
          <p>We may update these Terms from time to time. We will give you at least 14 days' notice of material changes by email or in-app notice. Continued use after the effective date constitutes acceptance.</p>
        </Section>

        <Section title="13. Contact">
          <p>Questions about these Terms? Email us at <a href="mailto:khenz.dev@gmail.com" style={{color:'#a78bfa'}}>khenz.dev@gmail.com</a>.</p>
        </Section>

        {/* Footer rule */}
        <div style={{borderTop:'1px solid #2a2a3d', paddingTop:'32px', marginTop:'16px', display:'flex', gap:'24px'}}>
          <Link href="/privacy" style={{color:'#6b7280', fontSize:'14px', textDecoration:'none'}}>Privacy Policy</Link>
          <Link href="/" style={{color:'#6b7280', fontSize:'14px', textDecoration:'none'}}>Back to home</Link>
        </div>

      </main>
    </div>
  )
}
