import { NextResponse } from "next/server"

const BOT_TOKEN = "8635875136:AAGtrpOefDSmLA7TVcMTmkoH_RrnhdJ1xw4"
const CHAT_ID = "5459088085"

type OrderItem = {
  image?: string
  title: string
  qty: number
  price: number
}

type OrderNotificationPayload = {
  orderId?: string | number
  fullName?: string
  phone?: string
  city?: string
  address?: string
  total?: number
  shipping?: number
  paymentMethod?: string
  items?: OrderItem[]
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

function formatCurrency(value?: number) {
  if (typeof value !== "number" || Number.isNaN(value)) return "—"
  return `${value.toLocaleString("fr-FR")} DH`
}

function buildOrderMessage(data: OrderNotificationPayload) {
  const totalQty =
    data.items?.reduce((sum, item) => sum + (item.qty || 0), 0) || 0

  const totalProducts = data.items?.length || 0

  return `
<b>╔════════════════════╗</b>
<b>🛒 NOUVELLE COMMANDE</b>
<b>╚════════════════════╝</b>

<b>👤 Client:</b> ${escapeHtml(data.fullName || "—")}
<b>📞 Téléphone:</b> ${escapeHtml(data.phone || "—")}
<b>🏙️ Ville:</b> ${escapeHtml(data.city || "—")}
<b>📍 Adresse:</b> ${escapeHtml(data.address || "—")}
<b>🧾 Commande ID:</b> #${escapeHtml(String(data.orderId || "—"))}

<b>📦 Produits différents:</b> ${totalProducts}
<b>🛍️ Quantité totale:</b> ${totalQty}

<b>💰 Total:</b> ${formatCurrency(data.total)}
<b>🚚 Livraison:</b> ${formatCurrency(data.shipping)}
<b>💳 Paiement:</b> ${escapeHtml(data.paymentMethod || "Cash on Delivery")}
`.trim()
}

async function sendTextMessage(text: string) {
  const response = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: "HTML",
      }),
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.description || "Failed to send Telegram text message")
  }

  return data
}

async function sendProductPhoto(item: OrderItem, index: number) {
  if (!item.image) return

  const lineTotal = (item.price || 0) * (item.qty || 0)

  const caption = `
<b>📦 Produit ${index + 1}</b>

<b>Nom:</b> ${escapeHtml(item.title || "Produit")}
<b>Qté:</b> ${item.qty || 0}
<b>Prix:</b> ${formatCurrency(item.price)}
<b>Total:</b> ${formatCurrency(lineTotal)}
`.trim()

  const response = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        photo: item.image,
        caption,
        parse_mode: "HTML",
      }),
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.description || "Failed to send Telegram photo")
  }

  return data
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as OrderNotificationPayload

    const orderMessage = buildOrderMessage(body)
    await sendTextMessage(orderMessage)

    if (body.items?.length) {
      for (let i = 0; i < body.items.length; i++) {
        await sendProductPhoto(body.items[i], i)
      }
    }

    return NextResponse.json({
      success: true,
      message: "Telegram notification sent successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}