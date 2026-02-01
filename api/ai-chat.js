// /api/chat.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ reply: "No message received." });
  }

  // 🔐 Check env variable
  if (!process.env.OPEN_AI_API3) {
    return res.status(500).json({
      reply: "Server error: OPEN_AI_API3 is not set",
    });
  }

  try {
    const openaiResp = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPEN_AI_API3}`,
        },
        body: JSON.stringify({
          model: "gpt-5-nano",
          messages: [
            { role: "system", content: "You are a friendly AI tutor." },
            { role: "user", content: message },
          ],
        }),
      }
    );

    if (!openaiResp.ok) {
      const errorText = await openaiResp.text();
      console.error("OpenAI error:", errorText);

      return res.status(500).json({
        reply: "AI service failed. Check server logs.",
      });
    }

    const openaiData = await openaiResp.json();
    const reply =
      openaiData.choices?.[0]?.message?.content || "No response.";

    // ✅ AI-ONLY response
    return res.status(200).json({ reply });

  } catch (err) {
    console.error("Backend error:", err);
    return res.status(500).json({
      reply: "⚠️ Backend error.",
    });
  }
}
