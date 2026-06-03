PRAGMA foreign_keys = ON; 

-- USERS TABLE 
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    is_admin INTEGER DEFAULT 0
);

-- CATEGORIES TABLE
CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    image TEXT
);

--PRODUCTS TABLE
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    price INTEGER NOT NULL,
    brand TEXT,
    image TEXT,
    published_at TEXT,
    sku TEXT,
    is_popular INTEGER DEFAULT 0,
    category_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

INSERT INTO products (
    name, slug, description, price, brand, image, published_at, sku, is_popular, category_id)
VALUES
('Svart T-Shirt', 'svart-tshirt', 'Stilren svart t-shirt med tryck på ryggen', 199, 'Levis', '/images/products/svart-tshirt.jpg', '2026-05-23', 'AAA001', 1, 2),
('Vit T-Shirt', 'vit-tshirt', 'En vit t-shirt', 249, 'Vans', '/images/products/vit-tshirt.webp', '2026-05-22', 'AAA002', 1, 2),
('Beige T-Shirt', 'beige-tshirt', 'En beige t-shirt', 249, 'Nike', '/images/products/beige-tshirt.webp', '2026-05-22', 'AAA003', 1, 2),
('Blå T-Shirt', 'bla-tshirt', 'En blå t-shirt', 249, 'New Balance', '/images/products/blue-tshirt.webp', '2026-05-05', 'AAA004', 1, 2),
('Turkos T-Shirt', 'turkos-tshirt', 'Stilren turkos t-shirt', 199, 'Billabong', '/images/products/turkos-tshirt.webp', '2026-05-15', 'AAA005', 1, 2),
('Svarta Sneakers', 'svarta-sneakers', 'Stilrena sneakers', 1099, 'Vans', '/images/products/black-sneakers.webp', '2026-05-19', 'AAA006', 1, 3),
('Vita Sneakers', 'vita-sneakers', 'Nike sneakers', 899, 'Nike', '/images/products/white-sneakers.webp', '2026-05-26', 'AAA007', 1, 3),
('Blå Keps', 'bla-keps', 'Blå keps med palm', 299, 'Levis', '/images/products/blue-cap.webp', '2026-05-26', 'AAA008', 1, 4),
('Silver Solglasögon', 'silver-solglasogon', 'Solglasögon från Nike', 499, 'Nike', '/images/products/silver-sunglasses.webp', '2027-01-01', 'AAA009', 0, 4);


--FAVORITES TABLE 
CREATE TABLE favorites (
    user_id INTEGER,
    product_id INTEGER,
    PRIMARY KEY (user_id, product_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

--HERO TABLE
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

-- SPOTS TABLE
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
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

INSERT INTO products (name, slug, description, price, brand, image, published_at, category_id)
VALUES
('Svart T-Shirt', 'svart-tshirt', 'Stilren svart t-shirt med tryck på ryggen', 199, 'levis', '/images/svart-tshirt.webp', '2026-05-01', 1),
('Vit T-Shirt', 'vit-tshirt', 'En vit t-shirt', 249, 'Vans', '/images/vit-tshirt.webp', '2026-05-05', 1);



ALTER TABLE products ADD COLUMN sku TEXT;

UPDATE products SET sku = 'AAA' || printf('%03d', id);



ALTER TABLE products ADD COLUMN is_popular INTEGER DEFAULT 0;

UPDATE products SET is_popular = 1 WHERE id (1,2,3,4,5,6,7,8);

