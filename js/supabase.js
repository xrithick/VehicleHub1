/**
 * VehicleHub - Supabase Configuration & Client Initialization
 * 
 * INSTRUCTIONS FOR USER / EXAMINER:
 * 1. Create a free account at https://supabase.com
 * 2. Create a new project named "VehicleHub"
 * 3. Go to Project Settings -> API
 * 4. Copy your Project URL and anon (public) key
 * 5. Replace the placeholder values below:
 */

// ===================================================================
// SUPABASE CONFIGURATION
// Replace these placeholders with your actual Supabase project credentials
// ===================================================================
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

// Helper to check if user has configured Supabase credentials
function isSupabaseConfigured() {
  return (
    typeof SUPABASE_URL === "string" &&
    typeof SUPABASE_ANON_KEY === "string" &&
    SUPABASE_URL !== "YOUR_SUPABASE_URL" &&
    SUPABASE_ANON_KEY !== "YOUR_SUPABASE_ANON_KEY" &&
    SUPABASE_URL.startsWith("https://")
  );
}

// Initialize Supabase Client
let supabaseClient = null;

if (typeof window !== "undefined" && window.supabase && isSupabaseConfigured()) {
  try {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log(" VehicleHub: Connected to live Supabase instance.");
  } catch (error) {
    console.error("VehicleHub: Error initializing Supabase client:", error);
  }
} else {
  console.info(
    " VehicleHub [Notice]: Supabase credentials are not configured yet or Supabase SDK is loading. Running in academic demo/fallback mode."
  );
}

/**
 * Toast notification utility for user-friendly error/success messages
 */
function showToast(message, type = "info") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  const icon = type === "success" ? "✓" : type === "error" ? "⚠" : "ℹ";
  toast.innerHTML = `<span><strong>${icon}</strong> ${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
