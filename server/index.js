

const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

app.use(cors());
app.use(express.json());

let requestsByDJ = {};
// It seems you also have a global 'requests' array somewhere
// If 'requests' is intended to be separate from 'requestsByDJ',
// ensure it's declared:
// let requests = []; // <--- Add this if 'requests' is needed globally

let djNames = {};   // New map to store djId -> name

app.post('/register-dj', (req, res) => {
  const { djId, name } = req.body;
  if (djId && name) {
    djNames[djId] = name;
    return res.json({ success: true });
  }
  return res.status(400).json({ success: false, message: 'Missing djId or name' });
});

app.get('/dj-name/:djId', (req, res) => {
  const { djId } = req.params;
  res.json({ name: djNames[djId] || 'Unknown DJ' });
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id); // Good to add for debugging

  socket.on('send_request', (request) => {
    // This is the correct place for socket.on
    // const { djId, text } = request; // Assuming 'text' is the song name
    const { djId, text, song } = request;
    const actualText = text || song;

    if (!requestsByDJ[djId]) {
        requestsByDJ[djId] = [];
    }
    //  requestsByDJ[djId].push({ text }); // Or adjust structure as needed
    requestsByDJ[djId].push({ text: actualText });
    console.log(`New request for DJ ${djId}: ${text}`);

    //  io.emit('new_request', { djId, text }); // Emits to all connected clients
    io.emit('new_request', { djId, text: actualText });

    // If you want to emit only to the specific DJ's "room", you'd use:
    // io.to(djId).emit('new_request', { djId, text });
    // This requires clients to join a room like socket.join(djId);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});



app.get('/requests/:djId', (req, res) => {
  const { djId } = req.params;
  res.json(requestsByDJ[djId] || []);
});

// Serve static client files (assuming your client build is in '../client/dist')
app.use(express.static(path.join(__dirname, '../client/dist')));

// Catch-all route for client-side routing
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
);

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


