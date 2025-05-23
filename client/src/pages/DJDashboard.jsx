// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import { QRCodeCanvas } from 'qrcode.react'; // ✅ correct named import

// const socket = io('http://localhost:5001');

// function DJDashboard() {
//   const [requests, setRequests] = useState([]);
//   const djId = 'demo-dj'; // static ID for demo

//   useEffect(() => {
//     fetch('http://localhost:5001/requests')
//       .then(res => res.json())
//       .then(data => setRequests(data));

//     socket.on('new_request', (req) => {
//       setRequests(prev => [...prev, req]);
//     });
//   }, []);

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold">DJ Dashboard</h1>
//       <p>Scan this QR to send request:</p>
//       <QRCodeCanvas value={`${window.location.origin}/request/${djId}`} size={128} />

//       <div className="mt-4">
//         <h2 className="text-xl font-semibold">Song Requests</h2>
//         <ul>
//           {requests.map((req, i) => <li key={i}>{req}</li>)}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default DJDashboard;



import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import io from 'socket.io-client';

const socket = io('http://localhost:5001');

function DJDashboard() {
  const { djId } = useParams();
  const [requests, setRequests] = useState([]);

  // useEffect(() => {
  //   fetch(`/requests/${djId}`)
  //     .then(res => res.json())
  //     .then(setRequests);

  //   socket.on('new_request', (request) => {
  //     if (request.djId === djId) {
  //       setRequests(prev => [...prev, request]);
  //     }
  //   });

  //   return () => {
  //     socket.off('new_request');
  //   };
  // }, [djId]);
  const [djName, setDjName] = useState('');
  const qrRef = useRef();

  const handleDownload = () => {
    const canvas = qrRef.current.querySelector('canvas');
    const pngUrl = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${djName || 'qr-code'}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  useEffect(() => {
    fetch(`/requests/${djId}`)
      .then(res => res.json())
      .then(setRequests);

    fetch(`http://localhost:5001/dj-name/${djId}`)
      .then(res => res.json())
      .then(data => setDjName(data.name));

    socket.on('new_request', (request) => {
      if (request.djId === djId) {
        setRequests(prev => [...prev, request]);
      }
    });

    return () => {
      socket.off('new_request');
    };
  }, [djId]);

  return (
  <div className="p-6 min-h-screen bg-gray-50">
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold mb-4 text-center text-indigo-700">
        🎧 DJ Dashboard — {djName || 'Loading...'}
      </h1>

      <div className="text-center mb-6">
        <p className="mb-4 text-lg">
          Share this QR code to receive song requests for <span className="font-semibold">{djName || 'your DJ name'}</span>:
        </p>
        <div className="inline-flex flex-col items-end bg-gray-100 p-4 rounded" ref={qrRef}>
          <QRCodeCanvas value={`http://localhost:5173/request/${djId}`} size={200} />
          <button
            onClick={handleDownload}
            className="mt-4 bg-indigo-600 text-white font-semibold px-4 py-2 rounded hover:bg-indigo-700 transition self-end"
          >
            Download QR Code
          </button>
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-indigo-600">📜 Song Requests:</h2>
      <ul className="list-disc pl-6 space-y-2">
        {requests.map((req, i) => (
          <li key={i} className="text-gray-800">{req.text}</li>
        ))}
      </ul>
    </div>
  </div>
  );
}

export default DJDashboard;


