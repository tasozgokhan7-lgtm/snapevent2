import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email_or_phone, event_type, event_date, note } = body

    if (!name || !email_or_phone) {
      return NextResponse.json({ error: 'Ad ve iletişim bilgisi zorunludur.' }, { status: 400 })
    }

    const { error } = await resend.emails.send({
      from: 'Hatıra Topla <info@hatiratopla.com>',
      to: ['info@hatiratopla.com'],
      subject: `Yeni Teklif Talebi — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 32px; border-radius: 16px;">
          <div style="background: linear-gradient(135deg, #6366f1, #f43f5e); padding: 24px 32px; border-radius: 12px; margin-bottom: 24px;">
            <h1 style="color: white; margin: 0; font-size: 22px;">📬 Yeni Teklif Talebi</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 6px 0 0; font-size: 14px;">hatiratopla.com iletişim formundan</p>
          </div>

          <div style="background: white; border-radius: 12px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 12px 0; font-size: 13px; color: #64748b; width: 140px;">Ad Soyad</td>
                <td style="padding: 12px 0; font-size: 14px; color: #1e293b; font-weight: 600;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 12px 0; font-size: 13px; color: #64748b;">İletişim</td>
                <td style="padding: 12px 0; font-size: 14px; color: #1e293b;">${email_or_phone}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 12px 0; font-size: 13px; color: #64748b;">Etkinlik Türü</td>
                <td style="padding: 12px 0; font-size: 14px; color: #1e293b;">${event_type || '—'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 12px 0; font-size: 13px; color: #64748b;">Etkinlik Tarihi</td>
                <td style="padding: 12px 0; font-size: 14px; color: #1e293b;">${event_date || '—'}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; font-size: 13px; color: #64748b; vertical-align: top;">Not</td>
                <td style="padding: 12px 0; font-size: 14px; color: #1e293b;">${note || '—'}</td>
              </tr>
            </table>
          </div>

          <div style="margin-top: 20px; padding: 16px; background: #eff6ff; border-radius: 10px; border-left: 4px solid #6366f1;">
            <p style="margin: 0; font-size: 13px; color: #3730a3;">
              💡 <strong>Müşteriye yanıt vermek için</strong> ${email_or_phone} adresine dönün.
            </p>
          </div>

          <p style="margin-top: 20px; font-size: 12px; color: #94a3b8; text-align: center;">
            Bu e-posta hatiratopla.com iletişim formu tarafından otomatik gönderilmiştir.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'E-posta gönderilemedi.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 })
  }
}
