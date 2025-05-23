import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://njioghvekaxlakdtfjww.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qaW9naHZla2F4bGFrZHRmand3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczOTExOTMsImV4cCI6MjA2Mjk2NzE5M30.y5Q5cDP7cfF9nxVqPz1bVp4c3SvlgSRkFzp6n5DYdO8"
export const supabase = createClient(supabaseUrl, supabaseKey)