-- CATEGORIES TABLE
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

-- USERS TABLE 
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    is_admin INTEGER DEFAULT 0
);

ALTER TABLE products ADD COLUMN sku TEXT;

UPDATE products SET sku = 'AAA' || printf('%03d', id);

CREATE TABLE hero (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    title TEXT NOT NULL, 
    description TEXT NOT NULL,
    image TEXT NOT NULL 
);

INSERT INTO hero (title, description, image) 
VALUES (
'SOMMARREA!', 'Discover the summer collection from Freaky Fashion, where lightweight materials and modern streetwear come together for the perfect seasonal look. Explore carefully selected pieces designed for warm days and late nights, from relaxed essentials to standout styles that bring comfort, confidence, and effortless fashion to every occasion.', '/images/heroSummer.webp'
),
('VINTERREA!', 'Discover the winter collection from Freaky Fashion, where comfort, warmth, and contemporary design meet to create the ultimate cold-weather wardrobe. Explore carefully curated jackets, hoodies, and seasonal essentials crafted to keep your style sharp throughout the season, from everyday streetwear to statement pieces built for colder days.', '/images/heroWinter.webp');

ALTER TABLE products ADD COLUMN is_popular INTEGER DEFAUL 0;

UPDATE products SET is_popular = 1 WHERE id (1,2,3,4,5,6,7,8);

CREATE TABLE spots (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    image TEXT NOT NULL, 
    description TEXT NOT NULL, 
    link TEXT NOT NULL
);

INSERT INTO spots (image, description, link)
VALUES ('/images/caps.webp', 'Lorem, ipsum dolor.', '/'),
('/images/black-tshirt-text.webp', 'Lorem, ipsum dolor', '/'),
('/images/t-shirts.webp', 'Lorem, ipsum dolor', '/');