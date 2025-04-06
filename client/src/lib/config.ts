export const API_BASE_URL = import.meta.env.PROD
  ? "https://alsoratfarm.replit.dev/api" // Production API URL
  : "http://localhost:5000/api"; // Development API URL

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
