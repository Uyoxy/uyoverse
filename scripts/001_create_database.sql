-- Create database schema for CodeVerse

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    wallet_address VARCHAR(66), -- Starknet address
    strk_balance DECIMAL(18, 6) DEFAULT 0,
    total_earned DECIMAL(18, 6) DEFAULT 0,
    posts_count INTEGER DEFAULT 0,
    followers_count INTEGER DEFAULT 0,
    following_count INTEGER DEFAULT 0,
    avatar_url VARCHAR(255),
    bio TEXT,
    location VARCHAR(100),
    website VARCHAR(255),
    github_username VARCHAR(100),
    twitter_username VARCHAR(100),
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    last_login_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    code TEXT NOT NULL,
    language VARCHAR(50) NOT NULL,
    tags TEXT[], -- Array of tags
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    likes_count INTEGER DEFAULT 0,
    shares_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    earned_strk DECIMAL(18, 6) DEFAULT 0,
    is_trending BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Likes table
CREATE TABLE IF NOT EXISTS likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(post_id, user_id)
);

-- Shares table
CREATE TABLE IF NOT EXISTS shares (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    platform VARCHAR(50), -- twitter, linkedin, etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES comments(id) ON DELETE CASCADE, -- For nested comments
    content TEXT NOT NULL,
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Follows table
CREATE TABLE IF NOT EXISTS follows (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    follower_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    following_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(follower_id, following_id)
);

-- Rewards table
CREATE TABLE IF NOT EXISTS rewards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    post_id UUID REFERENCES posts(id) ON DELETE SET NULL,
    amount DECIMAL(18, 6) NOT NULL,
    reason VARCHAR(100) NOT NULL, -- 'like', 'share', 'trending_bonus', etc.
    transaction_hash VARCHAR(66), -- Starknet transaction hash
    status VARCHAR(20) DEFAULT 'pending', -- pending, completed, failed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Conversions table (STRK to USDT)
CREATE TABLE IF NOT EXISTS conversions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    strk_amount DECIMAL(18, 6) NOT NULL,
    usdt_amount DECIMAL(18, 6) NOT NULL,
    exchange_rate DECIMAL(18, 6) NOT NULL,
    transaction_hash VARCHAR(66), -- Starknet transaction hash
    status VARCHAR(20) DEFAULT 'pending', -- pending, completed, failed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trending topics table
CREATE TABLE IF NOT EXISTS trending_topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tag VARCHAR(100) NOT NULL,
    posts_count INTEGER DEFAULT 0,
    growth_percentage DECIMAL(5, 2) DEFAULT 0,
    period VARCHAR(20) DEFAULT 'week', -- day, week, month
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_posts_author_id ON posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_trending ON posts(is_trending, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_language ON posts(language);
CREATE INDEX IF NOT EXISTS idx_posts_tags ON posts USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_likes_post_id ON likes(post_id);
CREATE INDEX IF NOT EXISTS idx_likes_user_id ON likes(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_follows_follower_id ON follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_following_id ON follows(following_id);
CREATE INDEX IF NOT EXISTS idx_rewards_user_id ON rewards(user_id);
CREATE INDEX IF NOT EXISTS idx_conversions_user_id ON conversions(user_id);
