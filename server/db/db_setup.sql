CREATE TABLE IF NOT EXISTS categories (
	id SERIAL PRIMARY KEY,
	category_name VARCHAR(100) NOT NULL,
	emoji VARCHAR(10) NOT NULL DEFAULT '🎉',
	color VARCHAR(7) NOT NULL DEFAULT '#3498DB'
);

CREATE TABLE IF NOT EXISTS events (
	id SERIAL PRIMARY KEY,
	event_name VARCHAR(255) NOT NULL,
    category INTEGER REFERENCES categories(id),
    event_description TEXT NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    is_favorite BOOLEAN NOT NULL DEFAULT 'FALSE'
);

INSERT INTO categories (category_name, emoji, color) VALUES
    ('Music', '🎶', '#6200b2'),
    ('Sports', '🥅', '#fc9f00'),
	('Games', '🎮', '#e20000'),
    ('Technology', '💻', '#0dc200'),
    ('Art', '🎨', '#ea0075'),
    ('Food & Drink', '🍻', '#ebf700'),
    ('Networking', '👥', '#00ddff'),
	('Other', '🎉', '#3498DB');
	
CREATE INDEX idx_events_category ON events(category);

CREATE INDEX idx_is_favorite ON events(is_favorite);

CREATE INDEX idx_event_name ON events USING gin(to_tsvector('english', event_name));



