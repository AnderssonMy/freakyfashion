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

-- PRODUCTS TABLE 
CREATE TABLE products (
    id INTEGER PRIMARY KEY 
    AUTOINCREMENT,
    name TEXT NOT NULL, 
    slug TEXT NOT NULL UNIQUE, 
    description TEXT, 
    price INTEGER NOT NULL,
    brand TEXT,
    image TEXT,
    published_at TEXT,
    category_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

INSERT INTO products (name, slug, description, price, brand, image, published_at, category_id)
VALUES
('Svart T-Shirt', 'svart-tshirt', 'Stilren svart t-shirt med tryck på ryggen', 199, 'levis', '/images/svart-tshirt.webp', '2026-05-01', 1),
('Vit T-Shirt', 'vit-tshirt', 'En vit t-shirt', 249, 'Vans', '/images/vit-tshirt.webp', '2026-05-05', 1);
