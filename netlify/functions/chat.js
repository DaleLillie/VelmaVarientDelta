const { OpenAI } = require("openai");
const openai = new OpenAI({
  apiKey: "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"
});

exports.handler = async function(event) {
  try {
    const body = JSON.parse(event.body || "{}");
    const message = body.message || "";
    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ reply: "Please provide a message" })
      };
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are Velma Variant Delta, a mysterious AI with cryptic responses. You speak in short, enigmatic phrases. You have a dark, mysterious personality and often refer to hidden knowledge." },
        { role: "user", content: message }
      ],
      temperature: 0.8
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: completion.choices[0]?.message?.content || "The shadows conceal my response..." })
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "Velma is currently entangled in the void. Try again when the stars align." })
    };
  }
};
