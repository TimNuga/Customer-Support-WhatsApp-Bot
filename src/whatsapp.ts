import qrcode from 'qrcode-terminal';
import { Client, LocalAuth } from 'whatsapp-web.js';
import botService from './services/botService';
import qrcodeLib from 'qrcode';

// Use LocalAuth so session persists locally
const client = new Client({
  authStrategy: new LocalAuth(),
});

export let lastQrImage: string | null = null;

// Generate QR Code for login
client.on('qr', (qrString: string) => {
  // Generating terminal QR
  qrcode.generate(qrString, { small: true });

  // Storing a data URL so it can be displayed in the browser
  qrcodeLib
    .toDataURL(qrString)
    .then((dataUrl) => {
      lastQrImage = dataUrl;
    })
    .catch((err) => {
      console.error('Error generating QR for browser:', err);
    });
});

// Notify when ready
client.on('ready', () => {
  console.log('WhatsApp client is ready!');
});

// Handle incoming messages
client.on('message', async (msg) => {
  try {
    const { from, body } = msg;
    const { response, userName, userQuery } = await botService.handleMessage(
      body,
      from,
    );

    // Send the response
    client.sendMessage(from, response);

    // Log queries if needed
    // (We call the service directly, or you can call your API endpoint)
    await botService.logQuery(userName, userQuery, response);
  } catch (error) {
    console.error('Error handling incoming message:', error);
  }
});

// Initialize the client
client.initialize();

export default client;