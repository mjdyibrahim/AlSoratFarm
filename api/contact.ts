import { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase';

type ContactMessage = Database['public']['Tables']['contact_messages']['Insert'];

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5173' // Vite dev server
    : 'https://alsoratfarm.replit.dev',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true',
};

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  // Set CORS headers for all responses
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.setHeader(key, value);
  });

  try {
    switch (request.method) {
      case 'POST':
        // Validate required fields
        const { name, email, subject, message, phone } = request.body;
        
        if (!name || !email || !subject || !message) {
          return response.status(400).json({
            error: 'Name, email, subject, and message are required',
          });
        }

        // Create contact message
        const { data: newMessage, error: createError } = await supabase
          .from('contact_messages')
          .insert([{
            name,
            email,
            subject,
            message,
            phone: phone || null,
            status: 'unread',
          }])
          .select()
          .single();

        if (createError) throw createError;

        return response.status(201).json({
          message: 'Message sent successfully',
          data: newMessage,
        });

      case 'GET':
        // Only admins can view messages
        const { data: authData, error: authError } = await supabase.auth.getUser();
        
        if (authError || !authData.user) {
          return response.status(401).json({ error: 'Unauthorized' });
        }

        // Check if user is admin
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('role')
          .eq('id', authData.user.id)
          .single();

        if (userError || userData?.role !== 'admin') {
          return response.status(403).json({ error: 'Forbidden' });
        }

        // Get messages with optional filters
        const { status, page = '1', limit = '10' } = request.query;
        const offset = (parseInt(page as string) - 1) * parseInt(limit as string);

        let query = supabase
          .from('contact_messages')
          .select('*', { count: 'exact' })
          .order('created_at', { ascending: false })
          .range(offset, offset + parseInt(limit as string) - 1);

        if (status) {
          query = query.eq('status', status);
        }

        const { data: messages, error: fetchError, count } = await query;

        if (fetchError) throw fetchError;

        return response.status(200).json({
          data: messages,
          total: count,
          page: parseInt(page as string),
          limit: parseInt(limit as string),
        });

      case 'PUT':
        // Only admins can update messages
        const { data: updateAuthData, error: updateAuthError } = await supabase.auth.getUser();
        
        if (updateAuthError || !updateAuthData.user) {
          return response.status(401).json({ error: 'Unauthorized' });
        }

        // Check if user is admin
        const { data: adminData, error: adminError } = await supabase
          .from('users')
          .select('role')
          .eq('id', updateAuthData.user.id)
          .single();

        if (adminError || adminData?.role !== 'admin') {
          return response.status(403).json({ error: 'Forbidden' });
        }

        const { id } = request.query;
        if (!id) {
          return response.status(400).json({ error: 'Message ID is required' });
        }

        const { status: newStatus } = request.body;
        if (!newStatus || !['unread', 'read', 'replied'].includes(newStatus)) {
          return response.status(400).json({ error: 'Invalid status' });
        }

        const updateData: any = {
          status: newStatus,
        };

        if (newStatus === 'replied') {
          updateData.replied_at = new Date().toISOString();
          updateData.replied_by = updateAuthData.user.id;
        }

        const { data: updatedMessage, error: updateError } = await supabase
          .from('contact_messages')
          .update(updateData)
          .eq('id', id)
          .select()
          .single();

        if (updateError) throw updateError;

        return response.status(200).json({
          message: 'Message updated successfully',
          data: updatedMessage,
        });

      default:
        return response.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    return response.status(500).json({ error: 'Internal Server Error' });
  }
} 