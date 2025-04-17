import { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../lib/supabase';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  try {
    switch (request.method) {
      case 'POST':
        // Create a new dayuse booking
        const bookingData = request.body;

        // Validate required fields
        if (!bookingData.date || !bookingData.arrivalTime || !bookingData.adults) {
          return response.status(400).json({
            error: 'Date, arrival time, and number of adults are required',
          });
        }

        // Create booking
        const { data: newBooking, error: createError } = await supabase
          .from('dayuse_bookings')
          .insert([{
            ...bookingData,
            status: 'pending',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }])
          .select()
          .single();

        if (createError) throw createError;

        return response.status(201).json({
          message: 'Dayuse booking created successfully',
          data: newBooking,
        });

      case 'GET':
        // Get dayuse bookings (admin only)
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

        // Get bookings with optional filters
        const { status, page = '1', limit = '10' } = request.query;
        const offset = (parseInt(page as string) - 1) * parseInt(limit as string);

        let query = supabase
          .from('dayuse_bookings')
          .select('*', { count: 'exact' })
          .order('created_at', { ascending: false })
          .range(offset, offset + parseInt(limit as string) - 1);

        if (status) {
          query = query.eq('status', status);
        }

        const { data: bookings, error: fetchError, count } = await query;

        if (fetchError) throw fetchError;

        return response.status(200).json({
          data: bookings,
          total: count,
          page: parseInt(page as string),
          limit: parseInt(limit as string),
        });

      default:
        return response.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    return response.status(500).json({ error: 'Internal Server Error' });
  }
} 