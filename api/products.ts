import { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase';

type Product = Database['public']['Tables']['products']['Row'];

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  try {
    switch (request.method) {
      case 'GET':
        // Get all products or filter by category
        const { category } = request.query;
        
        let query = supabase
          .from('products')
          .select('*')
          .eq('is_active', true);
        
        if (category) {
          query = query.eq('category', category);
        }
        
        const { data: products, error } = await query;
        
        if (error) throw error;
        
        return response.status(200).json(products);
        
      case 'POST':
        // Create a new product (admin only)
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
        
        // Create product
        const { data: newProduct, error: createError } = await supabase
          .from('products')
          .insert([request.body])
          .select()
          .single();
        
        if (createError) throw createError;
        
        return response.status(201).json(newProduct);
        
      case 'PUT':
        // Update a product (admin only)
        const { id } = request.query;
        
        if (!id) {
          return response.status(400).json({ error: 'Product ID is required' });
        }
        
        const { data: updateAuthData, error: updateAuthError } = await supabase.auth.getUser();
        
        if (updateAuthError || !updateAuthData.user) {
          return response.status(401).json({ error: 'Unauthorized' });
        }
        
        // Check if user is admin
        const { data: adminUser, error: adminError } = await supabase
          .from('users')
          .select('role')
          .eq('id', updateAuthData.user.id)
          .single();
        
        if (adminError || adminUser?.role !== 'admin') {
          return response.status(403).json({ error: 'Forbidden' });
        }
        
        // Update product
        const { data: updatedProduct, error: updateError } = await supabase
          .from('products')
          .update(request.body)
          .eq('id', id)
          .select()
          .single();
        
        if (updateError) throw updateError;
        
        return response.status(200).json(updatedProduct);
        
      case 'DELETE':
        // Delete a product (admin only)
        const { productId } = request.query;
        
        if (!productId) {
          return response.status(400).json({ error: 'Product ID is required' });
        }
        
        const { data: deleteAuthData, error: deleteAuthError } = await supabase.auth.getUser();
        
        if (deleteAuthError || !deleteAuthData.user) {
          return response.status(401).json({ error: 'Unauthorized' });
        }
        
        // Check if user is admin
        const { data: deleteAdmin, error: deleteAdminError } = await supabase
          .from('users')
          .select('role')
          .eq('id', deleteAuthData.user.id)
          .single();
        
        if (deleteAdminError || deleteAdmin?.role !== 'admin') {
          return response.status(403).json({ error: 'Forbidden' });
        }
        
        // Delete product (soft delete by setting is_active to false)
        const { error: deleteError } = await supabase
          .from('products')
          .update({ is_active: false })
          .eq('id', productId);
        
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