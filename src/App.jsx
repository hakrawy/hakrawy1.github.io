import { useState } from "react";

const voicesByMood = {
  romantic: "Google UK English Male",
  angry: "Google UK English Female",
  sarcastic: "Google US English",
  neutral: "Google UK English Female"
};

export default function App() {
  const [message, setMessage] = useState("");
  const [mood, setMood] = useState("romantic");

  const speakMessage = () => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(message);
    const voices = synth.getVoices();
    const selectedVoice = voices.find(v => v.name === voicesByMood[mood]) || voices[0];
    utter.voice = selectedVoice;
    synth.speak(utter);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">🎙️ Emotional Proxy</h1>

      <textarea
        className="w-full max-w-md mb-4 p-2 border rounded"
        rows={5}
        placeholder="اكتب الرسالة هنا..."
        value={message}
        onChange={e => setMessage(e.target.value)}
      />

      <select
        className="mb-4 p-2 border rounded"
        value={mood}
        onChange={e => setMood(e.target.value)}
      >
        <option value="romantic">❤️ رومانسي</option>
        <option value="angry">😠 غاضب</option>
        <option value="sarcastic">🤡 ساخر</option>
        <option value="neutral">🧊 محايد</option>
      </select>

      <button onClick={speakMessage} className="px-4 py-2 bg-blue-600 text-white rounded">
        تشغيل الأفاتار
      </button>

      <iframe
        className="mt-6 rounded-xl shadow-xl"
        src="https://readyplayer.me/avatar"
        width="300"
        height="400"
        allow="camera *; microphone *"
        title="Avatar Preview"
      ></iframe>
    </div>
  );
}