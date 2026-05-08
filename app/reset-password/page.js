'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setDone(true)
      setTimeout(() => router.push('/dashboard'), 2000)
    }
  }

  return (
    <div style={{minHeight:'100vh', background:'#0a0a0f', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'20px'}}>
      <div style={{position:'fixed', top:-200, left:'50%', transform:'translateX(-50%)', width:600, height:600, background:'rgba(124,92,252,0.15)', borderRadius:'50%', filter:'blur(100px)', pointerEvents:'none'}} />

      <div style={{width:'100%', maxWidth:400, position:'relative', zIndex:10}}>
        <div style={{textAlign:'center', marginBottom:40}}>
          <Link href="/" style={{fontSize:48, fontWeight:700, color:'white', letterSpacing:'-2px', textDecoration:'none'}}>BillMate</Link>
          <p style={{color:'#6b7280', fontSize:16, marginTop:8}}>Choose a new password</p>
        </div>

        <div style={{background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:20, padding:32}}>
          {done ? (
            <div style={{textAlign:'center'}}>
              <div style={{fontSize:40, marginBottom:16}}>✅</div>
              <p style={{color:'white', fontWeight:600, fontSize:16, margin:'0 0 8px'}}>Password updated</p>
              <p style={{color:'#9ca3af', fontSize:14, margin:0}}>Redirecting you to your dashboard…</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:16}}>
              <div>
                <label style={{display:'block', color:'#9ca3af', fontSize:13, fontWeight:600, marginBottom:8}}>New password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  style={{width:'100%', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:12, padding:'12px 16px', color:'white', fontSize:14, outline:'none', boxSizing:'border-box'}}
                />
              </div>

              <div>
                <label style={{display:'block', color:'#9ca3af', fontSize:13, fontWeight:600, marginBottom:8}}>Confirm password</label>
                <input
                  type="password"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  required
                  placeholder="••••••••"
                  style={{width:'100%', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:12, padding:'12px 16px', color:'white', fontSize:14, outline:'none', boxSizing:'border-box'}}
                />
              </div>

              {error && (
                <p style={{color:'#f87171', fontSize:13, background:'rgba(248,113,113,0.1)', border:'1px solid rgba(248,113,113,0.2)', borderRadius:10, padding:'10px 14px', margin:0}}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{width:'100%', background:'#7c5cfc', color:'white', padding:'14px', borderRadius:12, fontWeight:700, fontSize:14, cursor:loading?'not-allowed':'pointer', border:'none', opacity:loading?0.7:1, marginTop:4}}
              >
                {loading ? 'Saving…' : 'Save new password'}
              </button>
            </form>
          )}
        </div>

        <p style={{textAlign:'center', color:'#6b7280', fontSize:14, marginTop:24}}>
          <Link href="/login" style={{color:'#a78bfa', fontWeight:600, textDecoration:'none'}}>Back to login</Link>
        </p>
      </div>
    </div>
  )
}
