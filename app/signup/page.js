'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
  </svg>
)

const Spinner = () => (
  <>
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    <span style={{display:'inline-block', width:14, height:14, border:'2px solid rgba(255,255,255,0.3)', borderTop:'2px solid white', borderRadius:'50%', animation:'spin 0.7s linear infinite', verticalAlign:'middle', marginRight:8}} />
  </>
)

function friendlyError(msg) {
  if (!msg) return 'Something went wrong. Please try again.'
  const m = msg.toLowerCase()
  if (m.includes('user already registered') || m.includes('already registered') || m.includes('already been registered'))
    return 'An account with this email already exists. Try signing in instead.'
  if (m.includes('password should be at least') || m.includes('password must be at least'))
    return 'Password must be at least 6 characters.'
  if (m.includes('unable to validate email') || m.includes('invalid format') || m.includes('valid email'))
    return 'Please enter a valid email address.'
  if (m.includes('too many requests') || m.includes('rate limit'))
    return 'Too many attempts. Please wait a moment and try again.'
  if (m.includes('network') || m.includes('fetch'))
    return 'Connection error. Check your internet and try again.'
  return 'Something went wrong. Please try again.'
}

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setError(friendlyError(error.message))
      setLoading(false)
    } else {
      setSuccess(true)
    }
  }

  const handleGoogleSignup = async () => {
    setGoogleLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
    if (error) {
      setError(friendlyError(error.message))
      setGoogleLoading(false)
    }
  }

  return (
    <div style={{minHeight:'100vh', background:'#0a0a0f', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'20px'}}>
      <div style={{position:'fixed', top:-200, left:'50%', transform:'translateX(-50%)', width:600, height:600, background:'rgba(124,92,252,0.15)', borderRadius:'50%', filter:'blur(100px)', pointerEvents:'none'}} />
      <div style={{width:'100%', maxWidth:400, position:'relative', zIndex:10}}>
        <div style={{textAlign:'center', marginBottom:40}}>
          <Link href="/" style={{fontSize:48, fontWeight:700, color:'white', letterSpacing:'-2px', textDecoration:'none'}}>BillMate</Link>
          <p style={{color:'#6b7280', fontSize:16, marginTop:8}}>Create your account</p>
        </div>
        {success ? (
          <div style={{background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:20, padding:40, textAlign:'center'}}>
            <div style={{fontSize:48, marginBottom:16}}>✉️</div>
            <p style={{color:'white', fontWeight:700, fontSize:18, marginBottom:8}}>Check your email</p>
            <p style={{color:'#6b7280', fontSize:14, lineHeight:1.6}}>We sent a confirmation link to <span style={{color:'#9ca3af', fontWeight:600}}>{email}</span></p>
            <Link href="/login" style={{display:'inline-block', marginTop:24, color:'#a78bfa', fontWeight:600, fontSize:14, textDecoration:'none'}}>Back to sign in →</Link>
          </div>
        ) : (
          <div style={{background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:20, padding:32}}>
            <button onClick={handleGoogleSignup} disabled={googleLoading} style={{width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:10, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.15)', borderRadius:12, padding:'12px 16px', color:'white', fontSize:14, fontWeight:600, cursor:googleLoading?'not-allowed':'pointer', opacity:googleLoading?0.7:1, marginBottom:20}}>
              {googleLoading ? <Spinner /> : <GoogleIcon />}
              {googleLoading ? 'Redirecting…' : 'Continue with Google'}
            </button>
            <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:20}}>
              <div style={{flex:1, height:1, background:'rgba(255,255,255,0.1)'}} />
              <span style={{color:'#4b5563', fontSize:12, fontWeight:600}}>OR</span>
              <div style={{flex:1, height:1, background:'rgba(255,255,255,0.1)'}} />
            </div>
            <form onSubmit={handleSignup} style={{display:'flex', flexDirection:'column', gap:16}}>
              <div>
                <label style={{display:'block', color:'#9ca3af', fontSize:13, fontWeight:600, marginBottom:8}}>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" style={{width:'100%', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:12, padding:'12px 16px', color:'white', fontSize:14, outline:'none', boxSizing:'border-box'}} />
              </div>
              <div>
                <label style={{display:'block', color:'#9ca3af', fontSize:13, fontWeight:600, marginBottom:8}}>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} placeholder="Min. 6 characters" style={{width:'100%', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:12, padding:'12px 16px', color:'white', fontSize:14, outline:'none', boxSizing:'border-box'}} />
              </div>
              {error && <p style={{color:'#f87171', fontSize:13, background:'rgba(248,113,113,0.1)', border:'1px solid rgba(248,113,113,0.2)', borderRadius:10, padding:'10px 14px', margin:0}}>{error}</p>}
              <button type="submit" disabled={loading} style={{width:'100%', background:'#7c5cfc', color:'white', padding:'14px', borderRadius:12, fontWeight:700, fontSize:14, cursor:loading?'not-allowed':'pointer', border:'none', opacity:loading?0.7:1, marginTop:4, display:'flex', alignItems:'center', justifyContent:'center'}}>
                {loading && <Spinner />}
                {loading ? 'Creating account…' : 'Create account'}
              </button>
            </form>
          </div>
        )}
        <p style={{textAlign:'center', color:'#6b7280', fontSize:14, marginTop:24}}>
          Already have an account?{' '}
          <Link href="/login" style={{color:'#a78bfa', fontWeight:600, textDecoration:'none'}}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}
