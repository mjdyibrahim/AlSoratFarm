import { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase';

type Event = Database['public']['Tables']['events']['Row'];
type EventInsert = Database['public']['Tables']['events']['Insert'];
type EventUpdate = Database['public']['Tables']['events']['Update'];

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  try {
    switch (request.method) {
      case 'GET':
        // Get all events or filter by date range
        const { start_date, end_date, page = '1', limit = '10' } = request.query;
        const offset = (parseInt(page as string) - 1) * parseInt(limit as string);

        let query = supabase
          .from('events')
          .select('*', { count: 'exact' })
          .eq('is_active', true)
          .order('start_date', { ascending: true })
          .range(offset, offset + parseInt(limit as string) - 1);

        if (start_date) {
          query = query.gte('start_date', start_date);
        }
        if (end_date) {
          query = query.lte('end_date', end_date);
        }

        const { data: events, error: fetchError, count } = await query;

        if (fetchError) throw fetchError;

        return response.status(200).json({
          data: events,
          total: count,
          page: parseInt(page as string),
          limit: parseInt(limit as string),
        });

      case 'POST':
        // Create a new event (admin only)
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

        // Validate required fields
        const eventData: EventInsert = request.body;
        if (!eventData.title || !eventData.start_date || !eventData.end_date) {
          return response.status(400).json({
            error: 'Title, start date, and end date are required',
          });
        }

        // Create event
        const { data: newEvent, error: createError } = await supabase
          .from('events')
          .insert([eventData])
          .select()
          .single();

        if (createError) throw createError;

        return response.status(201).json({
          message: 'Event created successfully',
          data: newEvent,
        });

      case 'PUT':
        // Update an event (admin only)
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
          return response.status(400).json({ error: 'Event ID is required' });
        }

        const updateData: EventUpdate = request.body;
        const { data: updatedEvent, error: updateError } = await supabase
          .from('events')
          .update(updateData)
          .eq('id', id)
          .select()
          .single();

        if (updateError) throw updateError;

        return response.status(200).json({
          message: 'Event updated successfully',
          data: updatedEvent,
        });

      case 'DELETE':
        // Soft delete an event (admin only)
        const { data: deleteAuthData, error: deleteAuthError } = await supabase.auth.getUser();
        
        if (deleteAuthError || !deleteAuthData.user) {
          return response.status(401).json({ error: 'Unauthorized' });
        }

        // Check if user is admin
        const { data: deleteAdminData, error: deleteAdminError } = await supabase
          .from('users')
          .select('role')
          .eq('id', deleteAuthData.user.id)
          .single();

        if (deleteAdminError || deleteAdminData?.role !== 'admin') {
          return response.status(403).json({ error: 'Forbidden' });
        }

        const { eventId } = request.query;
        if (!eventId) {
          return response.status(400).json({ error: 'Event ID is required' });
        }

        // Soft delete by setting is_active to false
        const { error: deleteError } = await supabase
          .from('events')
          .update({ is_active: false })
          .eq('id', eventId);

        if (deleteError) throw deleteError;

        return response.status(204).end();

      default:
        return response.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    return response.status(500).json({ error: 'Internal Server Error' });
  }
} 