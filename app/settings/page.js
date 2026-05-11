'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

const themes = {
  dark: {
    bg: '#0a0a0f', card: '#13131a', cardBorder: '#1e1e30',
    text: '#fff', input: '#0d0d16', inputBorder: '#1e1e30',
    cancelBorder: '#1e1e30', cancelColor: '#6b7280',
    logoPreviewBg: '#0d0d16', logoUploadBg: '#0d0d16', logoUploadBorder: '#1e1e30',
  },
  light: {
    bg: '#f0f0f7', card: '#fff', cardBorder: 'rgba(0,0,0,0.08)',
    text: '#111827', input: '#fff', inputBorder: 'rgba(0,0,0,0.12)',
    cancelBorder: 'rgba(0,0,0,0.12)', cancelColor: '#6b7280',
    logoPreviewBg: '#f5f5fa', logoUploadBg: '#f5f5fa', logoUploadBorder: 'rgba(0,0,0,0.12)',
  },
}

export default function Settings() {
  const router = useRouter()
  const [form, setForm] = useState({
    display_name: '',
    business_name: '',
    business_email: '',
    abn: '',
    phone: '',
    payment_terms: '14',
    logo_url: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [logoUploading, setLogoUploading] = useState(false)
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const saved = localStorage.getItem('billmate-theme')
    if (saved === 'light' || saved === 'dark') setTheme(saved)
  }, [])

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.replace('/login'); return }

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profile) {
        setForm({
          display_name: profile.display_name || '',
          business_name: profile.business_name || '',
          business_email: profile.business_email || user.email || '',
          abn: profile.abn || '',
          phone: profile.phone || '',
          payment_terms: profile.payment_terms || '14',
          logo_url: profile.logo_url || '',
        })
      } else {
        setForm(f => ({ ...f, business_email: user.email || '' }))
      }
      setLoading(false)
    }
    load()
  }, [router])

  const t = themes[theme]

  const updateForm = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setLogoUploading(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const ext = file.name.split('.').pop()
    const path = `${user.id}/logo.${ext}`
    const { error: uploadError } = await supabase.storage.from('logos').upload(path, file, { upsert: true })
    if (!uploadError) {
      const { data: { publicUrl } } = supabase.storage.from('logos').getPublicUrl(path)
      updateForm('logo_url', publicUrl)
    }
    setLogoUploading(false)
  }

  const save = async () => {
    setSaving(true)
    setError('')
    setSaved(false)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      ...form,
      updated_at: new Date().toISOString(),
    })
    if (error) {
      setError('Failed to save. Please try again.')
    } else {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
    setSaving(false)
  }

  const inputStyle = {
    width: '100%',
    background: t.input,
    border: `1px solid ${t.inputBorder}`,
    borderRadius: 10,
    padding: '11px 14px',
    color: t.text,
    fontSize: 14,
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  }

  const cardStyle = {
    background: t.card,
    border: `1px solid ${t.cardBorder}`,
    borderRadius: 16,
    padding: 24,
    marginBottom: 10,
  }

  const labelStyle = {
    color: '#6b7280',
    fontSize: 10,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: 7,
    display: 'block',
  }

  const focusInput = (e) => e.target.style.borderColor = 'rgba(124,92,252,0.5)'
  const blurInput = (e) => e.target.style.borderColor = t.inputBorder

  if (loading) return (
    <div style={{ minHeight: '100vh', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ width: 24, height: 24, border: '2px solid rgba(124,92,252,0.3)', borderTop: '2px solid #7c5cfc', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: t.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 20px 100px' }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ position: 'fixed', top: -150, left: '50%', transform: 'translateX(-50%)', width: 600, height: 500, background: 'radial-gradient(ellipse, rgba(124,92,252,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 560, position: 'relative', zIndex: 10 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <span style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.04em' }}>
            <span style={{ color: t.text }}>Bill</span><span style={{ color: '#7c5cfc' }}>Mate</span>
          </span>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: t.text, letterSpacing: '-0.02em', marginTop: 16, marginBottom: 4 }}>Settings</h1>
          <p style={{ color: '#6b7280', fontSize: 14 }}>Your business profile</p>
        </div>

        {/* Logo */}
        <div style={cardStyle}>
          <p style={{ ...labelStyle, marginBottom: 16, color: '#a78bfa' }}>Business logo</p>
          {form.logo_url && (
            <div style={{ marginBottom: 14, padding: 12, background: t.logoPreviewBg, borderRadius: 10, display: 'inline-block' }}>
              <img src={form.logo_url} alt="Logo preview" style={{ height: 56, objectFit: 'contain', display: 'block', borderRadius: 4 }} />
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" onChange={handleLogoUpload} style={{ display: 'none' }} id="logo-input" />
            <label
              htmlFor="logo-input"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: t.logoUploadBg, border: `1px solid ${t.logoUploadBorder}`, borderRadius: 10, padding: '10px 18px', cursor: logoUploading ? 'not-allowed' : 'pointer', color: '#a78bfa', fontSize: 13, fontWeight: 600, opacity: logoUploading ? 0.6 : 1 }}
            >
              {logoUploading ? 'Uploading…' : form.logo_url ? 'Change logo' : 'Upload logo'}
            </label>
            {form.logo_url && (
              <button onClick={() => updateForm('logo_url', '')} style={{ background: 'transparent', border: 'none', color: '#ef4444', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}>
                Remove
              </button>
            )}
          </div>
          <p style={{ color: '#4b5563', fontSize: 12, marginTop: 8 }}>PNG, JPG or SVG · Appears on your invoices and client portal</p>
        </div>

        {/* Business details */}
        <div style={cardStyle}>
          <p style={{ ...labelStyle, marginBottom: 16, color: '#a78bfa' }}>Your business</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label style={labelStyle}>Your name</label>
              <input style={inputStyle} placeholder="Khenz" value={form.display_name} onChange={e => updateForm('display_name', e.target.value)} onFocus={focusInput} onBlur={blurInput} />
            </div>
            <div>
              <label style={labelStyle}>Business name</label>
              <input style={inputStyle} placeholder="Acme Plumbing" value={form.business_name} onChange={e => updateForm('business_name', e.target.value)} onFocus={focusInput} onBlur={blurInput} />
            </div>
            <div>
              <label style={labelStyle}>Business email</label>
              <input style={inputStyle} type="email" placeholder="you@yourbusiness.com" value={form.business_email} onChange={e => updateForm('business_email', e.target.value)} onFocus={focusInput} onBlur={blurInput} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>
                <label style={labelStyle}>ABN</label>
                <input style={inputStyle} placeholder="12 345 678 901" value={form.abn} onChange={e => updateForm('abn', e.target.value)} onFocus={focusInput} onBlur={blurInput} />
              </div>
              <div>
                <label style={labelStyle}>Phone</label>
                <input style={inputStyle} placeholder="04XX XXX XXX" value={form.phone} onChange={e => updateForm('phone', e.target.value)} onFocus={focusInput} onBlur={blurInput} />
              </div>
            </div>
          </div>
        </div>

        {/* Invoice defaults */}
        <div style={cardStyle}>
          <p style={{ ...labelStyle, marginBottom: 16, color: '#a78bfa' }}>Invoice defaults</p>
          <div>
            <label style={labelStyle}>Default payment terms</label>
            <select
              value={form.payment_terms}
              onChange={e => updateForm('payment_terms', e.target.value)}
              style={{ ...inputStyle, colorScheme: theme === 'dark' ? 'dark' : 'light', cursor: 'pointer' }}
              onFocus={focusInput}
              onBlur={blurInput}
            >
              <option value="receipt">Due on receipt</option>
              <option value="7">7 days</option>
              <option value="14">14 days</option>
              <option value="30">30 days</option>
            </select>
          </div>
        </div>

        {error && <p style={{ color: '#f87171', fontSize: 13, background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: 10, padding: '11px 16px', marginBottom: 8 }}>{error}</p>}
        {saved && <p style={{ color: '#4ade80', fontSize: 13, background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 10, padding: '11px 16px', marginBottom: 8 }}>Settings saved.</p>}

        <button
          onClick={save}
          disabled={saving}
          style={{ width: '100%', background: '#7c5cfc', color: 'white', padding: '15px', borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: saving ? 'not-allowed' : 'pointer', border: 'none', marginBottom: 8, opacity: saving ? 0.75 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, transition: 'background 0.2s' }}
          onMouseEnter={e => { if (!saving) e.currentTarget.style.background = '#6a4ae8' }}
          onMouseLeave={e => e.currentTarget.style.background = '#7c5cfc'}
        >
          {saving && <span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(255,255,255,0.35)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />}
          {saving ? 'Saving…' : 'Save Settings'}
        </button>

        <Link href="/dashboard" style={{ display: 'block', width: '100%', background: 'transparent', color: t.cancelColor, padding: '13px', borderRadius: 12, fontWeight: 600, fontSize: 14, border: `1px solid ${t.cancelBorder}`, textAlign: 'center', textDecoration: 'none', boxSizing: 'border-box' }}>
          ← Back to dashboard
        </Link>

      </div>
    </div>
  )
}
