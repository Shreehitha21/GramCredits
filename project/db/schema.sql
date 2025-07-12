-- schema.sql
-- GreenLoop Database Structure

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT UNIQUE,
  role TEXT CHECK (role IN ('farmer', 'sponsor', 'admin')) DEFAULT 'farmer',
  ssid TEXT UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE green_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  type TEXT CHECK (type IN ('tree', 'solar', 'soil', 'other')),
  location GEOGRAPHY(Point, 4326),
  image_url TEXT,
  verified BOOLEAN DEFAULT FALSE,
  verified_by TEXT,
  timestamp TIMESTAMP DEFAULT NOW()
);

CREATE TABLE nfts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action_id UUID REFERENCES green_actions(id),
  token_id TEXT UNIQUE,
  ipfs_url TEXT,
  minted_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE gram_credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  amount NUMERIC DEFAULT 0,
  last_updated TIMESTAMP DEFAULT NOW()
);

CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id UUID REFERENCES users(id),
  seller_id UUID REFERENCES users(id),
  action_id UUID REFERENCES green_actions(id),
  amount NUMERIC,
  status TEXT CHECK (status IN ('pending', 'completed', 'failed')) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE learning_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  module_name TEXT,
  completed BOOLEAN DEFAULT FALSE,
  score INTEGER DEFAULT 0,
  completed_at TIMESTAMP
);

CREATE TABLE impact_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  region TEXT,
  estimated_co2_saved_kg NUMERIC,
  prediction_date DATE,
  model_version TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
