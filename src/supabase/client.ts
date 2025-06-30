import { createBrowserClient } from "@supabase/ssr";
import { supabaseKey, supabaseUrl } from "./constants";

export const createClient = () =>
  createBrowserClient(supabaseUrl!, supabaseKey!);

export const supabase = createClient();
