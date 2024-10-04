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
          targetLang: "EN", // ここで翻訳先の言語を指定
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
      <h1>日本語から英語にできるよ</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="文章を入れてね"
        className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button onClick={handleTranslate}>英語に翻訳</button>
      {translatedText && <p>翻訳された文章: {translatedText}</p>}
    </div>
  );
};

export default Home;
