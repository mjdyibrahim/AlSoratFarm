import { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase';

type Booking = Database['public']['Tables']['bookings']['Row'];
type BookingInsert = Database['public']['Tables']['bookings']['Insert'];
type BookingUpdate = Database['public']['Tables']['bookings']['Update'];

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  try {
    switch (request.method) {
      case 'GET':
        // Get bookings (user can see their own, admin can see all)
        const { data: authData, error: authError } = await supabase.auth.getUser();
        
        if (authError || !authData.user) {
          return response.status(401).json({ error: 'Unauthorized' });
        }

        // Check user role
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('role')
          .eq('id', authData.user.id)
          .single();

        if (userError) throw userError;

        const { event_id, status, page = '1', limit = '10' } = request.query;
        const offset = (parseInt(page as string) - 1) * parseInt(limit as string);

        let query = supabase
          .from('bookings')
          .select('*, events!inner(*)', { count: 'exact' })
          .order('created_at', { ascending: false })
          .range(offset, offset + parseInt(limit as string) - 1);

        // If not admin, only show user's own bookings
        if (userData.role !== 'admin') {
          query = query.eq('user_id', authData.user.id);
        }

        if (event_id) {
          query = query.eq('event_id', event_id);
        }
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

      case 'POST':
        // Create a new booking
        const bookingData: BookingInsert = request.body;

        // Validate required fields
        if (!bookingData.event_id || !bookingData.contact_name || !bookingData.contact_email) {
          return response.status(400).json({
            error: 'Event ID, contact name, and contact email are required',
          });
        }

        // Check if event exists and has capacity
        const { data: event, error: eventError } = await supabase
          .from('events')
          .select('capacity, title')
          .eq('id', bookingData.event_id)
          .eq('is_active', true)
          .single();

        if (eventError || !event) {
          return response.status(404).json({ error: 'Event not found' });
        }

        // Check capacity if specified
        if (event.capacity !== null) {
          const { data: currentBookings, error: bookingsError } = await supabase
            .from('bookings')
            .select('attendees')
            .eq('event_id', bookingData.event_id)
            .eq('status', 'confirmed');

          if (bookingsError) throw bookingsError;

          const totalAttendees = currentBookings.reduce((sum, booking) => sum + booking.attendees, 0);
          const requestedAttendees = bookingData.attendees || 1;

          if (totalAttendees + requestedAttendees > event.capacity) {
            return response.status(400).json({ error: 'Event is at capacity' });
          }
        }

        // If user is logged in, associate booking with user
        const { data: { user }, error: createAuthError } = await supabase.auth.getUser();
        if (!createAuthError && user) {
          bookingData.user_id = user.id;
        }

        // Create booking
        const { data: newBooking, error: createError } = await supabase
          .from('bookings')
          .insert([bookingData])
          .select()
          .single();

        if (createError) throw createError;

        return response.status(201).json({
          message: 'Booking created successfully',
          data: newBooking,
        });

      case 'PUT':
        // Update a booking (user can update their own, admin can update any)
        const { data: updateAuthData, error: updateAuthError } = await supabase.auth.getUser();
        
        if (updateAuthError || !updateAuthData.user) {
          return response.status(401).json({ error: 'Unauthorized' });
        }

        const { id } = request.query;
        if (!id) {
          return response.status(400).json({ error: 'Booking ID is required' });
        }

        // Check user role and booking ownership
        const { data: updateUserData, error: updateUserError } = await supabase
          .from('users')
          .select('role')
          .eq('id', updateAuthData.user.id)
          .single();

        if (updateUserError) throw updateUserError;

        // If not admin, verify ownership
        if (updateUserData.role !== 'admin') {
          const { data: bookingCheck, error: bookingCheckError } = await supabase
            .from('bookings')
            .select('user_id')
            .eq('id', id)
            .single();

          if (bookingCheckError || bookingCheck.user_id !== updateAuthData.user.id) {
            return response.status(403).json({ error: 'Forbidden' });
          }
        }

        const updateData: BookingUpdate = request.body;
        const { data: updatedBooking, error: updateError } = await supabase
          .from('bookings')
          .update(updateData)
          .eq('id', id)
          .select()
          .single();

        if (updateError) throw updateError;

        return response.status(200).json({
          message: 'Booking updated successfully',
          data: updatedBooking,
        });

      case 'DELETE':
        // Cancel a booking (user can cancel their own, admin can cancel any)
        const { data: cancelAuthData, error: cancelAuthError } = await supabase.auth.getUser();
        
        if (cancelAuthError || !cancelAuthData.user) {
          return response.status(401).json({ error: 'Unauthorized' });
        }

        const { bookingId } = request.query;
        if (!bookingId) {
          return response.status(400).json({ error: 'Booking ID is required' });
        }

        // Check user role and booking ownership
        const { data: cancelUserData, error: cancelUserError } = await supabase
          .from('users')
          .select('role')
          .eq('id', cancelAuthData.user.id)
          .single();

        if (cancelUserError) throw cancelUserError;

        // If not admin, verify ownership
        if (cancelUserData.role !== 'admin') {
          const { data: bookingCheck, error: bookingCheckError } = await supabase
            .from('bookings')
            .select('user_id')
            .eq('id', bookingId)
            .single();

          if (bookingCheckError || bookingCheck.user_id !== cancelAuthData.user.id) {
            return response.status(403).json({ error: 'Forbidden' });
          }
        }

        // Cancel booking by updating status
        const { error: cancelError } = await supabase
          .from('bookings')
          .update({ status: 'cancelled' })
          .eq('id', bookingId);

        if (cancelError) throw cancelError;

        return response.status(204).end();

      default:
        return response.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    return response.status(500).json({ error: 'Internal Server Error' });
  }
} 