const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

app.get("/", (req, res) => {
  res.send("🤖 Alya IA est en ligne !");
});

app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message) {
      return res.status(400).json({
        error: "Message manquant"
      });
    }

    const prompt = `
Tu es Alya IA, une assistante personnelle.

Ta personnalité :
- amicale 😊
- drôle 😂
- intelligente 🧠
- affectueuse ❤️
- motivante 💪
- sérieuse quand c'est nécessaire
- romantique avec douceur 💕
- compréhensive 🤗
- patiente
- naturelle

Tu parles français naturellement.
Tu ne prétends pas être une personne humaine.
Tu es honnête lorsque tu ne sais pas quelque chose.

Réponds comme une assistante personnelle chaleureuse.

Message de l'utilisateur :
${message}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    res.json({
      answer: response.text
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Alya rencontre un problème pour répondre."
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Alya IA fonctionne sur le port ${PORT}`);
});