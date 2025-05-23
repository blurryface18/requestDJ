import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

function LandingPage() {
  const navigate = useNavigate();
  const [djName, setDjName] = useState('');

  const handleCreateDJ = async () => {
    if (!djName.trim()) return;

    const djId = uuidv4();
    await fetch('http://localhost:5001/register-dj', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ djId, name: djName })
    });

    navigate(`/dj/${djId}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6">
      <h1 className="text-4xl font-extrabold">🎧 Welcome DJs</h1>
      <input
        type="text"
        placeholder="Your name dude !"
        value={djName}
        onChange={(e) => setDjName(e.target.value)}
        className="p-3 rounded w-72 text-center text-black bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow"
      />
      <button
        onClick={handleCreateDJ}
        className="bg-white text-indigo-600 font-bold py-3 px-6 rounded-xl shadow-lg hover:bg-gray-100"
      >
        Generate Your QR Code
      </button>
    </div>
  );
}

export default LandingPage;