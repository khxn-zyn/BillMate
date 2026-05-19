import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const host = request.headers.get('x-forwarded-host') || request.headers.get('host')
    const proto = request.headers.get('x-forwarded-proto') || 'https'
    const origin = process.env.NEXT_PUBLIC_SITE_URL || `${proto}://${host}`
    const { invoiceId } = await request.json()
    if (!invoiceId) return Response.json({ error: 'Missing invoiceId' }, { status: 400 })

    const supabase = await createClient()

    // Verify the caller owns this invoice
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: invoice, error } = await supabase
      .from('invoices')
      .select('id, status, data')
      .eq('id', invoiceId)
      .eq('user_id', user.id)
      .single()

    if (error || !invoice) return Response.json({ error: 'Invoice not found' }, { status: 404 })
    if (invoice.status === 'paid') return Response.json({ error: 'Invoice is already paid' }, { status: 400 })

    const d = invoice.data
    const clientEmail = (d.clientEmail || '').trim()
    if (!clientEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail))
      return Response.json({ error: 'This invoice has no valid client email address. Edit the invoice and add one first.' }, { status: 400 })

    const portalUrl = `${origin}/share/${invoiceId}`
    const dueText = d.due ? `due ${d.due}` : 'due soon'
    const fromName = d.bizName || 'Your supplier'
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'invoices@bill-mate.com.au'

    const { error: sendError } = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: clientEmail,
      subject: `Payment reminder — ${d.num} (${dueText})`,
      html: `
        <div style="font-family:-apple-system,sans-serif;max-width:560px;margin:0 auto;padding:40px 24px;background:#fff;">
          <h2 style="color:#111827;font-size:1.4rem;font-weight:800;margin-bottom:8px;">Payment reminder</h2>
          <p style="color:#6b7280;margin-bottom:24px;">Hi ${d.clientName || 'there'},</p>
          <p style="color:#374151;line-height:1.7;margin-bottom:24px;">
            This is a friendly reminder that invoice <strong>${d.num}</strong> for
            <strong>$${Number(d.total).toFixed(2)}</strong> from <strong>${fromName}</strong> is ${dueText}.
          </p>
          <a href="${portalUrl}"
            style="display:inline-block;background:#7c5cfc;color:#fff;font-weight:700;font-size:0.95rem;padding:12px 32px;border-radius:10px;text-decoration:none;margin-bottom:32px;">
            View invoice →
          </a>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
          <p style="color:#9ca3af;font-size:0.82rem;">
            Sent via BillMate · <a href="${portalUrl}" style="color:#7c5cfc;">View invoice online</a>
          </p>
        </div>
      `,
    })

    if (sendError) return Response.json({ error: sendError.message }, { status: 500 })

    return Response.json({ success: true })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
