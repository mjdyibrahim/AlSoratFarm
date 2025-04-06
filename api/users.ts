import { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  try {
    switch (request.method) {
      case 'GET':
        // Example: Fetch users
        const { data: users, error } = await supabase
          .from('users')
          .select('*');
        
        if (error) throw error;
        
        return response.status(200).json(users);
        
      case 'POST':
        // Example: Create a new user
        const { data: newUser, error: createError } = await supabase
          .from('users')
          .insert([request.body])
          .select()
          .single();
        
        if (createError) throw createError;
        
        return response.status(201).json(newUser);
        
      default:
        return response.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    return response.status(500).json({ error: 'Internal Server Error' });
  }
} 