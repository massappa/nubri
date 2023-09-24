-- Create moddatetime function
CREATE OR REPLACE FUNCTION moddatetime(column_name TEXT)
RETURNS TRIGGER AS $$
BEGIN
  NEW."updated_at" := CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Rest of your tables and triggers
-- ...

-- profiles table
CREATE TABLE public.profiles (
  -- [Same as your original code]
  -- ...
);

-- categories table
CREATE TABLE public.categories (
  -- [Same as your original code]
  -- ...
);

-- posts table
CREATE TABLE public.posts (
  -- [Same as your original code]
  -- ...
);

-- Trigger for posts
CREATE TRIGGER handle_updated_at BEFORE
UPDATE ON posts FOR EACH ROW
EXECUTE FUNCTION moddatetime ('updated_at');

-- comments table
CREATE TABLE public.comments (
  -- [Same as your original code]
  -- ...
);

-- bookmarks table
CREATE TABLE public.bookmarks (
  -- [Same as your original code]
  -- ...
);

-- drafts table
CREATE TABLE public.drafts (
  -- [Same as your original code]
  -- ...
);

-- Trigger for drafts
CREATE TRIGGER handle_updated_at BEFORE
UPDATE ON drafts FOR EACH ROW
EXECUTE FUNCTION moddatetime ('updated_at');
