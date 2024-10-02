import { useState } from "react";

const Home = () => {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const handleTranslate = async () => {
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          targetLang: "JA", // ここで翻訳先の言語を指定
        }),
      });
      const data = await response.json();
      setTranslatedText(data.translatedText);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>DeepL Translation App</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to translate"
      />
      <button onClick={handleTranslate}>Translate</button>
      {translatedText && <p>Translated Text: {translatedText}</p>}
    </div>
  );
};

export default Home;
