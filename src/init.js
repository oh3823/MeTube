import 'regenerator-runtime';
import 'dotenv/config';
import './db';
import './models/Video';
import './models/User';
import './models/Comment';
import app from './server';

const PORT = 8080;

const handleListening = () =>
  console.log(`✅ Server listenting on http://localhost:${PORT} 🚀`);

app.listen(PORT, '0.0.0.0', handleListening);
