export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          created_at: string
          email: string
          name: string | null
          avatar_url: string | null
          role: 'user' | 'admin'
          is_active: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          email: string
          name?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin'
          is_active?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          name?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin'
          is_active?: boolean
        }
      }
      profiles: {
        Row: {
          id: string
          updated_at: string
          bio: string | null
          phone: string | null
          address: string | null
          preferences: Json
        }
        Insert: {
          id: string
          updated_at?: string
          bio?: string | null
          phone?: string | null
          address?: string | null
          preferences?: Json
        }
        Update: {
          id?: string
          updated_at?: string
          bio?: string | null
          phone?: string | null
          address?: string | null
          preferences?: Json
        }
      }
      products: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          description: string | null
          price: number
          image_url: string | null
          category: string | null
          stock: number
          is_active: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          description?: string | null
          price: number
          image_url?: string | null
          category?: string | null
          stock?: number
          is_active?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          description?: string | null
          price?: number
          image_url?: string | null
          category?: string | null
          stock?: number
          is_active?: boolean
        }
      }
      orders: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string | null
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total_amount: number
          shipping_address: string | null
          payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string | null
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total_amount: number
          shipping_address?: string | null
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded'
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string | null
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total_amount?: number
          shipping_address?: string | null
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded'
        }
      }
      order_items: {
        Row: {
          id: string
          created_at: string
          order_id: string
          product_id: string | null
          quantity: number
          unit_price: number
          total_price: number
        }
        Insert: {
          id?: string
          created_at?: string
          order_id: string
          product_id?: string | null
          quantity: number
          unit_price: number
          total_price: number
        }
        Update: {
          id?: string
          created_at?: string
          order_id?: string
          product_id?: string | null
          quantity?: number
          unit_price?: number
          total_price?: number
        }
      }
      events: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          description: string | null
          start_date: string
          end_date: string
          location: string | null
          capacity: number | null
          image_url: string | null
          is_active: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          description?: string | null
          start_date: string
          end_date: string
          location?: string | null
          capacity?: number | null
          image_url?: string | null
          is_active?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          description?: string | null
          start_date?: string
          end_date?: string
          location?: string | null
          capacity?: number | null
          image_url?: string | null
          is_active?: boolean
        }
      }
      bookings: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string | null
          event_id: string
          status: 'pending' | 'confirmed' | 'cancelled'
          attendees: number
          contact_name: string
          contact_email: string
          contact_phone: string | null
          special_requests: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string | null
          event_id: string
          status?: 'pending' | 'confirmed' | 'cancelled'
          attendees?: number
          contact_name: string
          contact_email: string
          contact_phone?: string | null
          special_requests?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string | null
          event_id?: string
          status?: 'pending' | 'confirmed' | 'cancelled'
          attendees?: number
          contact_name?: string
          contact_email?: string
          contact_phone?: string | null
          special_requests?: string | null
        }
      }
      contact_messages: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string
          phone: string | null
          subject: string
          message: string
          status: 'unread' | 'read' | 'replied'
          replied_at: string | null
          replied_by: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          email: string
          phone?: string | null
          subject: string
          message: string
          status?: 'unread' | 'read' | 'replied'
          replied_at?: string | null
          replied_by?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          email?: string
          phone?: string | null
          subject?: string
          message?: string
          status?: 'unread' | 'read' | 'replied'
          replied_at?: string | null
          replied_by?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      handle_new_user: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
} 