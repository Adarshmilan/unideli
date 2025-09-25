// js/supabaseClient.js

// IMPORTANT: In a real app, you might use import/export, 
// but for a simple multi-page HTML/JS setup, we'll make the client globally available.

const SUPABASE_URL = 'https://nlwmugvoyddgzxetjwid.supabase.co'; // Paste your URL here
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sd211Z3ZveWRkZ3p4ZXRqd2lkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MTgzODgsImV4cCI6MjA3NDI5NDM4OH0.BKmz4JMadkm-ZXj2iU3-2cQ-B-vbVKrv1mme0RbzMTY'; // Paste your anon key here

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);