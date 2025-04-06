import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  try {
    // Example of handling different HTTP methods
    switch (request.method) {
      case 'GET':
        return response.status(200).json({ message: 'Hello from Edge Function!' });
      case 'POST':
        const body = request.body;
        return response.status(200).json({ 
          message: 'Data received',
          data: body 
        });
      default:
        return response.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    return response.status(500).json({ error: 'Internal Server Error' });
  }
} 