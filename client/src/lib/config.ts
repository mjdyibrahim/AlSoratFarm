
export const API_BASE_URL = import.meta.env.PROD 
  ? "https://your-repl-deployment-url.replit.dev/api"  // This will be updated after API deployment
  : "http://localhost:5000/api";
