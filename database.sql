-- Recipe Management System Database Schema
-- Using  MySQL

-- Users table for storing user profiles
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(100),
  cooking_skill_level VARCHAR(20) DEFAULT 'beginner' CHECK (cooking_skill_level IN ('beginner', 'intermediate', 'advanced')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add username column if it doesn't exist (for existing databases)
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'username') THEN
    ALTER TABLE users ADD COLUMN username VARCHAR(100) UNIQUE;
  END IF;
END $$;

-- Dietary preferences table (many-to-many relationship with users)
CREATE TABLE IF NOT EXISTS dietary_preferences (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

-- User dietary preferences junction table
CREATE TABLE IF NOT EXISTS user_dietary_preferences (
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  preference_id INTEGER REFERENCES dietary_preferences(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, preference_id)
);

-- Allergies table
CREATE TABLE IF NOT EXISTS allergies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

-- User allergies junction table
CREATE TABLE IF NOT EXISTS user_allergies (
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  allergy_id INTEGER REFERENCES allergies(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, allergy_id)
);

-- Ingredients to avoid (user-specific)
CREATE TABLE IF NOT EXISTS user_avoided_ingredients (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ingredient_name VARCHAR(100) NOT NULL
);

-- Favorite ingredients (user-specific)
CREATE TABLE IF NOT EXISTS user_favorite_ingredients (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ingredient_name VARCHAR(100) NOT NULL
);

-- Cached recipes from API (to reduce API calls)
CREATE TABLE IF NOT EXISTS cached_recipes (
  id SERIAL PRIMARY KEY,
  api_recipe_id INTEGER UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  image_url TEXT,
  ready_in_minutes INTEGER,
  servings INTEGER,
  cuisine_type VARCHAR(100),
  meal_type VARCHAR(100),
  dietary_info JSONB,
  ingredients JSONB,
  instructions TEXT,
  nutrition JSONB,
  cached_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Recipe ratings and reviews
CREATE TABLE IF NOT EXISTS recipe_reviews (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  recipe_api_id INTEGER NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, recipe_api_id)
);

-- User sessions for authentication
CREATE TABLE IF NOT EXISTS user_sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  session_token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default dietary preferences
INSERT INTO dietary_preferences (name) VALUES 
  ('vegetarian'),
  ('vegan'),
  ('gluten-free'),
  ('dairy-free'),
  ('keto'),
  ('paleo'),
  ('low-carb'),
  ('pescatarian')
ON CONFLICT (name) DO NOTHING;

-- Insert common allergies
INSERT INTO allergies (name) VALUES 
  ('peanuts'),
  ('tree nuts'),
  ('milk'),
  ('eggs'),
  ('wheat'),
  ('soy'),
  ('fish'),
  ('shellfish'),
  ('sesame')
ON CONFLICT (name) DO NOTHING;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_cached_recipes_api_id ON cached_recipes(api_recipe_id);
CREATE INDEX IF NOT EXISTS idx_recipe_reviews_recipe_id ON recipe_reviews(recipe_api_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_user_sessions_expires ON user_sessions(expires_at);
