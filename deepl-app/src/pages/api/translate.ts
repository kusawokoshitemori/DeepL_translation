import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { text, targetLang } = req.body;

  try {
    const response = await axios.post(
      "https://api-free.deepl.com/v2/translate",
      null,
      {
        params: {
          auth_key: process.env.DEEPL_API_KEY,
          text,
          target_lang: targetLang,
        },
      }
    );

    res
      .status(200)
      .json({ translatedText: response.data.translations[0].text });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to translate text" });
  }
}
