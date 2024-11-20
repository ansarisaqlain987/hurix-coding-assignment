export const API_KEY = import.meta.env.VITE_APP_API_KEY ?? "";
export const MAX_RESULTS =
  (import.meta.env.VITE_APP_MAX_RESULTS &&
    Number(import.meta.env.VITE_APP_MAX_RESULTS)) ||
  12;
