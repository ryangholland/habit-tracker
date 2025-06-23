import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wpamautqijlpvjmnksnl.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndwYW1hdXRxaWpscHZqbW5rc25sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2Nzg4MTAsImV4cCI6MjA2NjI1NDgxMH0.FHTpIbMl9yR9Z4A3uucm2jFppw5NcTrSnyqiVyBiogA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
