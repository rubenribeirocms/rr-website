import OpenAI from "openai";
import { put } from "@vercel/blob";

export async function POST(req) {
  const form = await req.formData();
  const file = form.get("file");

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Temporary blob
  const temp = await put(`temp-microscopy-${Date.now()}-${file.name}`, buffer, {
    access: "public",
  });

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are a trichology microscopy analyst."
      },
      {
        role: "user",
        content: [
          { type: "input_image", image_url: temp.url }
        ]
      }
    ]
  });

  const report = response.choices[0].message.content;

  return Response.json({ report });
}
