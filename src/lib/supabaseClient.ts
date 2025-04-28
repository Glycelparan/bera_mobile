import { createClient } from "@supabase/supabase-js";

// Default Supabase URL and key for development
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://xyzcompany.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtdGt4eHJwdWx6YnZpaWpjcG92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5MDgxNjksImV4cCI6MjAxNTQ4NDE2OX0.S_3N5X_b5qGH5xfX9AKoLtOxUwW9F3Th9OqQV8mJCxM";

// Create a mock client for development
const mockClient = {
  auth: {
    signUp: async ({ email, password }) => {
      // Store user in localStorage for development purposes
      const users = JSON.parse(localStorage.getItem("mockUsers") || "[]");
      const existingUser = users.find((user) => user.email === email);

      if (existingUser) {
        return { error: { message: "User already exists" } };
      }

      users.push({ email, password });
      localStorage.setItem("mockUsers", JSON.stringify(users));

      return { data: { user: { email } }, error: null };
    },
    signInWithPassword: async ({ email, password }) => {
      const users = JSON.parse(localStorage.getItem("mockUsers") || "[]");
      const user = users.find(
        (user) => user.email === email && user.password === password,
      );

      if (user) {
        return { data: { user: { email } }, error: null };
      } else {
        return {
          data: { user: null },
          error: { message: "Invalid login credentials" },
        };
      }
    },
    signOut: async () => {
      localStorage.removeItem("currentUser");
      return { error: null };
    },
    getSession: async () => {
      const currentUser = localStorage.getItem("currentUser");
      if (currentUser) {
        return {
          data: { session: { user: JSON.parse(currentUser) } },
          error: null,
        };
      }
      return { data: { session: null }, error: null };
    },
  },
};

// Export the mock client for development
export const supabase = mockClient;

console.info("Using mock Supabase client for development");
