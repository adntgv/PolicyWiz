-- PolicyWiz: policies table
-- Run this migration against your Supabase project

CREATE TABLE IF NOT EXISTS policies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  anonymous_token TEXT,
  short_code TEXT UNIQUE NOT NULL,
  policy_type TEXT NOT NULL CHECK (policy_type IN ('privacy', 'terms', 'cookies', 'refund', 'dmca')),
  app_name TEXT NOT NULL,
  app_url TEXT,
  content TEXT NOT NULL,
  questionnaire JSONB,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_policies_short_code ON policies(short_code);
CREATE INDEX IF NOT EXISTS idx_policies_anonymous_token ON policies(anonymous_token);
CREATE INDEX IF NOT EXISTS idx_policies_user_id ON policies(user_id);
CREATE INDEX IF NOT EXISTS idx_policies_is_published ON policies(is_published);

-- Row Level Security
ALTER TABLE policies ENABLE ROW LEVEL SECURITY;

-- Policy: Users can manage their own policies
CREATE POLICY "Users manage own policies" ON policies
  FOR ALL
  USING (auth.uid() = user_id OR user_id IS NULL);

-- Policy: Anyone can view published policies (for public hosted pages)
CREATE POLICY "Anyone can view published" ON policies
  FOR SELECT
  USING (is_published = TRUE);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_policies_updated_at
  BEFORE UPDATE ON policies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
