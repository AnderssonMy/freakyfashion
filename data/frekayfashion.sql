CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE
    );

INSERT INTO categories (name, slug)
VALUES 
('Nyheter', 'nyheter'),
('Kläder', 'klader'),
('Skor', 'skor');