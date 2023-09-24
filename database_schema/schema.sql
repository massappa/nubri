-- profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NULL,
  username TEXT NULL,
  full_name TEXT NULL,
  avatar_url TEXT NULL,
  website TEXT NULL,
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_username_key UNIQUE (username),
  CONSTRAINT username_length CHECK ((CHAR_LENGTH(username) >= 3))
) TABLESPACE pg_default;

-- categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  title TEXT NULL DEFAULT ''::TEXT,
  created_at TIMESTAMP WITH TIME ZONE NULL DEFAULT NOW(),
  slug TEXT NULL,
  CONSTRAINT category_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;

-- posts table
CREATE TABLE public.posts (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  category_id UUID NULL,
  title TEXT NULL,
  image TEXT NULL,
  description TEXT NULL,
  content TEXT NULL,
  created_at TIMESTAMP WITH TIME ZONE NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NULL,
  slug TEXT NULL DEFAULT ''::TEXT,
  author_id UUID NULL,
  published BOOLEAN NULL DEFAULT FALSE,
  CONSTRAINT post_pkey PRIMARY KEY (id),
  CONSTRAINT posts_author_id_fkey FOREIGN KEY (author_id) REFERENCES profiles (id),
  CONSTRAINT posts_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories (id)
) TABLESPACE pg_default;

-- comments table
CREATE TABLE public.comments (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  comment TEXT NULL DEFAULT ''::TEXT,
  created_at TIMESTAMP WITH TIME ZONE NULL DEFAULT NOW(),
  user_id UUID NULL,
  post_id UUID NULL,
  CONSTRAINT comments_pkey PRIMARY KEY (id),
  CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE,
  CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES profiles (id) ON DELETE CASCADE
) TABLESPACE pg_default;

-- bookmarks table
CREATE TABLE public.bookmarks (
  id UUID NOT NULL,
  user_id UUID NULL,
  created_at TIMESTAMP WITH TIME ZONE NULL DEFAULT NOW(),
  CONSTRAINT bookmarks_pkey PRIMARY KEY (id),
  CONSTRAINT bookmarks_id_fkey FOREIGN KEY (id) REFERENCES posts (id) ON DELETE CASCADE,
  CONSTRAINT bookmarks_user_id_fkey FOREIGN KEY (user_id) REFERENCES profiles (id) ON DELETE CASCADE
) TABLESPACE pg_default;

-- drafts table
CREATE TABLE public.drafts (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  category_id UUID NULL,
  title TEXT NULL DEFAULT 'Untitled'::TEXT,
  slug TEXT NULL DEFAULT 'untitled'::TEXT,
  image TEXT NULL,
  description TEXT NULL,
  content TEXT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITHOUT TIME ZONE NULL,
  author_id UUID NULL,
  published BOOLEAN NULL DEFAULT FALSE,
  CONSTRAINT drafts_pkey PRIMARY KEY (id),
  CONSTRAINT drafts_author_id_fkey FOREIGN KEY (author_id) REFERENCES profiles (id),
  CONSTRAINT drafts_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE
) TABLESPACE pg_default;

-- Trigger for posts
CREATE TRIGGER handle_updated_at BEFORE
UPDATE ON posts FOR EACH ROW
EXECUTE FUNCTION moddatetime ('updated_at');

-- Trigger for drafts
CREATE TRIGGER handle_updated_at BEFORE
UPDATE ON drafts FOR EACH ROW
EXECUTE FUNCTION moddatetime ('updated_at');
