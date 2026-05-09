const SYSTEM_PROMPT =
  "You are a friendly support assistant for BillMate, an Australian invoicing app for small businesses and tradies. " +
  "Help users with: creating and managing invoices, understanding GST (10% in Australia), using BillMate features, " +
  "and general Australian small business invoicing questions. Keep answers short, friendly and practical. " +
  "You are built into the BillMate app.";

export async function POST(request) {
  const { messages } = await request.json();

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages
        .filter((_, i, arr) => i >= arr.findIndex(m => m.role === "user"))
        .map(m => ({ role: m.role, content: m.content })),
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    console.error("Anthropic API error:", data);
    return Response.json({ text: "Sorry, I couldn't get a response. Please try again." }, { status: 200 });
  }
  const text = data.content?.[0]?.text ?? "Sorry, I couldn't get a response. Please try again.";

  return Response.json({ text });
}
