import { Request, Response, RequestHandler } from 'express';
import { lastQrImage } from '../whatsapp';

export const getQRCode : RequestHandler = async (_req: Request, res: Response) : Promise<void> => {
    if (lastQrImage) {
        res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>WhatsApp QR Code</title>
        </head>
        <body>
          <h1>Scan this QR Code to log in:</h1>
          <img src="${lastQrImage}" alt="WhatsApp QR Code" />
        </body>
        </html>
      `);   
    } else {
        res.send('QR Code not generated yet. Please try again later.');
      }
}