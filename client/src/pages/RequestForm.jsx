// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import io from 'socket.io-client';

// const socket = io('http://localhost:5001');

// function RequestPage() {
//   const { djId } = useParams();
//   const [text, setText] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (text.trim()) {
//       socket.emit('send_request', `${djId}: ${text}`);
//       setText('');
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold">Request a Song</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           className="border p-2 w-full"
//           value={text}
//           onChange={e => setText(e.target.value)}
//           placeholder="Enter song name..."
//         />
//         <button type="submit" className="bg-blue-500 text-white p-2 mt-2">Send Request</button>
//       </form>
//     </div>
//   );
// }

// export default RequestPage;


// client/src/pages/RequestForm.jsx
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5001'); // ← local connection

export default function RequestForm() {
  const { djId } = useParams();
  const [song, setSong] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [djName, setDjName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!song.trim()) return;

    socket.emit('send_request', { djId, text:song });
    setSubmitted(true);
    setSong('');
  };

  useEffect(() => {
    fetch(`http://localhost:5001/dj-name/${djId}`)
      .then(res => res.json())
      .then(data => setDjName(data.name));
  }, [djId]);

  return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-6">
    <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full">
      <h1 className="text-2xl font-extrabold mb-4 text-center text-blue-700">
        🎶 Request a Song for <span className="text-indigo-700">{djName || 'DJ'}</span>
      </h1>
      <p className="text-sm text-gray-500 text-center mb-6">
        Let {djName || 'the DJ'} know what track you'd love to hear!
      </p>
      {submitted ? (
        <p className="text-green-600 text-lg font-semibold text-center">🎉 Request sent!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={song}
            onChange={(e) => setSong(e.target.value)}
            placeholder="Enter song name"
            className="w-full border border-blue-300 p-3 rounded mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Send Request
          </button>
        </form>
      )}
    </div>
  </div>
  );
}
