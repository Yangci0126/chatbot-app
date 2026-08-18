-- ============ 生图功能 ============

ALTER TABLE user_settings ADD COLUMN IF NOT EXISTS image_api_key TEXT DEFAULT '';
ALTER TABLE user_settings ADD COLUMN IF NOT EXISTS image_api_base_url TEXT DEFAULT '';
ALTER TABLE user_settings ADD COLUMN IF NOT EXISTS image_model TEXT DEFAULT 'nano-banana-pro';
ALTER TABLE user_settings ADD COLUMN IF NOT EXISTS image_size TEXT DEFAULT '1024x1024';
ALTER TABLE user_settings ADD COLUMN IF NOT EXISTS image_quality TEXT DEFAULT 'standard';
ALTER TABLE user_settings ADD COLUMN IF NOT EXISTS image_style TEXT DEFAULT '';

ALTER TABLE bots ADD COLUMN IF NOT EXISTS background_url TEXT DEFAULT '';
ALTER TABLE bots ADD COLUMN IF NOT EXISTS speaking_style TEXT DEFAULT '';

ALTER TABLE user_settings ADD COLUMN IF NOT EXISTS speaking_style TEXT DEFAULT '';
