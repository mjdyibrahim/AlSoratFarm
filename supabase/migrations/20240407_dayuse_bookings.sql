-- Create dayuse_bookings table
CREATE TABLE IF NOT EXISTS public.dayuse_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  date DATE NOT NULL,
  arrival_time TIME NOT NULL,
  adults INTEGER NOT NULL,
  children INTEGER DEFAULT 0,
  lunch_required BOOLEAN DEFAULT false,
  dietary_restrictions TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  special_requests TEXT
);

-- Enable RLS
ALTER TABLE public.dayuse_bookings ENABLE ROW LEVEL SECURITY;

-- Dayuse bookings policies
CREATE POLICY "Anyone can create dayuse bookings" ON public.dayuse_bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Only admins can view dayuse bookings" ON public.dayuse_bookings
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Only admins can update dayuse bookings" ON public.dayuse_bookings
  FOR UPDATE USING (EXISTS (
    SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'
  )); 