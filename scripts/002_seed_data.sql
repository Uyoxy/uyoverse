-- Seed initial data for CodeVerse

-- Insert sample users
INSERT INTO users (username, email, password_hash, wallet_address, strk_balance, total_earned, posts_count, bio) VALUES
('CodeWizard', 'wizard@codeverse.dev', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq5S/kS', '0x1234567890abcdef1234567890abcdef12345678', 127.5, 342.8, 23, 'Full-stack wizard crafting digital spells 🧙‍♂️'),
('StarkDev', 'stark@codeverse.dev', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq5S/kS', '0xabcdef1234567890abcdef1234567890abcdef12', 89.3, 156.7, 15, 'Cairo enthusiast building the future on Starknet 🚀'),
('PyMaster', 'python@codeverse.dev', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq5S/kS', '0x9876543210fedcba9876543210fedcba98765432', 203.1, 445.6, 31, 'Python ninja with a passion for clean code 🐍'),
('ReactGuru', 'react@codeverse.dev', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq5S/kS', '0xfedcba9876543210fedcba9876543210fedcba98', 156.8, 289.4, 19, 'React hooks master, making components dance 💃');

-- Insert sample posts
INSERT INTO posts (title, description, code, language, tags, author_id, likes_count, shares_count, comments_count, earned_strk, is_trending) VALUES
('This React hook will absolutely send you to the moon 🚀', 
 'A custom hook that manages state with superpowers and makes your components absolutely bussin',
 'const useAwesome = () => {
  const [isAwesome, setAwesome] = useState(true)
  const [level, setLevel] = useState(9000)
  
  const makeMoreAwesome = useCallback(() => {
    setAwesome(prev => !prev)
    setLevel(prev => prev + 1000)
  }, [])
  
  return { 
    isAwesome, 
    level,
    makeMoreAwesome,
    status: isAwesome ? "absolutely sending it 🔥" : "still pretty fire 💯"
  }
}',
 'javascript',
 ARRAY['react', 'hooks', 'javascript', 'custom-hooks', 'state-management'],
 (SELECT id FROM users WHERE username = 'CodeWizard'),
 1247, 89, 156, 23.5, true),

('Cairo smart contract that''s absolutely bussin 💎',
 'This Cairo contract handles rewards distribution with zero cap energy',
 '#[starknet::contract]
mod RewardDistributor {
    use starknet::{ContractAddress, get_caller_address};
    
    #[storage]
    struct Storage {
        rewards: LegacyMap<ContractAddress, u256>,
        total_distributed: u256,
    }
    
    #[external(v0)]
    fn distribute_reward(ref self: ContractState, user: ContractAddress, amount: u256) {
        let current = self.rewards.read(user);
        self.rewards.write(user, current + amount);
        
        let total = self.total_distributed.read();
        self.total_distributed.write(total + amount);
    }
    
    #[external(v0)]
    fn get_user_rewards(self: @ContractState, user: ContractAddress) -> u256 {
        self.rewards.read(user)
    }
}',
 'cairo',
 ARRAY['cairo', 'starknet', 'smart-contracts', 'rewards', 'web3'],
 (SELECT id FROM users WHERE username = 'StarkDev'),
 892, 67, 94, 18.2, false),

('Python algorithm that hits different (no cap) 🔥',
 'Machine learning algorithm that''s so clean it makes other code jealous',
 'import numpy as np
from sklearn.base import BaseEstimator, TransformerMixin

class MindBlowingTransformer(BaseEstimator, TransformerMixin):
    """This transformer is absolutely sending it 🚀"""
    
    def __init__(self, power_level=9000):
        self.power_level = power_level
        self.is_trained = False
    
    def fit(self, X, y=None):
        """Fit the transformer (it''s giving main character energy)"""
        self.feature_means_ = np.mean(X, axis=0)
        self.feature_stds_ = np.std(X, axis=0)
        self.is_trained = True
        return self
    
    def transform(self, X):
        """Transform data (this is where the magic happens ✨)"""
        if not self.is_trained:
            raise ValueError("Transformer not fitted yet (touch grass first)")
        
        # Normalize with extra sauce
        X_normalized = (X - self.feature_means_) / (self.feature_stds_ + 1e-8)
        
        # Add some spice based on power level
        return X_normalized * (self.power_level / 9000)
    
    def get_feature_names_out(self, input_features=None):
        """Return feature names (they''re all bangers)"""
        if input_features is None:
            return [f"feature_{i}_enhanced" for i in range(len(self.feature_means_))]
        return [f"{name}_enhanced" for name in input_features]

# Usage example (this will blow your mind 🤯)
transformer = MindBlowingTransformer(power_level=10000)
# Your data will never be the same',
 'python',
 ARRAY['python', 'machine-learning', 'sklearn', 'data-science', 'algorithms'],
 (SELECT id FROM users WHERE username = 'PyMaster'),
 2156, 134, 287, 41.7, true);

-- Insert sample likes
INSERT INTO likes (post_id, user_id) VALUES
((SELECT id FROM posts WHERE title LIKE 'This React hook%'), (SELECT id FROM users WHERE username = 'StarkDev')),
((SELECT id FROM posts WHERE title LIKE 'This React hook%'), (SELECT id FROM users WHERE username = 'PyMaster')),
((SELECT id FROM posts WHERE title LIKE 'Cairo smart contract%'), (SELECT id FROM users WHERE username = 'CodeWizard')),
((SELECT id FROM posts WHERE title LIKE 'Python algorithm%'), (SELECT id FROM users WHERE username = 'ReactGuru'));

-- Insert sample comments
INSERT INTO comments (post_id, user_id, content) VALUES
((SELECT id FROM posts WHERE title LIKE 'This React hook%'), 
 (SELECT id FROM users WHERE username = 'StarkDev'), 
 'This hook is absolutely sending me! 🚀 The way you handled the state management is chef''s kiss 👨‍🍳💋'),
((SELECT id FROM posts WHERE title LIKE 'Cairo smart contract%'), 
 (SELECT id FROM users WHERE username = 'PyMaster'), 
 'Yo this Cairo code is bussin fr fr 💯 The reward distribution logic is clean AF'),
((SELECT id FROM posts WHERE title LIKE 'Python algorithm%'), 
 (SELECT id FROM users WHERE username = 'CodeWizard'), 
 'This algorithm hits different! The power level feature is genius 🧠✨');

-- Insert sample rewards
INSERT INTO rewards (user_id, post_id, amount, reason, status) VALUES
((SELECT id FROM users WHERE username = 'CodeWizard'), 
 (SELECT id FROM posts WHERE title LIKE 'This React hook%'), 
 12.47, 'likes', 'completed'),
((SELECT id FROM users WHERE username = 'StarkDev'), 
 (SELECT id FROM posts WHERE title LIKE 'Cairo smart contract%'), 
 8.92, 'likes', 'completed'),
((SELECT id FROM users WHERE username = 'PyMaster'), 
 (SELECT id FROM posts WHERE title LIKE 'Python algorithm%'), 
 21.56, 'likes', 'completed');

-- Insert trending topics
INSERT INTO trending_topics (tag, posts_count, growth_percentage) VALUES
('react', 2340, 15.3),
('starknet', 1820, 23.7),
('cairo', 1200, 31.2),
('python', 3100, 8.4),
('javascript', 2890, 12.1),
('web3', 1560, 19.8),
('hooks', 890, 42.3),
('smart-contracts', 1340, 28.9);
